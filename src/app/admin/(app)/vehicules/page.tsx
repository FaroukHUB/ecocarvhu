import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageTitle, StatusBadge } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { placeLabel, vehicleLabel, type Demande } from "@/lib/admin/demandes";

export const metadata: Metadata = { title: "Fiches véhicules" };

export default function VehiculesPage() {
  return (
    <>
      <PageTitle emoji="🚘" title="Fiches véhicules" subtitle="Tous les véhicules des demandes d'enlèvement et de rachat, avec leurs photos." />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Grid />
      </Suspense>
    </>
  );
}

async function Grid() {
  const { supabase } = await requireUser("admin");
  const { data } = await supabase
    .from("demandes")
    .select("*")
    .in("form_type", ["enlevement", "rachat"])
    .order("created_at", { ascending: false })
    .limit(120)
    .returns<Demande[]>();
  const rows = data ?? [];
  const { data: photos } = rows.length
    ? await supabase.from("demande_photos").select("demande_id, path").in("demande_id", rows.map((r) => r.id)).order("created_at")
    : { data: [] as { demande_id: string; path: string }[] };
  const first = new Map<string, string>();
  for (const p of photos ?? []) if (!first.has(p.demande_id)) first.set(p.demande_id, p.path);
  const signed = first.size
    ? (await supabase.storage.from("photos").createSignedUrls([...first.values()], 3600)).data ?? []
    : [];
  const url = new Map(signed.map((s) => [s.path, s.signedUrl]));

  if (!rows.length) return <p className="rounded-3xl bg-white p-8 text-center text-muted">Aucun véhicule pour l&apos;instant.</p>;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((d) => {
        const src = first.has(d.id) ? url.get(first.get(d.id)!) : null;
        return (
          <li key={d.id}>
            <Link href={`/admin/demandes/${d.id}`} className="block overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-surface text-6xl" aria-hidden="true">
                  🚗
                </div>
              )}
              <div className="p-4">
                <p className="font-bold">{vehicleLabel(d)}</p>
                <p className="text-sm text-muted">
                  {d.plate ? `${d.plate} · ` : ""}
                  {placeLabel(d)}
                </p>
                <p className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <span>{d.contact_name || "Sans nom"}</span>
                  <StatusBadge status={d.status} />
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
