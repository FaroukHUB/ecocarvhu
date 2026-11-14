"use client";

import { useActionState } from "react";
import { addMember } from "@/app/admin/actions";
import { greenButtonClass, inputClass } from "./ui";

export function AddMemberForm() {
  const [state, action, pending] = useActionState(addMember, undefined);
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Prénom</span>
        <input name="full_name" required className={inputClass} placeholder="ex. Karim" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">E-mail</span>
        <input name="email" type="email" required className={inputClass} placeholder="chauffeur@exemple.fr" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Mot de passe (8 caractères minimum)</span>
        <input name="password" type="text" minLength={8} required className={inputClass} autoComplete="off" />
        <span className="mt-1 block text-xs text-muted">Notez-le et transmettez-le à la personne.</span>
      </label>
      <fieldset>
        <legend className="mb-1 block text-sm font-semibold">Rôle</legend>
        <div className="flex flex-wrap gap-2">
          {[
            ["chauffeur", "🚚 Chauffeur", "voit seulement ses enlèvements"],
            ["admin", "🔑 Administrateur", "voit tout"],
          ].map(([value, label, hint], i) => (
            <label key={value} className="cursor-pointer">
              <input type="radio" name="role" value={value} defaultChecked={i === 0} className="peer sr-only" />
              <span className="block rounded-2xl bg-white px-4 py-2 ring-1 ring-line peer-checked:bg-brand-bright peer-checked:ring-brand-bright">
                <span className="block font-semibold">{label}</span>
                <span className="block text-xs text-ink-3">{hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {state?.error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">{state.error}</p> : null}
      {state?.ok ? <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900 sm:col-span-2">✅ {state.ok}</p> : null}
      <button type="submit" disabled={pending} className={`${greenButtonClass} py-3 sm:col-span-2`}>
        {pending ? "Ajout…" : "➕ Ajouter cette personne"}
      </button>
    </form>
  );
}
