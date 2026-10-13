import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Container, Eyebrow, H2, Section } from "@/components/ui/primitives";
import { BuildingIcon, GearIcon, TruckIcon } from "@/components/ui/icons";
import { ProForm } from "@/components/forms/RequestForms";
import { CallBand } from "@/components/sections/CallBand";

const page = pages.pros;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

const offers = [
  {
    icon: GearIcon,
    title: "Plusieurs références en une demande",
    text: "Listez les pièces ligne par ligne (véhicule, pièce, référence). Les disponibilités sont vérifiées et vous recevez une réponse groupée.",
  },
  {
    icon: TruckIcon,
    title: "Enlèvement de plusieurs véhicules",
    text: "Véhicules abandonnés à l'atelier, épaves de clients, fin de flotte : décrivez le lot pour organiser un passage adapté.",
  },
  {
    icon: BuildingIcon,
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
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {offers.map((o) => (
            <li key={o.title} className="rounded-2xl bg-surface p-6">
              <o.icon className="h-8 w-8 text-brand" />
              <h3 className="mt-3 text-lg font-bold">{o.title}</h3>
              <p className="mt-1.5 text-ink-3">{o.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section id="demande" aria-labelledby="demande-title" className="scroll-mt-20 bg-surface py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div className="rounded-2xl bg-paper p-5 shadow-sm ring-1 ring-line sm:p-8">
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
