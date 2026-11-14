import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Connexion" };

export default function LoginPage({ searchParams }: PageProps<"/admin/connexion">) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-grid px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl sm:p-9">
        <p className="flex items-center gap-3 text-2xl font-bold">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-bright text-2xl" aria-hidden="true">
            ♻️
          </span>
          <span>
            Ecocar<span className="text-brand">VHU</span>
            <span className="block text-sm font-medium text-muted">Espace de gestion</span>
          </span>
        </p>
        <Suspense fallback={null}>
          <Refus searchParams={searchParams} />
        </Suspense>
        <LoginForm />
      </div>
    </div>
  );
}

async function Refus({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { refus } = await searchParams;
  return refus ? (
    <p className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
      Ce compte n&apos;a pas encore accès à l&apos;espace de gestion.
    </p>
  ) : null;
}
