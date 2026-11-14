import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BigButton, inputClass, PageTitle } from "@/components/admin/ui";
import { PRO_KINDS, PRO_STATUS, type Pro } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";
import { ago, currentTime } from "@/lib/admin/demandes";

export const metadata: Metadata = { title: "Fichier pros" };

export default function ProsPage({ searchParams }: PageProps<"/admin/pros">) {
  return (
    <>
      <PageTitle
        emoji="📇"
        title="Fichier pros"
        subtitle="Garages, concessions, flottes, syndics… tes clients et prospects pros."
        action={<BigButton href="/admin/pros/nouveau" emoji="➕">Ajouter un pro</BigButton>}
      />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <List searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function List({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const statut = typeof sp.statut === "string" && sp.statut in PRO_STATUS ? sp.statut : null;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const { supabase } = await requireUser("admin");
  let query = supabase.from("pros").select("*").order("name").limit(300);
  if (statut) query = query.eq("status", statut);
  if (q) {
    const like = `%${q.replace(/[%,()]/g, " ")}%`;
    query = query.or(`name.ilike.${like},city.ilike.${like},contact_name.ilike.${like},phone.ilike.${like}`);
  }
  const [{ data }, { data: counts }] = await Promise.all([query.returns<Pro[]>(), supabase.from("pros").select("status")]);
  const rows = data ?? [];
  const now = currentTime();
  // Fidélisation : clients sans contact depuis plus de 60 jours.
  const relancer = rows.filter((p) => p.status === "client" && (!p.last_contact_at || now - new Date(p.last_contact_at).getTime() > 60 * 86400_000));
  const tab = (href: string, label: string, on: boolean) => (
    <Link href={href} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ring-1 ${on ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}>
      {label}
    </Link>
  );
  return (
    <>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {tab("/admin/pros", `Tous (${counts?.length ?? 0})`, !statut)}
        {Object.entries(PRO_STATUS).map(([k, v]) =>
          tab(`/admin/pros?statut=${k}`, `${v.label} (${(counts ?? []).filter((c) => c.status === k).length})`, statut === k),
        )}
      </div>
      <form className="mt-3">
        {statut ? <input type="hidden" name="statut" value={statut} /> : null}
        <input name="q" defaultValue={q} placeholder="🔍 Chercher un nom, une ville, un contact…" className={inputClass} />
      </form>
      {relancer.length && !statut ? (
        <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-amber-950">
          🔔 {relancer.length} client{relancer.length > 1 ? "s" : ""} sans contact depuis plus de 2 mois :{" "}
          {relancer.slice(0, 5).map((p, i) => (
            <span key={p.id}>
              {i ? ", " : ""}
              <Link href={`/admin/pros/${p.id}`} className="font-semibold underline">
                {p.name}
              </Link>
            </span>
          ))}
          .
        </p>
      ) : null}
      {rows.length ? (
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {rows.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/pros/${p.id}`} className="flex items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-2xl" aria-hidden="true">
                  {PRO_KINDS[p.kind]?.emoji ?? "📌"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold">{p.name}</span>
                  <span className="block truncate text-sm text-ink-3">
                    {PRO_KINDS[p.kind]?.label} · {[p.postal_code, p.city].filter(Boolean).join(" ") || "ville ?"}
                  </span>
                  <span className="block text-xs text-muted">{p.last_contact_at ? `Dernier contact ${ago(p.last_contact_at, now)}` : "Jamais contacté"}</span>
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${PRO_STATUS[p.status].tone}`}>{PRO_STATUS[p.status].label}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-3xl bg-white p-8 text-center text-muted">Aucun pro pour l&apos;instant.</p>
      )}
    </>
  );
}
