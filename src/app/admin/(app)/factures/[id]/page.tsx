import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LinesEditor } from "@/components/admin/LinesEditor";
import { buttonClass, Card, greenButtonClass, inputClass } from "@/components/admin/ui";
import { companyReady, DOC_STATUS, euro, type Company, type Facture } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/demandes";
import { createDocument, deleteDraft, saveAndEmit, saveDocument, setDocumentStatus } from "../../../actions";

export const metadata: Metadata = { title: "Devis ou facture" };

export default function FacturePage({ params, searchParams }: PageProps<"/admin/factures/[id]">) {
  return (
    <Suspense fallback={<p className="text-muted">Chargement…</p>}>
      <Editor params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Editor({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const { erreur } = await searchParams;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase } = await requireUser("admin");
  const [{ data: f }, { data: company }] = await Promise.all([
    supabase.from("factures").select("*").eq("id", id).maybeSingle<Facture>(),
    supabase.from("company_settings").select("*").eq("id", 1).single<Company>(),
  ]);
  if (!f) notFound();
  const draft = !f.numero;
  const name = f.kind === "devis" ? "Devis" : "Facture";
  const franchise = (f.seller ?? company)?.tva_franchise ?? true;
  const statusBtn = (status: "accepte" | "refuse" | "paye" | "emis", label: string, tone: string) => (
    <form action={setDocumentStatus.bind(null, f.id, status)}>
      <button type="submit" className={`rounded-2xl px-4 py-2.5 font-semibold ${tone}`}>
        {label}
      </button>
    </form>
  );

  return (
    <>
      <Link href={`/admin/factures?type=${f.kind}`} className="text-sm font-semibold text-muted hover:text-ink">
        ← {f.kind === "devis" ? "Devis" : "Factures"}
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {f.kind === "devis" ? "🧾" : "💶"} {name} {f.numero ?? "(brouillon)"}
        </h1>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${DOC_STATUS[f.status].tone}`}>
          {f.kind === "facture" && f.status === "emis" ? "À payer" : DOC_STATUS[f.status].label}
        </span>
      </div>
      {f.issued_at ? (
        <p className="mt-1 text-muted">
          Émis le {formatDate(f.issued_at, false)}
          {f.due_at ? ` · ${f.kind === "facture" ? "échéance" : "valable jusqu'au"} ${formatDate(f.due_at, false)}` : ""}
          {f.paid_at ? ` · payée le ${formatDate(f.paid_at, false)}` : ""}
        </p>
      ) : null}
      {typeof erreur === "string" ? <p className="mt-4 rounded-2xl bg-red-50 p-4 text-red-900">⚠️ {erreur}</p> : null}
      {draft && !companyReady(company) ? (
        <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-amber-950">
          ⚠️ Pour émettre, complétez d&apos;abord la raison sociale, le SIRET et l&apos;adresse dans{" "}
          <Link href="/admin/entreprise" className="font-semibold underline">
            Réglages › Entreprise
          </Link>
          . Vous pouvez déjà préparer ce brouillon.
        </p>
      ) : null}

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={`/admin/imprimer/${f.id}`} target="_blank" className="rounded-2xl bg-white px-4 py-2.5 font-semibold ring-1 ring-line">
          🖨️ Imprimer / PDF
        </Link>
        {!draft && f.kind === "devis" && f.status === "emis" ? (
          <>
            {statusBtn("accepte", "👍 Accepté", "bg-violet-100 text-violet-900")}
            {statusBtn("refuse", "👎 Refusé", "bg-stone-200 text-stone-800")}
          </>
        ) : null}
        {!draft && f.kind === "devis" && f.status !== "refuse" ? (
          <form action={createDocument.bind(null, "facture", { devis: f.id })}>
            <button type="submit" className="rounded-2xl bg-brand-bright px-4 py-2.5 font-semibold text-ink">
              💶 Transformer en facture
            </button>
          </form>
        ) : null}
        {!draft && f.kind === "facture" && f.status === "emis" ? statusBtn("paye", "✅ Marquer payée", "bg-emerald-100 text-emerald-900") : null}
        {!draft && f.kind === "facture" && f.status === "paye" ? statusBtn("emis", "↩️ Annuler le paiement", "bg-white ring-1 ring-line") : null}
        {f.client_email ? (
          <a
            href={`mailto:${f.client_email}?subject=${encodeURIComponent(`${name} ${f.numero ?? ""} — EcocarVHU`)}&body=${encodeURIComponent(`Bonjour,\n\nVeuillez trouver ci-joint notre ${name.toLowerCase()} ${f.numero ?? ""} d'un montant de ${euro(f.total_ttc)}.\n\nCordialement,\nEcocarVHU`)}`}
            className="rounded-2xl bg-violet-100 px-4 py-2.5 font-semibold text-violet-900"
          >
            📧 Préparer l&apos;e-mail
          </a>
        ) : null}
      </div>

      <form action={saveDocument.bind(null, f.id)} className="mt-6 space-y-6">
        <Card title="Client" emoji="👤">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Nom ou raison sociale</span>
              <input name="client_name" defaultValue={f.client_name} disabled={!draft} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">E-mail</span>
              <input name="client_email" defaultValue={f.client_email} disabled={!draft} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Adresse</span>
              <textarea name="client_address" rows={2} defaultValue={f.client_address} disabled={!draft} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">SIRET du client (professionnel)</span>
              <input name="client_siret" defaultValue={f.client_siret} disabled={!draft} className={inputClass} />
            </label>
          </div>
        </Card>
        <Card title="Lignes" emoji="📋">
          <LinesEditor initial={f.lines ?? []} franchise={franchise} readOnly={!draft} />
        </Card>
        <Card title="Notes (visibles sur le document)" emoji="🗒️">
          <textarea name="notes" rows={3} defaultValue={f.notes} disabled={!draft} placeholder="ex. Véhicule Renault Clio AB-123-CD enlevé le 12/11" className={inputClass} />
        </Card>
        {draft ? (
          <div className="flex flex-wrap gap-2">
            <button type="submit" className={buttonClass}>
              💾 Enregistrer le brouillon
            </button>
            <button type="submit" formAction={saveAndEmit.bind(null, f.id)} className={greenButtonClass}>
              ✅ Émettre {f.kind === "devis" ? "le devis" : "la facture"} (attribue le numéro)
            </button>
          </div>
        ) : (
          <p className="text-sm text-muted">Ce document est émis : il ne peut plus être modifié (règle légale pour les factures).</p>
        )}
      </form>

      {draft ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted">Une fois émis, le document reçoit son numéro et ne peut plus être modifié.</span>
          <form action={deleteDraft.bind(null, f.id)} className="ml-auto">
            <button type="submit" className="text-sm font-semibold text-red-700 hover:underline">
              🗑️ Supprimer le brouillon
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
