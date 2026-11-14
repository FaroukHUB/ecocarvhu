import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BigButton, PageTitle, StatusBadge, inputClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { ago, currentTime, FORM_INFO, isStatus, placeLabel, STATUS_INFO, STATUSES, vehicleLabel, type Demande } from "@/lib/admin/demandes";

export const metadata: Metadata = { title: "Demandes" };

export default function DemandesPage({ searchParams }: PageProps<"/admin/demandes">) {
  return (
    <>
      <PageTitle
        emoji="📥"
        title="Demandes"
        subtitle="Tout ce qui arrive du site, plus ce que tu ajoutes à la main."
        action={<BigButton href="/admin/demandes/nouvelle" emoji="➕">Ajouter une demande</BigButton>}
      />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <List searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function List({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const statut = isStatus(sp.statut) ? sp.statut : null;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const { supabase } = await requireUser("admin");

  const { data: all } = await supabase.from("demandes").select("status").returns<{ status: string }[]>();
  const counts = Object.fromEntries(STATUSES.map((s) => [s, (all ?? []).filter((d) => d.status === s).length]));

  let query = supabase.from("demandes").select("*").order("created_at", { ascending: false }).limit(200);
  if (statut) query = query.eq("status", statut);
  if (q) {
    const like = `%${q.replace(/[%,()]/g, " ")}%`;
    query = query.or(`contact_name.ilike.${like},phone.ilike.${like},city.ilike.${like},brand.ilike.${like},model.ilike.${like},plate.ilike.${like}`);
  }
  const { data } = await query.returns<Demande[]>();
  const rows = data ?? [];
  const now = currentTime();
  const tab = (href: string, label: React.ReactNode, on: boolean) => (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ring-1 ${on ? "bg-ink text-white ring-ink" : "bg-white ring-line hover:ring-ink"}`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {tab("/admin/demandes", `Toutes (${all?.length ?? 0})`, !statut)}
        {STATUSES.map((s) =>
          tab(`/admin/demandes?statut=${s}`, `${STATUS_INFO[s].emoji} ${STATUS_INFO[s].label} (${counts[s]})`, statut === s),
        )}
      </div>
      <form className="mt-3 flex gap-2">
        {statut ? <input type="hidden" name="statut" value={statut} /> : null}
        <input name="q" defaultValue={q} placeholder="🔍 Chercher un nom, un téléphone, une ville, une plaque…" className={inputClass} />
      </form>

      {rows.length ? (
        <ul className="mt-5 grid gap-3">
          {rows.map((d) => (
            <li key={d.id}>
              <Link
                href={`/admin/demandes/${d.id}`}
                className="flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-2xl" aria-hidden="true">
                  {FORM_INFO[d.form_type]?.emoji ?? "📄"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold">
                    {d.contact_name || "Sans nom"} <span className="font-normal text-muted">· n° {d.numero}</span>
                  </span>
                  <span className="block truncate text-sm text-ink-3">
                    📍 {placeLabel(d)} · 🚗 {vehicleLabel(d)}
                  </span>
                  <span className="block text-xs text-muted">
                    {FORM_INFO[d.form_type]?.label ?? d.form_type} · {d.origine === "manuelle" ? "ajoutée à la main" : "via le site"} · {ago(d.created_at, now)}
                  </span>
                </span>
                <StatusBadge status={d.status} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-3xl bg-white p-8 text-center text-muted">Aucune demande ici pour l&apos;instant.</p>
      )}
    </>
  );
}
