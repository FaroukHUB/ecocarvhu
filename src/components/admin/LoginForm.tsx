"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";
import { greenButtonClass, inputClass } from "./ui";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined);
  return (
    <form action={action} className="mt-7 space-y-4">
      <label className="block">
        <span className="mb-1.5 block font-semibold">E-mail</span>
        <input name="email" type="email" autoComplete="username" required className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-semibold">Mot de passe</span>
        <input name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </label>
      {state?.error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{state.error}</p> : null}
      <button type="submit" disabled={pending} className={`${greenButtonClass} w-full py-3 text-lg`}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
