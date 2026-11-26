import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageTitle } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import {formatDate, type Demande} from "@/lib/admin/demandes";
import { currentTime } from "@/lib/admin/now";
import { monthBounds, monthLabel, shiftMonth } from "@/lib/admin/registre";

export const metadata: Metadata = { title: "Registre" };

export default function RegistrePage({ searchParams }: PageProps<"/admin/registre">) {
  return (
    <>
      <PageTitle emoji="📚" title="Registre des véhicules" subtitle="Tous les véhicules enlevés, mois par mois." />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Table searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Table({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const now = new Date((await currentTime())).toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" }).slice(0, 7);
  const mois = typeof sp.mois === "string" && /^\d{4}-\d{2}$/.test(sp.mois) ? sp.mois : now;
  const [from, to] = monthBounds(mois);
  const { supabase } = await requireUser("admin");
  const { data } = await supabase
    .from("demandes")
    .select("*")
    .gte("enleve_at", from)
    .lt("enleve_at", to)
    .order("enleve_at")
    .returns<Demande[]>();
  const rows = data ?? [];
  const yes = (v: string | null) => (v ? `✅ ${formatDate(v, false)}` : "—");

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Link href={`/admin/registre?mois=${shiftMonth(mois, -1)}`} className="rounded-2xl bg-white px-4 py-2 font-semibold ring-1 ring-line">
          ←
        </Link>
        <span className="rounded-2xl bg-ink px-4 py-2 font-semibold capitalize text-white">{monthLabel(mois)}</span>
        <Link href={`/admin/registre?mois=${shiftMonth(mois, 1)}`} className="rounded-2xl bg-white px-4 py-2 font-semibold ring-1 ring-line">
          →
        </Link>
        <a href={`/admin/registre-export?mois=${mois}`} className="ml-auto rounded-2xl bg-brand-bright px-4 py-2 font-semibold text-ink">
          ⬇️ Télécharger (Excel)
        </a>
      </div>
      <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              {["N°", "Enlevé le", "Véhicule", "Immatriculation", "Propriétaire", "Commune", "Remis au centre", "Certificat reçu"].map((h) => (
                <th key={h} className="px-3 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.id} className="border-t border-line">
                <td className="px-3 py-2">
                  <Link href={`/admin/demandes/${d.id}`} className="font-semibold text-brand hover:underline">
                    {d.numero}
                  </Link>
                </td>
                <td className="px-3 py-2">{formatDate(d.enleve_at!, false)}</td>
                <td className="px-3 py-2">{[d.brand, d.model, d.year].filter(Boolean).join(" ") || "—"}</td>
                <td className="px-3 py-2">{d.plate || "—"}</td>
                <td className="px-3 py-2">{d.contact_name || "—"}</td>
                <td className="px-3 py-2">{[d.postal_code, d.city].filter(Boolean).join(" ") || "—"}</td>
                <td className="px-3 py-2">{yes(d.centre_remis_at)}</td>
                <td className="px-3 py-2">{yes(d.cd_recu_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length ? <p className="p-8 text-center text-muted">Aucun véhicule enlevé ce mois-ci.</p> : null}
      </div>
      <p className="mt-3 text-sm text-muted">{rows.length} véhicule{rows.length > 1 ? "s" : ""} ce mois-ci.</p>
    </>
  );
}
