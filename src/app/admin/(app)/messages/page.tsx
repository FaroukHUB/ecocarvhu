import type { Metadata } from "next";
import { Suspense } from "react";
import { buttonClass, Card, greenButtonClass, inputClass, PageTitle } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { deleteTemplate, saveTemplate } from "../../actions";

export const metadata: Metadata = { title: "Messages types" };

export default function MessagesPage() {
  return (
    <>
      <PageTitle
        emoji="💬"
        title="Messages types"
        subtitle="Des textes prêts à envoyer depuis une fiche, par WhatsApp, SMS ou e-mail."
      />
      <Card className="mb-6" title="Les mots magiques" emoji="✨">
        <p className="text-sm text-ink-3">
          Ils sont remplacés automatiquement par les infos de la demande : <code>{"{prenom}"}</code>, <code>{"{nom}"}</code>,{" "}
          <code>{"{ville}"}</code>, <code>{"{vehicule}"}</code>, <code>{"{date_rdv}"}</code>.
        </p>
      </Card>
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Templates />
      </Suspense>
    </>
  );
}

async function Templates() {
  const { supabase } = await requireUser("admin");
  const { data } = await supabase.from("message_templates").select("id, title, body").order("position");
  return (
    <div className="grid gap-4">
      {(data ?? []).map((t) => (
        <Card key={t.id}>
          <form action={saveTemplate} className="space-y-3">
            <input type="hidden" name="id" value={t.id} />
            <input name="title" defaultValue={t.title} className={`${inputClass} font-semibold`} />
            <textarea name="body" defaultValue={t.body} rows={4} className={inputClass} />
            <div className="flex flex-wrap gap-2">
              <button type="submit" className={buttonClass}>
                💾 Enregistrer
              </button>
            </div>
          </form>
          <form action={deleteTemplate.bind(null, t.id)} className="mt-2">
            <button type="submit" className="text-sm font-semibold text-red-700 hover:underline">
              Supprimer ce message
            </button>
          </form>
        </Card>
      ))}
      <Card title="Nouveau message" emoji="➕">
        <form action={saveTemplate} className="space-y-3">
          <input name="title" placeholder="Titre (ex. Relance sans réponse)" className={inputClass} />
          <textarea name="body" rows={4} placeholder="Bonjour {prenom}, …" className={inputClass} />
          <button type="submit" className={greenButtonClass}>
            ➕ Ajouter
          </button>
        </form>
      </Card>
    </div>
  );
}
