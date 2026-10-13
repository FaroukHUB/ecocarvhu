import Link from "next/link";
import { pages } from "@/content/pages";
import { resolveFileLimits } from "@/lib/forms/files";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Container, Eyebrow, H2, Notice, Section } from "@/components/ui/primitives";
import { Faq } from "@/components/ui/Faq";
import { RequestSteps } from "@/components/sections/RequestSteps";
import { BuybackForm } from "@/components/forms/RequestForms";
import { CallBand } from "@/components/sections/CallBand";

const page = pages.rachat;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

const faq = [
  {
    q: "Pouvez-vous me donner un prix en ligne ?",
    a: "Non. Le site ne calcule aucune estimation automatique. L'équipe étudie les caractéristiques et les photos, puis vous indique si une offre est possible.",
  },
  {
    q: "Quelle différence avec un enlèvement d'épave ?",
    a: "L'étude de rachat concerne un véhicule qui garde une valeur (pièces, réparation possible). Si le véhicule est hors d'usage, l'enlèvement vers un centre VHU est plus adapté.",
  },
  {
    q: "Quels documents faudra-t-il ?",
    a: "Pour toute cession : la carte grise au nom du vendeur, un certificat de situation administrative récent et la déclaration de cession. Ils ne sont pas demandés dans le formulaire.",
  },
];

export default function RachatPage() {
  const limits = resolveFileLimits();
  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Étude de rachat"
        title={page.h1}
        lead={
          <p>
            Véhicule en panne, accidenté ou très kilométré : envoyez ses caractéristiques et quelques
            photos. L&apos;équipe étudie la demande et vous répond. Il ne s&apos;agit ni d&apos;une estimation
            automatique ni d&apos;une offre garantie.
          </p>
        }
        actions={<ButtonLink href="#demande">Demander une étude</ButtonLink>}
      />

      <Section labelledBy="etapes-title">
        <Eyebrow>Déroulement</Eyebrow>
        <H2 id="etapes-title">Comment se passe l&apos;étude</H2>
        <div className="mt-8">
          <RequestSteps
            steps={[
              { title: "Description", text: "Caractéristiques, kilométrage, état, photos." },
              { title: "Étude", text: "L'équipe examine la demande et peut vous poser des questions." },
              { title: "Réponse", text: "Proposition, ou orientation vers un enlèvement si le véhicule est hors d'usage." },
              { title: "Cession", text: "Uniquement si vous acceptez, avec les documents de cession." },
            ]}
          />
        </div>
      </Section>

      <section id="demande" aria-labelledby="demande-title" className="scroll-mt-20 bg-sun-soft py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-md border border-ink/10 bg-paper p-5 sm:p-8">
            <H2 id="demande-title" className="!mt-0 mb-6">
              Demande d&apos;étude de rachat
            </H2>
            <BuybackForm pagePath={page.path} limits={limits} />
          </div>
          <aside className="space-y-5">
            <Notice title="Des photos utiles">
              Avant, arrière, les deux côtés, l&apos;intérieur et le compteur. Montrez les dommages de près.
            </Notice>
            <Notice tone="warn" title="Pas d'offre automatique">
              Aucun montant n&apos;est garanti avant l&apos;examen du véhicule.
            </Notice>
            <p className="text-sm text-ink-3">
              Le véhicule est hors d&apos;usage ?{" "}
              <Link href={pages.enlevement.path} className="font-semibold text-brand underline">
                Demandez plutôt un enlèvement
              </Link>
              .
            </p>
          </aside>
        </Container>
      </section>

      <Section tone="mint" labelledBy="faq-title">
        <H2 id="faq-title">Questions fréquentes sur le rachat</H2>
        <div className="mt-8">
          <Faq items={faq} />
        </div>
      </Section>

      <CallBand placement="rachat" formHref="#demande" formLabel="Demander une étude" title="Un véhicule à céder ?" />
    </>
  );
}
