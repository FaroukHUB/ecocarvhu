import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { greenButtonClass, PageTitle } from "@/components/admin/ui";
import { euro, marge, RACHAT_STATUS, type Rachat } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";
import { createRachat } from "../../actions";

export const metadata: Metadata = { title: "Rachats" };

export default function RachatsPage() {
  return (
    <>
      <PageTitle
        emoji="🤝"
        title="Rachats"
        subtitle="Prix proposé, prix payé, revente des pièces et du métal : la marge de chaque véhicule."
        action={
          <form action={createRachat.bind(null, null)}>
            <button type="submit" className={greenButtonClass}>
              ➕ Nouveau rachat
            </button>
          </form>
        }
      />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <List />
      </Suspense>
    </>
  );
}

async function List() {
  const { supabase } = await requireUser("admin");
  const { data } = await supabase.from("rachats").select("*").order("created_at", { ascending: false }).limit(300).returns<Rachat[]>();
  const rows = data ?? [];
  const bought = rows.filter((r) => r.status === "achete" || r.status === "revendu");
  const spent = bought.reduce((s, r) => s + Number(r.prix_achat || 0) + Number(r.frais || 0), 0);
  const resold = bought.reduce((s, r) => s + Number(r.revente_pieces || 0) + Number(r.revente_metal || 0), 0);
  const total = bought.reduce((s, r) => s + marge(r), 0);
  return (
    <>
      <dl className="grid gap-3 sm:grid-cols-3">
        {[
          ["💸 Dépensé (achats + frais)", euro(spent)],
          ["💰 Revendu (pièces + métal)", euro(resold)],
          ["📈 Marge", euro(total)],
        ].map(([l, v]) => (
          <div key={l} className="rounded-3xl border border-line bg-white p-5 shadow-sm">
            <dt className="text-sm text-muted">{l}</dt>
            <dd className={`mt-1 text-3xl font-bold tabular-nums ${l.includes("Marge") ? (total >= 0 ? "text-emerald-700" : "text-red-700") : ""}`}>{v}</dd>
          </div>
        ))}
      </dl>
      {rows.length ? (
        <ul className="mt-6 grid gap-3">
          {rows.map((r) => {
            const s = RACHAT_STATUS[r.status];
            const m = marge(r);
            return (
              <li key={r.id}>
                <Link href={`/admin/rachats/${r.id}`} className="flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-2xl" aria-hidden="true">
                    {s.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{r.vehicle || "Véhicule à préciser"}</span>
                    <span className="block text-sm text-ink-3">
                      Proposé {euro(r.prix_propose)} · Payé {euro(r.prix_achat)}
                    </span>
                  </span>
                  {r.status === "achete" || r.status === "revendu" ? (
                    <span className={`font-bold tabular-nums ${m >= 0 ? "text-emerald-700" : "text-red-700"}`}>{euro(m)}</span>
                  ) : null}
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${s.tone}`}>{s.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-6 rounded-3xl bg-white p-8 text-center text-muted">
          Pas encore de rachat. Tu peux en créer un ici, ou depuis la fiche d&apos;une demande de rachat.
        </p>
      )}
    </>
  );
}
