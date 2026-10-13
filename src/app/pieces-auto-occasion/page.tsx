import Link from "next/link";
import { pages } from "@/content/pages";
import { partFamilies } from "@/content/home";
import { buildMetadata } from "@/lib/seo";
import { guideHref } from "@/lib/publication";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Eyebrow, H2, Notice, Section } from "@/components/ui/primitives";
import { Faq } from "@/components/ui/Faq";
import { CallBand } from "@/components/sections/CallBand";
import { CameraIcon, CheckIcon, DocIcon, GearIcon } from "@/components/ui/icons";

const page = pages.pieces;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

const compat = [
  { title: "Marque, modèle, année", text: "La date de première mise en circulation figure sur la carte grise (rubrique B)." },
  { title: "Motorisation", text: "Cylindrée, carburant, puissance, type de boîte : indispensable pour la mécanique." },
  { title: "Référence constructeur", text: "Gravée ou étiquetée sur beaucoup de pièces. Une photo suffit." },
  { title: "Côté et position", text: "Avant/arrière, gauche/droite (vu depuis le siège conducteur)." },
  { title: "Couleur et finition", text: "Pour la carrosserie : couleur, code peinture si vous l'avez." },
];

const ways = [
  { icon: DocIcon, title: "Vous connaissez la référence", text: "Indiquez-la avec le véhicule : c'est la recherche la plus rapide." },
  { icon: GearIcon, title: "Vous connaissez le nom de la pièce", text: "Précisez la motorisation et la position (côté, avant/arrière)." },
  { icon: CameraIcon, title: "Vous ne savez pas comment elle s'appelle", text: "Décrivez le problème et envoyez une photo de l'emplacement." },
];

const faq = [
  {
    q: "Les pièces sont-elles disponibles immédiatement ?",
    a: "La disponibilité dépend des véhicules pris en charge. Elle est vérifiée pour chaque demande : aucune pièce n'est annoncée comme disponible sans contrôle.",
  },
  {
    q: "Comment être sûr que la pièce est compatible ?",
    a: "La compatibilité est vérifiée à partir des informations du véhicule et, quand c'est possible, de la référence constructeur. Plus votre description est précise, plus la vérification est fiable.",
  },
  {
    q: "Puis-je donner mon immatriculation ?",
    a: "Oui, si vous le souhaitez : elle aide l'équipe à vérifier manuellement la compatibilité. Elle n'est pas obligatoire et aucune identification automatique n'est faite sur ce site.",
  },
  {
    q: "Retrait sur place ou envoi ?",
    a: "Les modalités de retrait ou d'envoi, ainsi que le prix et la garantie éventuelle, vous sont précisés avec la proposition, avant tout engagement.",
  },
];

export default function PiecesPage() {
  const refGuide = guideHref("identifier-reference-piece");
  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Pièces de réemploi"
        title={page.h1}
        lead={
          <p>
            Une pièce d&apos;occasion n&apos;est utile que si elle est compatible. Décrivez votre véhicule
            et votre besoin, même sans connaître le nom exact de la pièce : la disponibilité et la
            compatibilité sont vérifiées avant toute proposition.
          </p>
        }
        actions={<ButtonLink href={pages.demandePiece.path}>Faire une demande de pièce</ButtonLink>}
      />

      <Section labelledBy="ways-title">
        <Eyebrow>Trois façons de demander</Eyebrow>
        <H2 id="ways-title">Pas besoin d&apos;être mécanicien</H2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {ways.map((w) => (
            <li key={w.title} className="rounded-2xl bg-surface p-6">
              <w.icon className="h-8 w-8 text-brand" />
              <h3 className="mt-3 text-lg font-bold">{w.title}</h3>
              <p className="mt-1.5 text-ink-3">{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="familles-title">
        <Eyebrow>Catégories</Eyebrow>
        <H2 id="familles-title">Familles de pièces</H2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partFamilies.map((f) => (
            <li key={f.title} className="rounded-2xl bg-paper p-5 ring-1 ring-line">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <CheckIcon className="h-5 w-5 text-brand" /> {f.title}
              </h3>
              <p className="mt-1.5 text-[0.95rem] text-ink-3">{f.items}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Ces catégories décrivent les recherches possibles, pas un stock en ligne : la disponibilité est
          confirmée au cas par cas.
        </p>
      </Section>

      <Section labelledBy="compat-title">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow>Compatibilité</Eyebrow>
            <H2 id="compat-title">Les informations qui évitent une erreur</H2>
            <dl className="mt-6 divide-y divide-line rounded-2xl ring-1 ring-line">
              {compat.map((c) => (
                <div key={c.title} className="grid gap-1 px-5 py-4 sm:grid-cols-[13rem_1fr]">
                  <dt className="font-bold">{c.title}</dt>
                  <dd className="text-ink-3">{c.text}</dd>
                </div>
              ))}
            </dl>
            {refGuide ? (
              <p className="mt-4">
                <Link href={refGuide} className="font-semibold text-brand underline">
                  Où trouver la référence d&apos;une pièce
                </Link>
              </p>
            ) : null}
          </div>
          <div className="space-y-4">
            <Notice title="Ce qui est vérifié avant de vous répondre">
              Disponibilité de la pièce, compatibilité avec votre véhicule, état. Le prix, la garantie et
              les modalités de retrait ou d&apos;envoi sont indiqués avec la proposition.
            </Notice>
            <ButtonLink href={pages.demandePiece.path}>Décrire ma pièce</ButtonLink>
            <p className="text-sm text-ink-3">
              Vous êtes garagiste ou carrossier ?{" "}
              <Link href={pages.pros.path} className="font-semibold text-brand underline">
                Envoyez une liste de références
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="faq-title">
        <H2 id="faq-title">Questions fréquentes sur les pièces</H2>
        <div className="mt-8">
          <Faq items={faq} />
        </div>
      </Section>

      <CallBand
        placement="pieces"
        title="Une pièce à trouver ?"
        text="Appelez avec votre carte grise sous la main, ou décrivez la pièce en ligne avec une photo."
        formHref={pages.demandePiece.path}
        formLabel="Demander une pièce"
      />
    </>
  );
}
