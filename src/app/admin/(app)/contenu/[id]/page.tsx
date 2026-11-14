import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { buttonClass, Card, greenButtonClass, inputClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/demandes";
import { countToConfirm } from "@/lib/visibilite/content";
import { CONTENT_STATUS } from "@/lib/visibilite/status";
import { deleteContentDraft, saveContentDraft, setContentStatus } from "../../../actions";

export const metadata: Metadata = { title: "Texte" };

export default function DraftPage({ params, searchParams }: PageProps<"/admin/contenu/[id]">) {
  return (
    <Suspense fallback={<p className="text-muted">Chargement…</p>}>
      <Draft params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Draft({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase } = await requireUser("admin");
  const { data: d } = await supabase.from("content_drafts").select("*").eq("id", id).maybeSingle();
  if (!d) notFound();
  const status = d.status as keyof typeof CONTENT_STATUS;
  const editable = status === "brouillon";
  const todo = countToConfirm(`${d.title}\n${d.meta_description}\n${d.body}`);
  const words = String(d.body).split(/\s+/).filter(Boolean).length;
  const erreur = typeof sp.erreur === "string" ? sp.erreur : "";

  return (
    <>
      <Link href="/admin/contenu" className="text-sm font-semibold text-muted hover:text-ink">
        ← Contenu
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {d.kind === "ville" ? "🏙️" : "📰"} {d.topic}
        </h1>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${CONTENT_STATUS[status].tone}`}>{CONTENT_STATUS[status].label}</span>
      </div>
      {erreur ? <p className="mt-4 rounded-2xl bg-red-50 p-4 text-red-900">⚠️ {erreur}</p> : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <form action={saveContentDraft.bind(null, d.id)} className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Titre dans Google ({String(d.title).length} car., idéal ≤ 60)</span>
              <input name="title" defaultValue={d.title} disabled={!editable} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Description dans Google ({String(d.meta_description).length} car., idéal 120 à 160)</span>
              <textarea name="meta_description" defaultValue={d.meta_description} rows={3} disabled={!editable} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Recherche Google visée</span>
              <input name="keyword" defaultValue={d.keyword} disabled={!editable} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Texte ({words} mots)</span>
              <textarea name="body" defaultValue={d.body} rows={28} disabled={!editable} className={`${inputClass} font-mono text-sm`} />
            </label>
            {editable ? (
              <button type="submit" className={buttonClass}>
                💾 Enregistrer
              </button>
            ) : (
              <p className="text-sm text-muted">Repassez le texte en brouillon pour le modifier.</p>
            )}
          </form>
        </Card>

        <div className="space-y-5">
          <Card title="Avant de valider" emoji="🧐">
            <ul className="space-y-2 text-sm">
              <li>{todo ? `⚠️ ${todo} passage${todo > 1 ? "s" : ""} [À CONFIRMER] ou [À COMPLÉTER] à traiter.` : "✅ Aucun passage à confirmer."}</li>
              <li>Chaque fait (gratuité, documents, délais, prix) doit être vrai et vérifiable. Dans le doute, supprimez la phrase.</li>
              <li>Pas d&apos;avis client, de chiffre ou de promesse que vous ne pouvez pas prouver.</li>
            </ul>
            {d.notes ? (
              <details className="mt-3 text-sm">
                <summary className="cursor-pointer font-semibold">Vos informations de départ</summary>
                <p className="mt-2 whitespace-pre-line text-muted">{d.notes}</p>
              </details>
            ) : null}
          </Card>

          <Card title="Publication" emoji="🚀">
            {status === "brouillon" ? (
              <>
                <p className="mb-3 text-sm text-muted">Enregistrez vos modifications, puis validez quand le texte est prêt.</p>
                <form action={setContentStatus.bind(null, d.id, "valide")}>
                  <button type="submit" className={greenButtonClass} disabled={todo > 0}>
                    ✅ Valider pour publication
                  </button>
                </form>
              </>
            ) : status === "valide" ? (
              <>
                <p className="mb-3 text-sm">
                  Validé le {d.validated_at ? formatDate(d.validated_at) : "—"}. Pour la mise en ligne, demandez à Claude d&apos;intégrer ce texte au site : il le
                  met en page avec le design du site, puis vous le marquez « En ligne ».
                </p>
                <div className="flex flex-wrap gap-2">
                  <form action={setContentStatus.bind(null, d.id, "publie")}>
                    <button type="submit" className={greenButtonClass}>
                      🌐 Marquer « En ligne »
                    </button>
                  </form>
                  <form action={setContentStatus.bind(null, d.id, "brouillon")}>
                    <button type="submit" className="rounded-xl bg-white px-4 py-2.5 font-semibold ring-1 ring-line">
                      ✏️ Repasser en brouillon
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <p className="text-sm">Ce texte est en ligne.</p>
            )}
          </Card>

          {status !== "publie" ? (
            <form action={deleteContentDraft.bind(null, d.id)}>
              <button type="submit" className="text-sm font-semibold text-red-700 hover:underline">
                🗑️ Supprimer ce texte
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
}
