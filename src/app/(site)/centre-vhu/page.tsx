import Link from "next/link";
import { company } from "@/config/company";
import { pages } from "@/content/pages";
import { centreStatusExplanation, freeOfChargeExplanation, sources } from "@/content/regulatory";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Container, Eyebrow, H2, Notice, Section } from "@/components/ui/primitives";
import { PartnerCentreCard } from "@/components/sections/PartnerCentreCard";
import { DocumentsChecklist } from "@/components/sections/DocumentsChecklist";
import { CallBand } from "@/components/sections/CallBand";
import { FeatureList } from "@/components/ui/FeatureList";

const page = pages.centreVhu;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

const treatment = [
  { title: "Dépollution", text: "Retrait des fluides (huiles, carburant, liquide de refroidissement, liquide de frein), de la batterie et des éléments dangereux." },
  { title: "Démontage et réemploi", text: "Les pièces en état d'être réutilisées sont démontées, contrôlées et proposées comme pièces d'occasion." },
  { title: "Recyclage", text: "La carcasse et les matériaux restants sont orientés vers des filières de broyage et de valorisation." },
  { title: "Certificat de destruction", text: "Le centre VHU le délivre au détenteur : il atteste la prise en charge du véhicule." },
];

/** Présentation adaptée à la situation déclarée dans la configuration. */
function RolesSection() {
  const { situation } = company.vhu;
  if (situation === "own-centre") {
    return (
      <Notice title="Situation à décrire">
        La configuration indique que l&apos;entreprise exploite son propre centre VHU : cette section doit
        être rédigée avec le numéro d&apos;agrément/enregistrement et l&apos;adresse du site.
      </Notice>
    );
  }
  if (situation === "to-define") {
    return (
      <Notice tone="warn" title="Organisation en cours de précision">
        Le centre VHU qui prendra en charge votre véhicule vous est indiqué au moment de la confirmation.
      </Notice>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card p-7">
        <p className="text-sm font-bold uppercase tracking-wider text-brand">Notre rôle</p>
        <h3 className="mt-1 text-xl font-bold">{company.brandName}</h3>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-3">
          <li>recevoir et qualifier votre demande ;</li>
          <li>vous indiquer les documents et les conditions ;</li>
          <li>organiser l&apos;enlèvement et le transport vers le centre partenaire.</li>
        </ul>
      </div>
      <div className="card-dark bg-ink p-7 text-white">
        <p className="text-sm font-bold uppercase tracking-wider text-lime">Son rôle</p>
        <h3 className="mt-1 text-xl font-bold">
          {company.vhu.partner.name ?? "Le centre VHU partenaire"}
        </h3>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-white/75">
          <li>prendre en charge le véhicule hors d&apos;usage ;</li>
          <li>le dépolluer, le démonter et le faire recycler ;</li>
          <li>délivrer le certificat de destruction.</li>
        </ul>
      </div>
    </div>
  );
}

export default function CentreVhuPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Véhicules hors d'usage"
        title={page.h1}
        lead={
          <p>
            Un véhicule hors d&apos;usage est un déchet au sens de la loi : seul un centre VHU peut le
            prendre en charge pour destruction. Voici qui fait quoi, ce que vous devez préparer et ce que
            vous recevez.
          </p>
        }
        actions={
          <ButtonLink href="/enlevement-epave#demande">Demander un enlèvement</ButtonLink>
        }
      />

      <Container className="pt-14">
        <PartnerCentreCard />
      </Container>

      <Section labelledBy="roles-title">
        <Eyebrow>Qui fait quoi</Eyebrow>
        <H2 id="roles-title">Deux rôles distincts, clairement identifiés</H2>
        <div className="mt-8">
          <RolesSection />
        </div>
      </Section>

      <Section tone="mint" labelledBy="statut-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Cadre réglementaire</Eyebrow>
            <H2 id="statut-title">Agrément, enregistrement : de quoi parle-t-on ?</H2>
            <div className="prose-eco mt-4 text-ink-3">
              {centreStatusExplanation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Gratuité</Eyebrow>
            <H2>Remise au centre et collecte</H2>
            <div className="prose-eco mt-4 text-ink-3">
              {freeOfChargeExplanation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          Sources :{" "}
          <a href={sources.ministere.url} className="underline" rel="noopener">
            {sources.ministere.label}
          </a>{" "}
          ;{" "}
          <a href={sources.f1468.url} className="underline" rel="noopener">
            {sources.f1468.label}
          </a>
          .
        </p>
      </Section>

      <Section tone="ink" labelledBy="traitement-title">
        <Eyebrow tone="light">Dans le centre VHU</Eyebrow>
        <H2 id="traitement-title">Ce que devient le véhicule</H2>
        <div className="mt-10">
          <FeatureList items={treatment} numbered tone="dark" columns={4} />
        </div>
        <p className="mt-10 text-white/80">
          Les pièces de réemploi issues de ce démontage peuvent être recherchées via une{" "}
          <Link href={pages.demandePiece.path} className="font-semibold text-brand-bright underline">
            demande de pièce
          </Link>
          .
        </p>
      </Section>

      <Section labelledBy="docs-title">
        <Eyebrow>Documents</Eyebrow>
        <H2 id="docs-title">Ce qu&apos;il faut préparer, ce que vous recevez</H2>
        <div className="mt-8">
          <DocumentsChecklist />
        </div>
        <div className="mt-8">
          <Notice title="Une demande en ligne n'est pas une autorisation de destruction">
            Les documents et les situations particulières (gage, opposition, titulaire absent, véhicule
            étranger) sont examinés avant le rendez-vous. Aucun certificat n&apos;est délivré
            automatiquement et aucune démarche officielle n&apos;est effectuée par ce site.
          </Notice>
        </div>
      </Section>

      <CallBand placement="centre-vhu" />
    </>
  );
}
