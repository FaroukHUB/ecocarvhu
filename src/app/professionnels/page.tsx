import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Container, Eyebrow, H2, Section } from "@/components/ui/primitives";
import { FeatureList } from "@/components/ui/FeatureList";
import { ProForm } from "@/components/forms/RequestForms";
import { CallBand } from "@/components/sections/CallBand";

const page = pages.pros;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

const offers = [
  {
    title: "Plusieurs références en une demande",
    text: "Listez les pièces ligne par ligne (véhicule, pièce, référence). Les disponibilités sont vérifiées et vous recevez une réponse groupée.",
  },
  {
    title: "Enlèvement de plusieurs véhicules",
    text: "Véhicules abandonnés à l'atelier, épaves de clients, fin de flotte : décrivez le lot pour organiser un passage adapté.",
  },
  {
    title: "Partenariats",
    text: "Garages, carrossiers, dépanneurs : proposez une collaboration. Les modalités sont discutées au cas par cas.",
  },
];

export default function ProfessionnelsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Garages, carrossiers, dépanneurs"
        title={page.h1}
        lead={
          <p>
            Un formulaire unique pour envoyer une liste de références, organiser plusieurs enlèvements ou
            proposer un partenariat. Pas de compte à créer.
          </p>
        }
        actions={<ButtonLink href="#demande">Envoyer une demande</ButtonLink>}
      />

      <Section labelledBy="offres-title">
        <Eyebrow>Ce que vous pouvez demander</Eyebrow>
        <H2 id="offres-title">Des demandes groupées, un seul interlocuteur</H2>
        <div className="mt-10">
          <FeatureList items={offers} columns={3} />
        </div>
      </Section>

      <section id="demande" aria-labelledby="demande-title" className="scroll-mt-20 bg-mint-dots py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div className="rounded-md border border-ink/10 bg-paper p-5 sm:p-8">
            <H2 id="demande-title" className="!mt-0 mb-6">
              Demande professionnelle
            </H2>
            <ProForm pagePath={page.path} />
          </div>
        </Container>
      </section>

      <CallBand placement="pros" formHref="#demande" formLabel="Envoyer une demande" title="Un besoin récurrent ?" text="Appelez pour en parler, ou envoyez votre liste de références en ligne." />
    </>
  );
}
