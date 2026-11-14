import type { Metadata } from "next";
import Link from "next/link";
import { Card, greenButtonClass, inputClass, PageTitle } from "@/components/admin/ui";
import { FORM_INFO } from "@/lib/admin/demandes";
import { createDemande } from "../../../actions";

export const metadata: Metadata = { title: "Ajouter une demande" };

const FIELDS = [
  ["contact_name", "Nom du client", "text"],
  ["phone", "Téléphone", "tel"],
  ["email", "E-mail", "email"],
  ["address", "Adresse", "text"],
  ["postal_code", "Code postal", "text"],
  ["city", "Commune", "text"],
  ["brand", "Marque", "text"],
  ["model", "Modèle", "text"],
  ["year", "Année", "text"],
] as const;

export default function NewDemandePage() {
  return (
    <>
      <Link href="/admin/demandes" className="text-sm font-semibold text-muted hover:text-ink">
        ← Toutes les demandes
      </Link>
      <div className="mt-3">
        <PageTitle emoji="➕" title="Ajouter une demande" subtitle="Un client a appelé, écrit sur WhatsApp ou t'a parlé en direct ? Note sa demande ici." />
      </div>
      <Card>
        <form action={createDemande} className="grid gap-4 sm:grid-cols-2">
          <fieldset className="sm:col-span-2">
            <legend className="mb-2 font-semibold">Type de demande</legend>
            <div className="flex flex-wrap gap-2">
              {Object.entries(FORM_INFO).map(([k, v], i) => (
                <label key={k} className="cursor-pointer">
                  <input type="radio" name="form_type" value={k} defaultChecked={i === 0} className="peer sr-only" />
                  <span className="block rounded-2xl bg-white px-4 py-2.5 font-semibold ring-1 ring-line peer-checked:bg-brand-bright peer-checked:ring-brand-bright">
                    {v.emoji} {v.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          {FIELDS.map(([name, label, type]) => (
            <label key={name} className="block">
              <span className="mb-1 block text-sm font-semibold">{label}</span>
              <input name={name} type={type} className={inputClass} />
            </label>
          ))}
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Notes</span>
            <textarea name="notes" rows={4} className={inputClass} placeholder="Ce que le client a dit au téléphone…" />
          </label>
          <button type="submit" className={`${greenButtonClass} py-3 text-lg sm:col-span-2`}>
            ✅ Créer la demande
          </button>
        </form>
      </Card>
    </>
  );
}
