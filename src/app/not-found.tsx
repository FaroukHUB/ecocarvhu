import type { Metadata } from "next";
import Link from "next/link";
import { pages } from "@/content/pages";
import { Container } from "@/components/ui/primitives";
import { PhoneBig } from "@/components/ui/PhoneBig";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/enlevement-epave#demande", label: "Demander un enlèvement" },
  { href: pages.demandePiece.path, label: "Demander une pièce" },
  { href: pages.rachat.path, label: "Étude de rachat" },
  { href: pages.zones.path, label: "Zones d'intervention" },
  { href: pages.contact.path, label: "Contact" },
];

/** Vraie page 404 (statut HTTP 404), utile, sans redirection vers l'accueil. */
export default function NotFound() {
  return (
    <Container className="py-16 sm:py-24">
      <p className="text-sm font-bold uppercase tracking-wider text-brand">Erreur 404</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">Cette page n&apos;existe pas (ou plus)</h1>
      <p className="mt-4 max-w-xl text-lg text-ink-3">
        L&apos;adresse est peut-être incomplète. Voici les accès les plus utiles :
      </p>
      <ul className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block rounded-xl bg-surface px-4 py-3.5 font-bold hover:text-brand">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 inline-block rounded-2xl bg-ink p-6">
        <PhoneBig placement="404" size="lg" />
      </div>
    </Container>
  );
}
