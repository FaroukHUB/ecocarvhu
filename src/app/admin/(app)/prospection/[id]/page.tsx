import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { buttonClass, Card, greenButtonClass, inputClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/demandes";
import { aiAvailable } from "@/lib/prospection/ai";
import { EMAIL_STATUS, EMAIL_STEPS, STAGES, type Prospect, type ProspectEmail } from "@/lib/prospection/stages";
import { approveAndSend, prepareProspectEmails, saveProspectEmail, saveProspectInfo, setProspectStage } from "../../../actions";

export const metadata: Metadata = { title: "Fiche prospect" };

export default function ProspectPage({ params, searchParams }: PageProps<"/admin/prospection/[id]">) {
  return (
    <Suspense fallback={<p className="text-muted">Chargement…</p>}>
      <Fiche params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Fiche({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase } = await requireUser("admin");
  const [{ data: p }, { data: mails }] = await Promise.all([
    supabase.from("pros").select("*").eq("id", id).maybeSingle<Prospect>(),
    supabase.from("prospect_emails").select("*").eq("pro_id", id).order("step").returns<ProspectEmail[]>(),
  ]);
  if (!p) notFound();
  const emails = mails ?? [];
  const drafts = emails.filter((e) => e.status === "brouillon");
  const started = emails.some((e) => e.status === "envoye" || e.status === "planifie");
  const closed = ["gagne", "refus", "desinscrit"].includes(p.stage);
  const erreur = typeof sp.erreur === "string" ? sp.erreur : "";
  const google = `https://www.google.com/search?q=${encodeURIComponent(`${p.name} ${p.city ?? ""} email contact`)}`;
  const stage = STAGES[p.stage];

  return (
    <>
      <Link href="/admin/prospection?onglet=suivi" className="text-sm font-semibold text-muted hover:text-ink">
        ← Suivi de la prospection
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">{p.name}</h1>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${stage.tone}`}>
          {stage.emoji} {stage.label}
        </span>
      </div>
      <p className="mt-1 text-muted">
        {[p.naf_label, p.effectif, [p.postal_code, p.city].filter(Boolean).join(" ")].filter(Boolean).join(" · ")}
        {p.siren ? ` · SIREN ${p.siren}` : ""}
      </p>
      {erreur ? <p className="mt-4 rounded-2xl bg-red-50 p-4 text-red-900">⚠️ {erreur}</p> : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5">
          <Card title="1. Coordonnées" emoji="📇">
            <form action={saveProspectInfo.bind(null, p.id)} className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">E-mail de l&apos;entreprise *</span>
                <input name="email" type="email" defaultValue={p.email ?? ""} placeholder="contact@…" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Interlocuteur</span>
                <input name="contact_name" defaultValue={p.contact_name ?? ""} placeholder={p.dirigeant ? `ex. ${p.dirigeant}` : ""} className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Téléphone</span>
                <input name="phone" defaultValue={p.phone ?? ""} className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Site internet</span>
                <input name="website" defaultValue={p.website ?? ""} placeholder="www.…" className={inputClass} />
              </label>
              <div className="flex flex-wrap gap-2">
                <button type="submit" className={buttonClass}>
                  💾 Enregistrer
                </button>
                <a href={google} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-semibold ring-1 ring-line">
                  🔎 Chercher l&apos;e-mail sur Google
                </a>
              </div>
              <p className="text-xs text-muted">
                Astuce : l&apos;adresse est souvent sur le site (page Contact ou Mentions légales) ou sur la fiche Google de l&apos;entreprise. Préférez une adresse
                professionnelle (contact@, accueil@…).
              </p>
            </form>
          </Card>

          <Card title="Résultat" emoji="🏁">
            <p className="mb-3 text-sm text-muted">L&apos;entreprise a répondu ? Clique ici, les relances s&apos;arrêtent.</p>
            <div className="flex flex-wrap gap-2">
              <form action={setProspectStage.bind(null, p.id, "repondu")}>
                <button className="rounded-xl bg-amber-100 px-4 py-2.5 font-semibold text-amber-950">💬 A répondu</button>
              </form>
              <form action={setProspectStage.bind(null, p.id, "gagne")}>
                <button className="rounded-xl bg-emerald-100 px-4 py-2.5 font-semibold text-emerald-900">🏆 Client gagné</button>
              </form>
              <form action={setProspectStage.bind(null, p.id, "refus")}>
                <button className="rounded-xl bg-stone-200 px-4 py-2.5 font-semibold">🙅 Pas intéressé</button>
              </form>
            </div>
            {p.stage === "gagne" ? (
              <p className="mt-3 text-sm">
                Il est maintenant dans le{" "}
                <Link href={`/admin/pros/${p.id}`} className="font-semibold underline">
                  Fichier pros
                </Link>{" "}
                comme client.
              </p>
            ) : null}
          </Card>
        </div>

        <div className="space-y-5">
          <Card title="2. Les e-mails" emoji="✍️">
            {!emails.length || (!started && !closed) ? (
              <div className="mb-4 flex flex-wrap gap-2">
                <form action={prepareProspectEmails.bind(null, p.id, "modele")}>
                  <button className={buttonClass}>📝 {drafts.length ? "Repartir des modèles" : "Préparer avec les modèles"}</button>
                </form>
                {aiAvailable() ? (
                  <form action={prepareProspectEmails.bind(null, p.id, "ia")}>
                    <button className={buttonClass}>✨ Rédaction automatique</button>
                  </form>
                ) : null}
              </div>
            ) : null}
            {emails.length ? (
              <div className="space-y-4">
                {emails.map((e) => (
                  <div key={e.id} className="rounded-2xl bg-surface p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-bold">
                        {e.step}. {EMAIL_STEPS[e.step]}
                      </p>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${EMAIL_STATUS[e.status].tone}`}>
                        {EMAIL_STATUS[e.status].label}
                        {e.status === "planifie" && e.scheduled_at ? ` le ${formatDate(e.scheduled_at)}` : ""}
                        {e.status === "envoye" && e.sent_at ? ` le ${formatDate(e.sent_at)}` : ""}
                      </span>
                    </div>
                    {e.status === "brouillon" ? (
                      <form action={saveProspectEmail.bind(null, e.id, p.id)} className="space-y-2">
                        <input name="subject" defaultValue={e.subject} className={inputClass} aria-label="Objet" />
                        <textarea name="body" defaultValue={e.body} rows={e.step === 1 ? 12 : 7} className={inputClass} aria-label="Message" />
                        <button type="submit" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold ring-1 ring-line">
                          💾 Enregistrer les modifications
                        </button>
                      </form>
                    ) : (
                      <>
                        <p className="font-semibold">{e.subject}</p>
                        <p className="mt-1 whitespace-pre-line text-sm text-ink-3">{e.body}</p>
                        {e.error ? <p className="mt-2 text-sm text-red-800">{e.error}</p> : null}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">Aucun e-mail préparé pour l&apos;instant.</p>
            )}
          </Card>

          {drafts.some((e) => e.step === 1) && !closed ? (
            <Card title="3. Valider et envoyer" emoji="🚀">
              <p className="text-sm text-muted">
                Le premier e-mail part tout de suite à <strong>{p.email || "— e-mail manquant —"}</strong>. Les relances partent ensuite toutes seules aux dates
                prévues, sauf si tu indiques une réponse ou un refus, ou si l&apos;entreprise se désinscrit.
              </p>
              <form action={approveAndSend.bind(null, p.id)} className="mt-4">
                <button type="submit" disabled={!p.email} className={greenButtonClass}>
                  ✅ Approuver et envoyer
                </button>
              </form>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
}
