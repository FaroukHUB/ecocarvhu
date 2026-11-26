import type { Metadata } from "next";
import { Suspense } from "react";
import { NewPasswordForm } from "@/components/admin/PasswordForms";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Nouveau mot de passe" };

export default function NewPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-grid px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl sm:p-9">
        <p className="flex items-center gap-3 text-2xl font-bold">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-bright text-2xl" aria-hidden="true">
            🔑
          </span>
          <span>
            Nouveau mot de passe
            <span className="block text-sm font-medium text-muted">EcocarVHU · Espace de gestion</span>
          </span>
        </p>
        <Suspense fallback={null}>
          <Gate />
        </Suspense>
      </div>
    </div>
  );
}

async function Gate() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion?lien=expire");
  return (
    <>
      <p className="mt-5 text-muted">
        Choisis ton nouveau mot de passe pour <strong className="text-ink">{user.email}</strong>.
      </p>
      <NewPasswordForm />
    </>
  );
}
