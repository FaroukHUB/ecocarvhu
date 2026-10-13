import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, ButtonLink, Notice } from "@/components/ui/primitives";
import { PhoneBig } from "@/components/ui/PhoneBig";
import { RESULT_STATUSES } from "@/lib/routes";

/**
 * Résultat d'un envoi sans JavaScript (redirection 303 depuis /api/demandes).
 * Jamais indexé. Aucune donnée personnelle dans l'URL.
 */

const RESULTS: Record<(typeof RESULT_STATUSES)[number], { title: string; text: string; ok: boolean }> = {
  "ok-sent": {
    ok: true,
    title: "Votre demande a été transmise",
    text: "Elle a été acceptée par notre service d'envoi. Ce n'est pas encore un rendez-vous : l'équipe vous recontacte pour confirmer.",
  },
  "ok-demo": {
    ok: false,
    title: "Mode démonstration : rien n'a été transmis",
    text: "Aucun service d'envoi n'est configuré sur cet environnement local.",
  },
  invalid: {
    ok: false,
    title: "Certains champs sont à corriger",
    text: "Revenez au formulaire pour compléter les informations obligatoires.",
  },
  "rejected-file": {
    ok: false,
    title: "Une photo a été refusée",
    text: "Seules les photos JPEG, PNG, WebP ou HEIC de taille raisonnable sont acceptées. Revenez au formulaire et réessayez avec moins de photos.",
  },
  spam: {
    ok: false,
    title: "La demande n'a pas pu être validée",
    text: "Revenez au formulaire et réessayez.",
  },
  "rate-limited": {
    ok: false,
    title: "Trop de demandes envoyées",
    text: "Patientez quelques minutes avant de réessayer, ou appelez-nous.",
  },
  unavailable: {
    ok: false,
    title: "L'envoi en ligne n'est pas disponible",
    text: "Votre demande n'a pas été transmise. Appelez-nous pour la faire directement.",
  },
  failed: {
    ok: false,
    title: "La demande n'a pas pu être transmise",
    text: "Un problème technique a empêché l'envoi. Réessayez dans un instant ou appelez-nous.",
  },
};

export function generateStaticParams() {
  return Object.keys(RESULTS).map((statut) => ({ statut }));
}

export const metadata: Metadata = {
  title: "Résultat de votre demande",
  robots: { index: false, follow: false },
};

export default async function ResultPage({ params }: PageProps<"/demande/resultat/[statut]">) {
  const { statut } = await params;
  const r = (RESULTS as Record<string, (typeof RESULTS)[keyof typeof RESULTS]>)[statut];
  if (!r) notFound();
  return (
    <Container className="max-w-3xl py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">{r.title}</h1>
      <div className="mt-6">
        <Notice tone={r.ok ? "info" : "warn"}>{r.text}</Notice>
      </div>
      <div className="mt-8">
        <PhoneBig placement="result-page" size="lg" />
      </div>
      <div className="mt-8">
        <ButtonLink href="/" variant="ghost">
          Retour à l&apos;accueil
        </ButtonLink>
      </div>
    </Container>
  );
}
