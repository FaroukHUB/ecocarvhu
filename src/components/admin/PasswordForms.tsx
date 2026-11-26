"use client";

import { useActionState, useState } from "react";
import { requestPasswordReset, updatePassword } from "@/app/admin/actions";
import { greenButtonClass, inputClass } from "./ui";

/** « Mot de passe oublié ? » : envoie le lien par e-mail. */
export function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(requestPasswordReset, undefined);
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-4 w-full text-center text-sm font-semibold text-brand hover:underline">
        Mot de passe oublié ?
      </button>
    );
  }
  if (state?.ok) return <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">{state.ok}</p>;
  return (
    <form action={action} className="mt-6 space-y-3 border-t border-line pt-5">
      <p className="text-sm text-muted">Indique ton e-mail : tu vas recevoir un lien pour choisir un nouveau mot de passe.</p>
      <input name="email" type="email" autoComplete="username" required placeholder="ton@e-mail.fr" className={inputClass} />
      {state?.error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{state.error}</p> : null}
      <button type="submit" disabled={pending} className={`${greenButtonClass} w-full`}>
        {pending ? "Envoi…" : "📧 Recevoir le lien"}
      </button>
    </form>
  );
}

export function NewPasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, undefined);
  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block">
        <span className="mb-1.5 block font-semibold">Nouveau mot de passe (8 caractères minimum)</span>
        <input name="password" type="password" autoComplete="new-password" minLength={8} required className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-semibold">Encore une fois</span>
        <input name="confirm" type="password" autoComplete="new-password" minLength={8} required className={inputClass} />
      </label>
      {state?.error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{state.error}</p> : null}
      <button type="submit" disabled={pending} className={`${greenButtonClass} w-full py-3 text-lg`}>
        {pending ? "Enregistrement…" : "✅ Enregistrer et me connecter"}
      </button>
    </form>
  );
}
