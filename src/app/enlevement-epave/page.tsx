import Link from "next/link";
import { company } from "@/config/company";
import { pages } from "@/content/pages";
import { freeOfChargeExplanation, sources } from "@/content/regulatory";
import { resolveFileLimits } from "@/lib/forms/files";
import { buildMetadata } from "@/lib/seo";
import { guideHref } from "@/lib/publication";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Container, Eyebrow, H2, Notice, Section } from "@/components/ui/primitives";
import { Faq } from "@/components/ui/Faq";
import { RequestSteps } from "@/components/sections/RequestSteps";
import { DocumentsChecklist } from "@/components/sections/DocumentsChecklist";
import { PartnerCentreCard } from "@/components/sections/PartnerCentreCard";
import { SectorList } from "@/components/sections/SectorList";
import { CallBand } from "@/components/sections/CallBand";
import { PickupForm } from "@/components/forms/RequestForms";

const page = pages.enlevement;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

const situations = [
  { title: "Véhicule en panne", text: "Moteur cassé, boîte hors service, réparation trop coûteuse par rapport à la valeur du véhicule." },
  { title: "Véhicule accidenté", text: "Après un sinistre, lorsque le véhicule n'est pas cédé à l'assureur. Signalez toute opposition éventuelle." },
  { title: "Véhicule non roulant", text: "Immobilisé depuis longtemps, pneus à plat, freins grippés, batterie morte." },
  { title: "Véhicule sans roues ou incomplet", text: "Possible selon les cas, mais à signaler : le matériel et les conditions ne sont pas les mêmes." },
];

const faq = [
  {
    q: "Combien de temps faut-il pour organiser l'enlèvement ?",
    a: "Cela dépend de la commune, de l'accès et du planning. Aucun délai n'est promis avant l'étude de la demande : il vous est communiqué avec la proposition de rendez-vous.",
  },
  {
    q: "Dois-je être présent ?",
    a: "Une personne doit remettre les clés et les documents et donner accès au véhicule. Si vous ne pouvez pas être présent, indiquez-le : une solution est recherchée avant de fixer la date.",
  },
  {
    q: "Le véhicule n'a plus de carte grise : est-ce possible ?",
    a: "D'autres justificatifs peuvent la remplacer (déclaration de perte, récépissé de vol…). Indiquez la situation dans la demande, elle sera examinée avant tout rendez-vous.",
  },
  {
    q: "Faut-il envoyer une copie de la carte grise avec la demande ?",
    a: "Non. Le formulaire demande seulement si vous l'avez. Les documents sont vérifiés au moment du rendez-vous.",
  },
  {
    q: "Que devient le véhicule ?",
    a: "Il est remis au centre VHU partenaire, qui le dépollue, récupère les pièces réutilisables et oriente le reste vers le recyclage. Le centre délivre le certificat de destruction.",
  },
];

export default function EnlevementPage() {
  const limits = resolveFileLimits();
  const accessGuide = guideHref("enlevement-acces-difficile");
  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Véhicule hors d'usage, en panne ou accidenté"
        title={page.h1}
        lead={
          <p>
            Décrivez le véhicule, son état et son accès en trois étapes. L&apos;équipe vérifie la
            faisabilité et vous annonce les conditions avant de se déplacer : pas de surprise le jour
            de l&apos;enlèvement.
          </p>
        }
        actions={<ButtonLink href="#demande">Commencer ma demande</ButtonLink>}
      />

      <Section labelledBy="situations-title">
        <Eyebrow>Situations prises en charge après étude</Eyebrow>
        <H2 id="situations-title">Quel véhicule pouvons-nous enlever ?</H2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {situations.map((s) => (
            <li key={s.title} className="rounded-2xl bg-surface p-5">
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-ink-3">{s.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Chaque situation est confirmée par l&apos;équipe : un enlèvement n&apos;est jamais garanti avant
          l&apos;étude de la demande.
        </p>
      </Section>

      <section id="demande" aria-labelledby="demande-title" className="scroll-mt-20 bg-surface py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl bg-paper p-5 shadow-sm ring-1 ring-line sm:p-8">
            <H2 id="demande-title" className="!mt-0 mb-6">
              Demande d&apos;enlèvement
            </H2>
            <PickupForm pagePath={page.path} limits={limits} />
          </div>
          <aside className="space-y-5 lg:pt-2">
            <Notice title="Ce que l'équipe confirme avant le rendez-vous">
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>la faisabilité selon l&apos;accès et l&apos;état ;</li>
                <li>les conditions de l&apos;enlèvement (frais éventuels inclus) ;</li>
                <li>les documents à préparer selon votre situation ;</li>
                <li>la date et le créneau.</li>
              </ul>
            </Notice>
            <Notice tone="warn" title="Ce que la demande en ligne n'est pas">
              Ni un rendez-vous confirmé, ni une autorisation de destruction. Rien n&apos;est engagé
              sans votre accord.
            </Notice>
            {accessGuide ? (
              <p className="text-sm text-muted">
                Accès compliqué ?{" "}
                <Link href={accessGuide} className="underline">
                  Comment décrire un sous-sol ou un passage étroit
                </Link>
              </p>
            ) : null}
          </aside>
        </Container>
      </section>

      <Section labelledBy="gratuite-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Gratuité : ce qui est vrai</Eyebrow>
            <H2 id="gratuite-title">L&apos;enlèvement est-il gratuit ?</H2>
            <div className="prose-eco mt-4 text-ink-3">
              {freeOfChargeExplanation.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {company.pickup.freeConditions ? <p className="font-semibold text-ink">{company.pickup.freeConditions}</p> : null}
            </div>
            <p className="mt-4 text-sm text-muted">
              Sources :{" "}
              <a href={sources.f1468.url} className="underline" rel="noopener">
                Service-Public.fr
              </a>
              ,{" "}
              <a href={sources.ministere.url} className="underline" rel="noopener">
                ministère de la Transition écologique
              </a>
              .
            </p>
          </div>
          <div>
            <Eyebrow>Déroulement</Eyebrow>
            <H2>Les étapes</H2>
            <div className="mt-6">
              <RequestSteps
                steps={[
                  { title: "Demande", text: "En ligne ou par téléphone." },
                  { title: "Vérification", text: "Accès, matériel, documents." },
                  { title: "Confirmation", text: "Conditions et date validées avec vous." },
                  { title: "Enlèvement", text: "Remise au centre VHU, certificat de destruction." },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="docs-title">
        <Eyebrow>Documents</Eyebrow>
        <H2 id="docs-title">Les documents à préparer</H2>
        <div className="mt-8">
          <DocumentsChecklist />
        </div>
      </Section>

      <Container className="py-14">
        <PartnerCentreCard />
      </Container>

      <CallBand placement="enlevement-mid" formHref="#demande" />

      <Section labelledBy="zones-title">
        <Eyebrow>Secteurs</Eyebrow>
        <H2 id="zones-title">Où intervenons-nous ?</H2>
        <p className="mt-3 max-w-2xl text-ink-3">
          La zone visée est la région Provence-Alpes-Côte d&apos;Azur. Indiquez votre code postal dans la
          demande : la faisabilité est confirmée commune par commune.
        </p>
        <div className="mt-6">
          <SectorList />
        </div>
      </Section>

      <Section tone="surface" labelledBy="faq-title">
        <H2 id="faq-title">Questions fréquentes sur l&apos;enlèvement</H2>
        <div className="mt-8">
          <Faq items={faq} />
        </div>
        <p className="mt-6 text-ink-3">
          Vous cherchez plutôt à vendre un véhicule qui a encore de la valeur ?{" "}
          <Link href={pages.rachat.path} className="font-semibold text-brand underline">
            Demandez une étude de rachat
          </Link>
          . Vous voulez comprendre le rôle du centre VHU ?{" "}
          <Link href={pages.centreVhu.path} className="font-semibold text-brand underline">
            Voir la prise en charge
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
