import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { buttonClass, Card, greenButtonClass, inputClass, StatusBadge } from "@/components/admin/ui";
import { DOC_STATUS, euro, PRO_KINDS, PRO_STATUS, type Facture, type Pro } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";
import { formatDate, placeLabel, vehicleLabel, whatsappNumber, type Demande } from "@/lib/admin/demandes";
import { createDocument, deletePro, savePro, touchPro } from "../../../actions";

export const metadata: Metadata = { title: "Fiche pro" };

export default function ProPage({ params }: PageProps<"/admin/pros/[id]">) {
  return (
    <Suspense fallback={<p className="text-muted">Chargement…</p>}>
      <Fiche params={params} />
    </Suspense>
  );
}

async function Fiche({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "nouveau";
  if (!isNew && !/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase } = await requireUser("admin");
  let p: Pro | null = null;
  let demandes: Demande[] = [];
  let docs: Facture[] = [];
  if (!isNew) {
    const [a, b, c] = await Promise.all([
      supabase.from("pros").select("*").eq("id", id).maybeSingle<Pro>(),
      supabase.from("demandes").select("*").eq("pro_id", id).order("created_at", { ascending: false }).returns<Demande[]>(),
      supabase.from("factures").select("*").eq("pro_id", id).order("created_at", { ascending: false }).returns<Facture[]>(),
    ]);
    if (!a.data) notFound();
    p = a.data;
    demandes = b.data ?? [];
    docs = c.data ?? [];
  }
  const wa = whatsappNumber(p?.phone ?? null);
  const fields: [keyof Pro, string][] = [
    ["name", "Nom de l'entreprise *"],
    ["contact_name", "Interlocuteur"],
    ["phone", "Téléphone"],
    ["email", "E-mail"],
    ["address", "Adresse"],
    ["postal_code", "Code postal"],
    ["city", "Ville"],
    ["siret", "SIRET"],
  ];

  return (
    <>
      <Link href="/admin/pros" className="text-sm font-semibold text-muted hover:text-ink">
        ← Fichier pros
      </Link>
      <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
        {isNew ? "➕ Nouveau pro" : `${PRO_KINDS[p!.kind]?.emoji ?? "📌"} ${p!.name}`}
      </h1>

      {p ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {p.phone ? (
            <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="rounded-2xl bg-brand-bright px-4 py-2.5 font-semibold text-ink">
              📞 Appeler
            </a>
          ) : null}
          {wa ? (
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#25d366]/20 px-4 py-2.5 font-semibold">
              💬 WhatsApp
            </a>
          ) : null}
          {p.email ? (
            <a href={`mailto:${p.email}`} className="rounded-2xl bg-violet-100 px-4 py-2.5 font-semibold text-violet-900">
              📧 E-mail
            </a>
          ) : null}
          <form action={touchPro.bind(null, p.id)}>
            <button type="submit" className="rounded-2xl bg-white px-4 py-2.5 font-semibold ring-1 ring-line">
              ✔️ Contacté aujourd&apos;hui
            </button>
          </form>
          <form action={createDocument.bind(null, "devis", { pro: p.id })}>
            <button type="submit" className="rounded-2xl bg-sky-100 px-4 py-2.5 font-semibold text-sky-900">
              🧾 Nouveau devis
            </button>
          </form>
          <form action={createDocument.bind(null, "facture", { pro: p.id })}>
            <button type="submit" className="rounded-2xl bg-amber-100 px-4 py-2.5 font-semibold text-amber-900">
              💶 Nouvelle facture
            </button>
          </form>
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card title="Informations" emoji="📝">
          <form action={savePro.bind(null, p?.id ?? null)} className="grid gap-3 sm:grid-cols-2">
            {fields.map(([name, label]) => (
              <label key={name} className="block">
                <span className="mb-1 block text-sm font-semibold">{label}</span>
                <input name={name} defaultValue={String(p?.[name] ?? "")} required={name === "name"} className={inputClass} />
              </label>
            ))}
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Type</span>
              <select name="kind" defaultValue={p?.kind ?? "garage"} className={inputClass}>
                {Object.entries(PRO_KINDS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.emoji} {v.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Statut</span>
              <select name="status" defaultValue={p?.status ?? "prospect"} className={inputClass}>
                {Object.entries(PRO_STATUS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-sm font-semibold">Notes</span>
              <textarea name="notes" rows={4} defaultValue={p?.notes ?? ""} className={inputClass} />
            </label>
            <button type="submit" className={`${isNew ? greenButtonClass : buttonClass} sm:col-span-2`}>
              {isNew ? "✅ Créer" : "💾 Enregistrer"}
            </button>
          </form>
        </Card>

        {p ? (
          <div className="space-y-6">
            <Card title={`Véhicules (${demandes.length})`} emoji="🚗">
              {demandes.length ? (
                <ul className="divide-y divide-line">
                  {demandes.map((d) => (
                    <li key={d.id}>
                      <Link href={`/admin/demandes/${d.id}`} className="flex items-center justify-between gap-2 py-2.5">
                        <span>
                          {vehicleLabel(d)}
                          <span className="block text-xs text-muted">
                            {formatDate(d.created_at, false)} · {placeLabel(d)}
                          </span>
                        </span>
                        <StatusBadge status={d.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">Pour rattacher une demande à ce pro, passe par la fiche de la demande (rubrique « Client pro »).</p>
              )}
            </Card>
            <Card title={`Devis et factures (${docs.length})`} emoji="🧾">
              {docs.length ? (
                <ul className="divide-y divide-line">
                  {docs.map((f) => (
                    <li key={f.id}>
                      <Link href={`/admin/factures/${f.id}`} className="flex items-center justify-between gap-2 py-2.5">
                        <span>
                          {f.kind === "devis" ? "Devis" : "Facture"} {f.numero ?? "(brouillon)"}
                          <span className="block text-xs text-muted">{euro(f.total_ttc)} TTC</span>
                        </span>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${DOC_STATUS[f.status].tone}`}>{DOC_STATUS[f.status].label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">Aucun document.</p>
              )}
            </Card>
            <details className="rounded-3xl border border-red-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold text-red-700">🗑️ Supprimer ce pro</summary>
              <form action={deletePro.bind(null, p.id)} className="mt-3">
                <button type="submit" className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white">
                  Oui, supprimer
                </button>
              </form>
            </details>
          </div>
        ) : null}
      </div>
    </>
  );
}
