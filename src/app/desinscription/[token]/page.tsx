import type { Metadata } from "next";
import { Suspense } from "react";
import { confirmUnsubscribe } from "./actions";

export const metadata: Metadata = {
  title: "Désinscription",
  robots: { index: false, follow: false },
};

export default function DesinscriptionPage({ params, searchParams }: PageProps<"/desinscription/[token]">) {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 sm:py-24">
      <p className="mb-6 text-center text-xl font-bold">EcocarVHU</p>
      <Suspense fallback={null}>
        <Content params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Content({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ token }, sp] = await Promise.all([params, searchParams]);
  if (sp.fait) {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-sm">
        <p className="text-4xl" aria-hidden="true">✅</p>
        <h1 className="mt-4 text-2xl font-bold">C&apos;est noté</h1>
        <p className="mt-3 text-muted">Vous ne recevrez plus nos messages de prospection. Merci et bonne continuation.</p>
      </div>
    );
  }
  return (
    <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold">Ne plus recevoir nos messages</h1>
      <p className="mt-3 text-muted">Confirmez pour ne plus recevoir les e-mails de prospection d&apos;EcocarVHU.</p>
      {sp.erreur ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-red-900">Ce lien n&apos;est pas valide ou a déjà été utilisé.</p> : null}
      <form action={confirmUnsubscribe.bind(null, token)} className="mt-6">
        <button type="submit" className="rounded-2xl bg-ink px-6 py-3 font-semibold text-white">
          Confirmer la désinscription
        </button>
      </form>
    </div>
  );
}
