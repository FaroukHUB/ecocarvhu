import Link from "next/link";
import { draftsVisible } from "@/config/env";
import { pages } from "@/content/pages";
import { sectors } from "@/content/sectors/data";
import { isSectorPublished, sectorPath } from "@/lib/publication";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Eyebrow, H2, Notice, Section } from "@/components/ui/primitives";
import { SectorList } from "@/components/sections/SectorList";
import { CallBand } from "@/components/sections/CallBand";

const page = pages.zones;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

export default function ZonesPage() {
  const foreign = sectors.filter((s) => s.kind === "foreign-state");
  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Provence-Alpes-Côte d'Azur"
        title={page.h1}
        lead={
          <p>
            La zone visée est la région Provence-Alpes-Côte d&apos;Azur et ses six départements. Plutôt
            qu&apos;une carte qui promettrait tout partout, chaque demande est vérifiée à partir de la
            commune et de l&apos;accès au véhicule.
          </p>
        }
        actions={<ButtonLink href="/enlevement-epave#demande">Vérifier ma commune avec une demande</ButtonLink>}
      />

      <Section labelledBy="secteurs-title">
        <Eyebrow>Secteurs</Eyebrow>
        <H2 id="secteurs-title">Secteurs et départements</H2>
        <p className="mt-3 max-w-2xl text-ink-3">
          Votre commune n&apos;apparaît pas ? Ce n&apos;est pas une liste fermée : faites une demande avec
          votre code postal.
        </p>
        <div className="mt-8">
          <SectorList />
        </div>
      </Section>

      <Section tone="surface" labelledBy="regles-title">
        <H2 id="regles-title" className="text-2xl sm:text-3xl">
          Comment un secteur est annoncé
        </H2>
        <ul className="prose-eco mt-4 max-w-3xl text-ink-3">
          <li>un secteur n&apos;est présenté comme desservi qu&apos;une fois le service confirmé par l&apos;entreprise ;</li>
          <li>une zone desservie n&apos;est pas une agence : aucune adresse locale n&apos;est affichée sans établissement réel ;</li>
          <li>les délais et conditions sont donnés pour chaque demande, pas de façon générale.</li>
        </ul>
      </Section>

      {draftsVisible && foreign.length ? (
        <Section>
          <Notice tone="warn" title="Prévisualisation uniquement — secteur hors France">
            {foreign.map((s) => (
              <p key={s.slug}>
                <Link href={sectorPath(s)} className="font-semibold underline">
                  {s.name}
                </Link>{" "}
                : État distinct, page en brouillon {isSectorPublished(s.status) ? "" : "(non publiée)"}.
              </p>
            ))}
          </Notice>
        </Section>
      ) : null}

      <CallBand placement="zones" />
    </>
  );
}
