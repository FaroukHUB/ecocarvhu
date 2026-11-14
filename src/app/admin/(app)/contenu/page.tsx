import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { posts } from "@/content/blog";
import { sectors } from "@/content/sectors/data";
import { Card, greenButtonClass, buttonClass, inputClass, PageTitle } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { ago, currentTime } from "@/lib/admin/demandes";
import { isPostPublished, isSectorPublished } from "@/lib/publication";
import { aiAvailable } from "@/lib/prospection/ai";
import { CONTENT_STATUS } from "@/lib/visibilite/status";
import { createContentDraft } from "../../actions";

export const metadata: Metadata = { title: "Contenu" };

export default function ContenuPage({ searchParams }: PageProps<"/admin/contenu">) {
  return (
    <>
      <PageTitle emoji="✍️" title="Contenu" subtitle="Un article de blog ou une nouvelle page ville : tu prépares, tu relis, tu valides." />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Content searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Content({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const { supabase } = await requireUser("admin");
  const { data } = await supabase.from("content_drafts").select("id, kind, topic, title, status, updated_at").order("updated_at", { ascending: false }).limit(200);
  const drafts = data ?? [];
  const now = currentTime();
  const onlineCities = sectors.filter((s) => s.kind === "city" && isSectorPublished(s.status)).length;
  const preparedCities = sectors.filter((s) => s.kind === "city" && !isSectorPublished(s.status)).length;
  const onlinePosts = posts.filter(isPostPublished).length;
  const erreur = typeof sp.erreur === "string" ? sp.erreur : "";

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-muted">Pages ville en ligne</p>
          <p className="text-3xl font-bold">{onlineCities}</p>
          {preparedCities ? <p className="text-xs text-muted">+ {preparedCities} préparées, pas encore publiées</p> : null}
        </Card>
        <Card>
          <p className="text-sm text-muted">Articles de blog en ligne</p>
          <p className="text-3xl font-bold">{onlinePosts}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Brouillons en cours</p>
          <p className="text-3xl font-bold">{drafts.filter((d) => d.status === "brouillon").length}</p>
        </Card>
      </div>

      <Card title="Nouveau contenu" emoji="✨">
        {erreur ? <p className="mb-4 rounded-2xl bg-red-50 p-4 text-red-900">⚠️ {erreur}</p> : null}
        <form action={createContentDraft} className="space-y-3">
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 font-semibold">
              <input type="radio" name="kind" value="article" defaultChecked className="h-5 w-5 accent-brand" /> 📰 Article de blog
            </label>
            <label className="flex items-center gap-2 font-semibold">
              <input type="radio" name="kind" value="ville" className="h-5 w-5 accent-brand" /> 🏙️ Page ville
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Sujet de l&apos;article, ou nom de la ville *</span>
            <input name="topic" required maxLength={150} placeholder="ex. Que faire d'une voiture qui ne passe plus le contrôle technique ? / Gardanne" className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Recherche Google visée</span>
            <input name="keyword" maxLength={120} placeholder="ex. épaviste Gardanne" className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Informations vérifiées à utiliser (facultatif)</span>
            <textarea name="notes" rows={4} maxLength={4000} placeholder="Ce que tu sais de sûr : secteurs desservis, cas fréquents, particularités d'accès…" className={inputClass} />
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="submit" name="mode" value="plan" className={buttonClass}>
              📝 Partir d&apos;un plan à compléter
            </button>
            {aiAvailable() ? (
              <button type="submit" name="mode" value="ia" className={greenButtonClass}>
                ✨ Rédaction automatique
              </button>
            ) : null}
          </div>
          <p className="text-xs text-muted">
            {aiAvailable()
              ? "Le texte part de ce qu'on sait de sûr ; le reste est marqué [À CONFIRMER]. Relis chaque phrase avant de valider."
              : "Tu pars d'un plan, et tu le remplis à ta façon."}
          </p>
        </form>
      </Card>

      <Card title="Tes textes" emoji="🗂️">
        {drafts.length ? (
          <ul className="divide-y divide-line">
            {drafts.map((d) => (
              <li key={d.id}>
                <Link href={`/admin/contenu/${d.id}`} className="flex items-center gap-3 py-3 hover:bg-surface">
                  <span className="text-2xl" aria-hidden="true">
                    {d.kind === "ville" ? "🏙️" : "📰"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{d.title || d.topic}</span>
                    <span className="block text-xs text-muted">Modifié {ago(d.updated_at, now)}</span>
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${CONTENT_STATUS[d.status as keyof typeof CONTENT_STATUS].tone}`}>
                    {CONTENT_STATUS[d.status as keyof typeof CONTENT_STATUS].label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Aucun texte pour l&apos;instant.</p>
        )}
      </Card>
    </div>
  );
}
