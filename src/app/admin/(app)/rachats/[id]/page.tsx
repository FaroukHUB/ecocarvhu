import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { buttonClass, Card, inputClass } from "@/components/admin/ui";
import { euro, marge, RACHAT_STATUS, type Rachat } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";
import { deleteRachat, saveRachat } from "../../../actions";

export const metadata: Metadata = { title: "Rachat" };

export default function RachatPage({ params }: PageProps<"/admin/rachats/[id]">) {
  return (
    <Suspense fallback={<p className="text-muted">Chargement…</p>}>
      <Fiche params={params} />
    </Suspense>
  );
}

const money = (v: number | null) => (v == null ? "" : String(v).replace(".", ","));

async function Fiche({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase } = await requireUser("admin");
  const { data: r } = await supabase.from("rachats").select("*").eq("id", id).maybeSingle<Rachat>();
  if (!r) notFound();
  const m = marge(r);
  const amount = (name: keyof Rachat, label: string) => (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      <span className="relative block">
        <input name={name} inputMode="decimal" defaultValue={money(r[name] as number | null)} className={`${inputClass} pr-8`} />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">€</span>
      </span>
    </label>
  );
  return (
    <>
      <Link href="/admin/rachats" className="text-sm font-semibold text-muted hover:text-ink">
        ← Rachats
      </Link>
      <h1 className="mt-3 text-2xl font-bold sm:text-3xl">🤝 {r.vehicle || "Rachat"}</h1>
      {r.demande_id ? (
        <Link href={`/admin/demandes/${r.demande_id}`} className="text-sm font-semibold text-brand hover:underline">
          Voir la demande d&apos;origine →
        </Link>
      ) : null}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <form action={saveRachat.bind(null, r.id)} className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-sm font-semibold">Véhicule</span>
              <input name="vehicle" defaultValue={r.vehicle} placeholder="ex. Peugeot 207 2009 AB-123-CD" className={inputClass} />
            </label>
            <fieldset className="sm:col-span-2">
              <legend className="mb-2 text-sm font-semibold">Étape</legend>
              <div className="flex flex-wrap gap-2">
                {Object.entries(RACHAT_STATUS).map(([k, v]) => (
                  <label key={k} className="cursor-pointer">
                    <input type="radio" name="status" value={k} defaultChecked={r.status === k} className="peer sr-only" />
                    <span className="block rounded-2xl bg-white px-3 py-2 text-sm font-semibold ring-1 ring-line peer-checked:bg-brand-bright peer-checked:ring-brand-bright">
                      {v.emoji} {v.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            {amount("prix_propose", "Prix proposé au client")}
            {amount("prix_achat", "Prix payé")}
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Date d&apos;achat</span>
              <input type="date" name="achete_le" defaultValue={r.achete_le ?? ""} className={inputClass} />
            </label>
            {amount("frais", "Frais (transport, démarches…)")}
            {amount("revente_pieces", "Revente des pièces")}
            {amount("revente_metal", "Revente du métal")}
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-sm font-semibold">Notes</span>
              <textarea name="notes" rows={3} defaultValue={r.notes} className={inputClass} />
            </label>
            <button type="submit" className={`${buttonClass} sm:col-span-2`}>
              💾 Enregistrer
            </button>
          </form>
        </Card>
        <div className="space-y-6">
          <Card title="Résultat" emoji="📈">
            <dl className="space-y-2">
              <div className="flex justify-between"><dt>Reventes</dt><dd className="tabular-nums">{euro(Number(r.revente_pieces) + Number(r.revente_metal))}</dd></div>
              <div className="flex justify-between"><dt>Prix payé</dt><dd className="tabular-nums">− {euro(r.prix_achat ?? 0)}</dd></div>
              <div className="flex justify-between"><dt>Frais</dt><dd className="tabular-nums">− {euro(r.frais)}</dd></div>
              <div className={`flex justify-between border-t border-line pt-2 text-xl font-bold ${m >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                <dt>Marge</dt>
                <dd className="tabular-nums">{euro(m)}</dd>
              </div>
            </dl>
          </Card>
          <details className="rounded-3xl border border-red-200 bg-white p-5">
            <summary className="cursor-pointer font-semibold text-red-700">🗑️ Supprimer ce rachat</summary>
            <form action={deleteRachat.bind(null, r.id)} className="mt-3">
              <button type="submit" className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white">
                Oui, supprimer
              </button>
            </form>
          </details>
        </div>
      </div>
    </>
  );
}
