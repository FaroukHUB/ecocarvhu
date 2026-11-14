import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageTitle } from "@/components/admin/ui";
import { DOC_STATUS, euro, type Facture } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";
import { currentTime, formatDate } from "@/lib/admin/demandes";
import { createDocument } from "../../actions";

export const metadata: Metadata = { title: "Factures et devis" };

export default function FacturesPage({ searchParams }: PageProps<"/admin/factures">) {
  return (
    <>
      <PageTitle
        emoji="🧾"
        title="Factures et devis"
        subtitle="Préparez, émettez, imprimez en PDF et suivez les paiements."
        action={
          <div className="flex flex-wrap gap-2">
            <form action={createDocument.bind(null, "devis", {})}>
              <button type="submit" className="rounded-2xl bg-sky-100 px-5 py-3 font-semibold text-sky-900">🧾 Nouveau devis</button>
            </form>
            <form action={createDocument.bind(null, "facture", {})}>
              <button type="submit" className="rounded-2xl bg-brand-bright px-5 py-3 font-semibold text-ink">💶 Nouvelle facture</button>
            </form>
          </div>
        }
      />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <List searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function List({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { type } = await searchParams;
  const kind = type === "devis" ? "devis" : "facture";
  const { supabase } = await requireUser("admin");
  const { data } = await supabase.from("factures").select("*").eq("kind", kind).order("created_at", { ascending: false }).limit(300).returns<Facture[]>();
  const rows = data ?? [];
  const today = new Date(currentTime()).toISOString().slice(0, 10);
  const unpaid = rows.filter((f) => f.kind === "facture" && f.status === "emis");
  const late = unpaid.filter((f) => f.due_at && f.due_at < today);
  return (
    <>
      <div className="flex gap-2">
        {(["facture", "devis"] as const).map((k) => (
          <Link key={k} href={`/admin/factures?type=${k}`} className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${kind === k ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}>
            {k === "facture" ? "💶 Factures" : "🧾 Devis"}
          </Link>
        ))}
      </div>
      {kind === "facture" && unpaid.length ? (
        <p className={`mt-4 rounded-2xl p-4 ${late.length ? "bg-red-50 text-red-900" : "bg-amber-50 text-amber-950"}`}>
          {late.length ? "⏰ " : "💡 "}
          {unpaid.length} facture{unpaid.length > 1 ? "s" : ""} en attente de paiement ({euro(unpaid.reduce((s, f) => s + Number(f.total_ttc), 0))})
          {late.length ? `, dont ${late.length} en retard` : ""}.
        </p>
      ) : null}
      {rows.length ? (
        <ul className="mt-5 grid gap-3">
          {rows.map((f) => (
            <li key={f.id}>
              <Link href={`/admin/factures/${f.id}`} className="flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                <span className="min-w-0 flex-1">
                  <span className="block font-bold">
                    {f.numero ?? "Brouillon"} · {f.client_name || "Client à préciser"}
                  </span>
                  <span className="block text-sm text-ink-3">
                    {f.issued_at ? `Émis le ${formatDate(f.issued_at, false)}` : `Créé le ${formatDate(f.created_at, false)}`}
                    {f.kind === "facture" && f.status === "emis" && f.due_at ? ` · échéance ${formatDate(f.due_at, false)}` : ""}
                  </span>
                </span>
                <span className="text-lg font-bold tabular-nums">{euro(f.total_ttc)}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${DOC_STATUS[f.status].tone}`}>
                  {f.kind === "facture" && f.status === "emis" ? "À payer" : DOC_STATUS[f.status].label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-3xl bg-white p-8 text-center text-muted">Aucun {kind === "facture" ? "facture" : "devis"} pour l&apos;instant.</p>
      )}
    </>
  );
}
