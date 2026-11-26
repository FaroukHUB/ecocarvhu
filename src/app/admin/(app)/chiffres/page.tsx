import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, PageTitle } from "@/components/admin/ui";
import { euro, marge, type Facture, type Rachat } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";
import {FORM_INFO, type Demande} from "@/lib/admin/demandes";
import { currentTime } from "@/lib/admin/now";
import { monthBounds, monthLabel, shiftMonth } from "@/lib/admin/registre";

export const metadata: Metadata = { title: "Chiffres du mois" };

export default function ChiffresPage({ searchParams }: PageProps<"/admin/chiffres">) {
  return (
    <>
      <PageTitle emoji="📊" title="Chiffres du mois" subtitle="Demandes, enlèvements, rachats et factures, comparés au mois précédent." />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Stats searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const inMonth = (iso: string | null, [from, to]: [string, string]) => Boolean(iso && iso >= from.slice(0, iso.length > 10 ? 30 : 10) && iso < to.slice(0, iso.length > 10 ? 30 : 10));

function figures(mois: string, demandes: Demande[], rachats: Rachat[], factures: Facture[]) {
  const b = monthBounds(mois);
  const recues = demandes.filter((d) => inMonth(d.created_at, b));
  const enlevees = demandes.filter((d) => inMonth(d.enleve_at, b));
  const achetes = rachats.filter((r) => inMonth(r.achete_le, b));
  const emises = factures.filter((f) => f.kind === "facture" && inMonth(f.issued_at, b));
  const payees = factures.filter((f) => f.kind === "facture" && inMonth(f.paid_at, b));
  return {
    recues,
    enlevees,
    demandesEnlevement: recues.filter((d) => d.form_type === "enlevement").length,
    achetes,
    depense: achetes.reduce((s, r) => s + Number(r.prix_achat || 0) + Number(r.frais || 0), 0),
    margeRachats: achetes.filter((r) => r.status === "revendu").reduce((s, r) => s + marge(r), 0),
    caHt: emises.reduce((s, f) => s + Number(f.total_ht), 0),
    encaisse: payees.reduce((s, f) => s + Number(f.total_ttc), 0),
  };
}

async function Stats({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const now = new Date((await currentTime())).toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" }).slice(0, 7);
  const mois = typeof sp.mois === "string" && /^\d{4}-\d{2}$/.test(sp.mois) ? sp.mois : now;
  const prev = shiftMonth(mois, -1);
  const [from] = monthBounds(prev);
  const [, to] = monthBounds(mois);
  const { supabase } = await requireUser("admin");
  const [{ data: d }, { data: r }, { data: f }, { data: unpaid }] = await Promise.all([
    supabase.from("demandes").select("*").or(`and(created_at.gte.${from},created_at.lt.${to}),and(enleve_at.gte.${from},enleve_at.lt.${to})`).returns<Demande[]>(),
    supabase.from("rachats").select("*").gte("achete_le", from.slice(0, 10)).lt("achete_le", to.slice(0, 10)).returns<Rachat[]>(),
    supabase.from("factures").select("*").eq("kind", "facture").not("numero", "is", null).returns<Facture[]>(),
    supabase.from("factures").select("total_ttc").eq("kind", "facture").eq("status", "emis"),
  ]);
  const cur = figures(mois, d ?? [], r ?? [], f ?? []);
  const old = figures(prev, d ?? [], r ?? [], f ?? []);
  const transfo = cur.demandesEnlevement ? Math.round((cur.enlevees.length / cur.demandesEnlevement) * 100) : null;
  const impayes = (unpaid ?? []).reduce((s, x) => s + Number(x.total_ttc), 0);

  const tile = (emoji: string, label: string, value: string, a: number, b: number, money = false) => {
    const diff = a - b;
    return (
      <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
        <dt className="text-sm text-muted">
          <span aria-hidden="true">{emoji}</span> {label}
        </dt>
        <dd className="mt-1 text-3xl font-bold tabular-nums">{value}</dd>
        <dd className={`mt-1 text-sm font-semibold ${diff > 0 ? "text-emerald-700" : diff < 0 ? "text-red-700" : "text-muted"}`}>
          {diff > 0 ? "▲" : diff < 0 ? "▼" : "="} {money ? euro(Math.abs(diff)) : Math.abs(diff)} vs mois précédent
        </dd>
      </div>
    );
  };
  const group = (list: Demande[], key: (d: Demande) => string) => {
    const m = new Map<string, number>();
    for (const x of list) m.set(key(x), (m.get(key(x)) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  };
  const bars = (rows: [string, number][]) => {
    const max = Math.max(1, ...rows.map((x) => x[1]));
    return rows.length ? (
      <ul className="space-y-2.5">
        {rows.slice(0, 8).map(([l, v]) => (
          <li key={l}>
            <div className="flex justify-between text-sm">
              <span>{l}</span>
              <span className="font-semibold tabular-nums">{v}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-surface">
              <div className="h-2 rounded-full bg-brand-bright" style={{ width: `${(v / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-muted">Aucune donnée ce mois-ci.</p>
    );
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Link href={`/admin/chiffres?mois=${prev}`} className="rounded-2xl bg-white px-4 py-2 font-semibold ring-1 ring-line">←</Link>
        <span className="rounded-2xl bg-ink px-4 py-2 font-semibold capitalize text-white">{monthLabel(mois)}</span>
        <Link href={`/admin/chiffres?mois=${shiftMonth(mois, 1)}`} className="rounded-2xl bg-white px-4 py-2 font-semibold ring-1 ring-line">→</Link>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tile("📥", "Demandes reçues", String(cur.recues.length), cur.recues.length, old.recues.length)}
        {tile("🚛", "Véhicules enlevés", String(cur.enlevees.length), cur.enlevees.length, old.enlevees.length)}
        {tile("🤝", "Véhicules rachetés", String(cur.achetes.length), cur.achetes.length, old.achetes.length)}
        {tile("💶", "Facturé (HT)", euro(cur.caHt), cur.caHt, old.caHt, true)}
        {tile("✅", "Encaissé (TTC)", euro(cur.encaisse), cur.encaisse, old.encaisse, true)}
        {tile("💸", "Dépensé en rachats", euro(cur.depense), cur.depense, old.depense, true)}
        {tile("📈", "Marge des rachats revendus", euro(cur.margeRachats), cur.margeRachats, old.margeRachats, true)}
        <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
          <dt className="text-sm text-muted">🎯 Taux de transformation</dt>
          <dd className="mt-1 text-3xl font-bold tabular-nums">{transfo == null ? "—" : `${transfo} %`}</dd>
          <dd className="mt-1 text-sm text-muted">enlèvements / demandes d&apos;enlèvement</dd>
        </div>
      </dl>
      {impayes ? (
        <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-amber-950">
          💡 Factures en attente de paiement (tous mois confondus) : <strong>{euro(impayes)}</strong>.{" "}
          <Link href="/admin/factures" className="font-semibold underline">Voir</Link>
        </p>
      ) : null}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Demandes par type" emoji="📊">
          {bars(group(cur.recues, (x) => `${FORM_INFO[x.form_type]?.emoji ?? ""} ${FORM_INFO[x.form_type]?.label ?? x.form_type}`))}
        </Card>
        <Card title="Demandes par ville" emoji="📍">
          {bars(group(cur.recues, (x) => x.city || "Ville non précisée"))}
        </Card>
        <Card title="D'où viennent les demandes" emoji="🧭">
          {bars(group(cur.recues, (x) => (x.origine === "manuelle" ? "📞 Ajoutées à la main (appel…)" : "🌐 Formulaire du site")))}
        </Card>
        <Card title="Pages du site qui apportent des demandes" emoji="🔗">
          {bars(group(cur.recues.filter((x) => x.origine === "site"), (x) => x.source_page || "inconnue"))}
        </Card>
      </div>
    </>
  );
}
