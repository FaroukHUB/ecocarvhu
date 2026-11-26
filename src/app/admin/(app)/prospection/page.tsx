import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, greenButtonClass, inputClass, PageTitle, buttonClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import {ago} from "@/lib/admin/demandes";
import { currentTime } from "@/lib/admin/now";
import { ACTIVITES, DEPARTEMENTS, searchCompanies, TAILLES, type Company } from "@/lib/prospection/search";
import { EMAIL_STEPS, STAGES, type Prospect, type Stage } from "@/lib/prospection/stages";
import { addProspects, saveProspectTemplate } from "../../actions";

export const metadata: Metadata = { title: "Prospection" };

type SP = Record<string, string | string[] | undefined>;
const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");

export default function ProspectionPage({ searchParams }: PageProps<"/admin/prospection">) {
  return (
    <>
      <PageTitle emoji="🎯" title="Prospection" subtitle="Tu trouves des entreprises, tu prépares les e-mails, tu valides : les relances partent toutes seules." />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Content searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Content({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const onglet = ["trouver", "suivi", "modeles"].includes(str(sp.onglet)) ? str(sp.onglet) : "trouver";
  const tab = (key: string, label: string) => (
    <Link
      href={`/admin/prospection?onglet=${key}`}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ring-1 ${onglet === key ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}
    >
      {label}
    </Link>
  );
  return (
    <>
      <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-2">
        {tab("trouver", "🔍 Trouver des entreprises")}
        {tab("suivi", "📬 Suivi")}
        {tab("modeles", "✏️ Modèles d'e-mails")}
      </div>
      {onglet === "trouver" ? <Trouver sp={sp} /> : onglet === "suivi" ? <Suivi sp={sp} /> : <Modeles />}
    </>
  );
}

async function Trouver({ sp }: { sp: SP }) {
  const naf = ACTIVITES.some((a) => a.code === str(sp.naf)) ? str(sp.naf) : "";
  const dep = DEPARTEMENTS.some((d) => d.code === str(sp.dep)) ? str(sp.dep) : "13";
  const taille = TAILLES.some((t) => t.key === str(sp.taille)) ? str(sp.taille) : "toutes";
  const q = str(sp.q).trim().slice(0, 80);
  const page = Math.min(Math.max(Number(str(sp.page)) || 1, 1), 50);

  let result: { total: number; pages: number; companies: Company[] } | null = null;
  let error = "";
  let known = new Set<string>();
  if (naf) {
    const { supabase } = await requireUser("admin");
    try {
      result = await searchCompanies({ naf, dep, taille, q, page });
    } catch (e) {
      error = e instanceof Error ? e.message : "Recherche impossible.";
    }
    const sirens = result?.companies.map((c) => c.siren) ?? [];
    if (sirens.length) {
      const { data } = await supabase.from("pros").select("siren").in("siren", sirens);
      known = new Set((data ?? []).map((r) => r.siren as string));
    }
  }
  const pageHref = (n: number) => `/admin/prospection?${new URLSearchParams({ onglet: "trouver", naf, dep, taille, q, page: String(n) })}`;

  return (
    <>
      <Card>
        <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_1.2fr_1.5fr_auto] lg:items-end">
          <input type="hidden" name="onglet" value="trouver" />
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Activité</span>
            <select name="naf" defaultValue={naf} required className={inputClass}>
              <option value="" disabled>
                Choisir…
              </option>
              {ACTIVITES.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Département</span>
            <select name="dep" defaultValue={dep} className={inputClass}>
              {DEPARTEMENTS.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Taille</span>
            <select name="taille" defaultValue={taille} className={inputClass}>
              {TAILLES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Ville ou nom (facultatif)</span>
            <input name="q" defaultValue={q} placeholder="ex. Aubagne" className={inputClass} />
          </label>
          <button type="submit" className={greenButtonClass}>
            🔍 Chercher
          </button>
        </form>
        <p className="mt-3 text-xs text-muted">Les entreprises viennent de la base officielle de l&apos;État. Celles qui ont fermé n&apos;apparaissent pas.</p>
      </Card>

      {error ? <p className="mt-5 rounded-2xl bg-red-50 p-4 text-red-900">{error}</p> : null}

      {result ? (
        result.companies.length ? (
          <form action={addProspects} className="mt-5">
            <input type="hidden" name="companies" value={JSON.stringify(result.companies)} />
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-muted">
                {result.total.toLocaleString("fr-FR")} entreprise{result.total > 1 ? "s" : ""} · page {page}/{Math.max(result.pages, 1)}
              </p>
              <button type="submit" className={greenButtonClass}>
                ➕ Ajouter la sélection à la prospection
              </button>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {result.companies.map((c) => {
                const inFile = known.has(c.siren);
                const blocked = c.refuseProspection;
                return (
                  <li key={c.siren}>
                    <label
                      className={`flex h-full gap-3 rounded-3xl border bg-white p-4 shadow-sm ${blocked || inFile ? "border-line opacity-60" : "cursor-pointer border-line hover:border-brand"}`}
                    >
                      <input type="checkbox" name="siren" value={c.siren} disabled={blocked || inFile} defaultChecked={!blocked && !inFile} className="mt-1 h-5 w-5 shrink-0 accent-brand" />
                      <span className="min-w-0">
                        <span className="block font-bold">{c.name}</span>
                        <span className="block text-sm text-ink-3">
                          {[c.postalCode, c.city].filter(Boolean).join(" ")} · {c.effectif}
                        </span>
                        {c.dirigeant ? <span className="block text-sm text-muted">Dirigeant : {c.dirigeant}</span> : null}
                        {blocked ? (
                          <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-900">
                            Refuse la prospection : exclue
                          </span>
                        ) : inFile ? (
                          <span className="mt-1 inline-block rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold">Déjà dans ton fichier</span>
                        ) : null}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex justify-between gap-3">
              {page > 1 ? (
                <Link href={pageHref(page - 1)} className="rounded-2xl bg-white px-4 py-2 font-semibold ring-1 ring-line">
                  ← Page précédente
                </Link>
              ) : (
                <span />
              )}
              {page < result.pages ? (
                <Link href={pageHref(page + 1)} className="rounded-2xl bg-white px-4 py-2 font-semibold ring-1 ring-line">
                  Page suivante →
                </Link>
              ) : null}
            </div>
          </form>
        ) : (
          <p className="mt-5 rounded-3xl bg-white p-8 text-center text-muted">Aucune entreprise trouvée avec ces critères.</p>
        )
      ) : !naf ? (
        <p className="mt-5 rounded-3xl bg-white p-8 text-center text-muted">Choisis une activité et un département pour lancer la recherche.</p>
      ) : null}
    </>
  );
}

async function Suivi({ sp }: { sp: SP }) {
  const { supabase } = await requireUser("admin");
  const stage = str(sp.etape) in STAGES ? (str(sp.etape) as Stage) : null;
  let query = supabase.from("pros").select("*").not("siren", "is", null).order("updated_at", { ascending: false }).limit(300);
  if (stage) query = query.eq("stage", stage);
  const [{ data }, { data: all }] = await Promise.all([query.returns<Prospect[]>(), supabase.from("pros").select("stage").not("siren", "is", null)]);
  const rows = data ?? [];
  const now = (await currentTime());
  const ajoutes = Number(str(sp.ajoutes));
  const count = (k: string) => (all ?? []).filter((r) => r.stage === k).length;
  return (
    <>
      {str(sp.ajoutes) ? (
        <p className="mb-4 rounded-2xl bg-emerald-50 p-4 text-emerald-950">
          ✅ {ajoutes} entreprise{ajoutes > 1 ? "s" : ""} ajoutée{ajoutes > 1 ? "s" : ""}. Ouvre chaque fiche pour ajouter l&apos;e-mail et préparer les messages.
        </p>
      ) : null}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        <Link
          href="/admin/prospection?onglet=suivi"
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ring-1 ${!stage ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}
        >
          Tous ({all?.length ?? 0})
        </Link>
        {Object.entries(STAGES).map(([k, v]) => (
          <Link
            key={k}
            href={`/admin/prospection?onglet=suivi&etape=${k}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ring-1 ${stage === k ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}
          >
            {v.emoji} {v.label} ({count(k)})
          </Link>
        ))}
      </div>
      {rows.length ? (
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {rows.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/prospection/${p.id}`} className="flex items-center gap-4 rounded-3xl border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-2xl" aria-hidden="true">
                  {STAGES[p.stage].emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold">{p.name}</span>
                  <span className="block truncate text-sm text-ink-3">
                    {p.naf_label ?? "—"} · {p.city ?? "ville ?"}
                  </span>
                  <span className="block text-xs text-muted">
                    {p.email ? "✉️ e-mail renseigné" : "⚠️ e-mail à trouver"}
                    {p.last_contact_at ? ` · contacté ${ago(p.last_contact_at, now)}` : ""}
                  </span>
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STAGES[p.stage].tone}`}>{STAGES[p.stage].label}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-3xl bg-white p-8 text-center text-muted">
          Rien ici pour l&apos;instant.{" "}
          <Link href="/admin/prospection" className="font-semibold underline">
            Trouver des entreprises
          </Link>
        </p>
      )}
    </>
  );
}

async function Modeles() {
  const { supabase } = await requireUser("admin");
  const { data } = await supabase.from("prospect_templates").select("*").order("step");
  return (
    <div className="space-y-5">
      <p className="rounded-2xl bg-white p-4 text-sm text-muted">
        Mots remplacés automatiquement : <code>{"{entreprise}"}</code>, <code>{"{ville}"}</code>, <code>{"{dirigeant}"}</code> (nom de l&apos;interlocuteur),{" "}
        <code>{"{accroche}"}</code> (phrase adaptée à l&apos;activité). Le lien de désinscription est ajouté tout seul en bas de chaque e-mail.
      </p>
      {(data ?? []).map((t) => (
        <Card key={t.step} title={`${t.step}. ${EMAIL_STEPS[t.step]}`} emoji={t.step === 1 ? "📨" : t.step === 2 ? "🔁" : "👋"}>
          <form action={saveProspectTemplate.bind(null, t.step)} className="space-y-3">
            {t.step > 1 ? (
              <label className="block max-w-xs">
                <span className="mb-1 block text-sm font-semibold">Envoyé combien de jours après le premier e-mail</span>
                <input name="delay_days" type="number" min={1} max={60} defaultValue={t.delay_days} className={inputClass} />
              </label>
            ) : (
              <input type="hidden" name="delay_days" value="0" />
            )}
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Objet</span>
              <input name="subject" defaultValue={t.subject} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Message</span>
              <textarea name="body" defaultValue={t.body} rows={10} className={inputClass} />
            </label>
            <button type="submit" className={buttonClass}>
              💾 Enregistrer
            </button>
          </form>
        </Card>
      ))}
    </div>
  );
}
