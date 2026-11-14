"use client";

import { useActionState } from "react";
import { saveCompany } from "@/app/admin/actions";
import type { Company } from "@/lib/admin/argent";
import { greenButtonClass, inputClass } from "./ui";

const FIELDS: [keyof Company, string, string?][] = [
  ["legal_name", "Raison sociale ou nom de l'entrepreneur *"],
  ["legal_form", "Forme juridique", "ex. SAS, EURL, micro-entreprise"],
  ["siret", "SIRET *", "14 chiffres"],
  ["rcs", "RCS", "ex. RCS Marseille 123 456 789"],
  ["capital", "Capital social", "ex. 1 000 €"],
  ["tva_number", "N° de TVA intracommunautaire", "ex. FR12345678901"],
  ["address", "Adresse *"],
  ["postal_code", "Code postal"],
  ["city", "Ville"],
  ["phone", "Téléphone"],
  ["email", "E-mail"],
  ["iban", "IBAN (pour les virements)"],
  ["bic", "BIC"],
];

export function CompanyForm({ company }: { company: Company }) {
  const [state, action, pending] = useActionState(saveCompany, undefined);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      {FIELDS.map(([name, label, hint]) => (
        <label key={name} className="block">
          <span className="mb-1 block text-sm font-semibold">{label}</span>
          <input name={name} defaultValue={String(company[name] ?? "")} placeholder={hint} className={inputClass} />
        </label>
      ))}
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Délai de paiement (jours)</span>
        <input name="payment_days" type="number" min={0} max={60} defaultValue={company.payment_days} className={inputClass} />
      </label>
      <label className="flex items-center gap-3 rounded-2xl bg-surface p-4 sm:col-span-2">
        <input type="checkbox" name="tva_franchise" defaultChecked={company.tva_franchise} className="h-6 w-6 accent-[#25d366]" />
        <span>
          <span className="block font-semibold">Franchise en base de TVA</span>
          <span className="block text-sm text-ink-3">
            À cocher si tu ne factures pas la TVA (micro-entreprise) : la mention « TVA non applicable, art. 293 B du CGI » sera ajoutée.
          </span>
        </span>
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1 block text-sm font-semibold">Mentions en bas de facture</span>
        <textarea name="legal_footer" rows={3} defaultValue={company.legal_footer} className={inputClass} />
      </label>
      {state?.error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">{state.error}</p> : null}
      {state?.ok ? <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900 sm:col-span-2">✅ {state.ok}</p> : null}
      <button type="submit" disabled={pending} className={`${greenButtonClass} py-3 sm:col-span-2`}>
        {pending ? "Enregistrement…" : "💾 Enregistrer"}
      </button>
    </form>
  );
}
