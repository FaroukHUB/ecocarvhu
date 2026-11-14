import Link from "next/link";
import { pages } from "@/content/pages";
import { departments } from "@/content/sectors/data";
import { sources } from "@/content/regulatory";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Container, Eyebrow, H2, Section } from "@/components/ui/primitives";
import { FeatureList } from "@/components/ui/FeatureList";
import { Faq } from "@/components/ui/Faq";
import { RequestSteps } from "@/components/sections/RequestSteps";
import { PartnerCentreCard } from "@/components/sections/PartnerCentreCard";
import { AlertIcon, BuildingIcon, CheckIcon, CoinsIcon, DocIcon, GearIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";
import { ProForm } from "@/components/forms/RequestForms";
import { CallBand } from "@/components/sections/CallBand";

const page = pages.pros;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

const offers = [
  {
    icon: TruckIcon,
    title: "Enlèvement de plusieurs véhicules",
    text: "Véhicules hors d'usage, épaves de clients, fin de flotte : décrivez le lot dans une seule demande pour qu'un passage adapté soit étudié.",
  },
  {
    icon: CoinsIcon,
    title: "Étude de rachat",
    text: "Un véhicule garde de la valeur pour ses pièces ou une réparation ? Demandez une étude : aucune estimation automatique, une réponse après examen.",
  },
  {
    icon: BuildingIcon,
    title: "Partenariat",
    text: "Vous avez régulièrement des véhicules à faire enlever ? Proposez une collaboration : les modalités sont discutées au cas par cas.",
  },
];

const profiles = [
  {
    icon: GearIcon,
    title: "Garages et ateliers mécaniques",
    text: "Véhicule dont la réparation coûte plus que sa valeur, voiture laissée par un client après un devis refusé : l'enlèvement libère la place à l'atelier.",
  },
  {
    icon: ShieldIcon,
    title: "Carrossiers",
    text: "Véhicules gravement accidentés ou non réparables : précisez l'état de chacun et sa situation administrative, notamment s'il fait l'objet d'un dossier avec un assureur.",
  },
  {
    icon: TruckIcon,
    title: "Dépanneurs et remorqueurs",
    text: "Véhicules déjà remorqués et stockés sur votre parc : indiquez leur nombre et l'accès au site pour organiser une reprise groupée.",
  },
  {
    icon: DocIcon,
    title: "Gestionnaires de flotte et entreprises",
    text: "Utilitaires et véhicules de service en fin de vie : listez-les avec leur titulaire de carte grise, l'entreprise ou un loueur.",
  },
  {
    icon: CoinsIcon,
    title: "Négociants et concessions",
    text: "Reprises invendables ou véhicules hors d'usage récupérés lors d'une vente : enlèvement ou étude de rachat selon leur état.",
  },
  {
    icon: AlertIcon,
    title: "Autres professionnels",
    text: "Artisans, exploitations, sociétés de services : tout professionnel détenteur d'un véhicule hors d'usage immatriculé peut faire une demande.",
  },
];

const rules = [
  {
    title: "Le titulaire de la carte grise cède le véhicule",
    text: "C'est lui, ou une personne qu'il mandate, qui signe la cession. Pour un véhicule au nom d'un client, son accord et ses documents sont nécessaires.",
  },
  {
    title: "Véhicule en location longue durée : l'accord du loueur",
    text: "Le loueur est en général le titulaire de la carte grise. Un véhicule loué ne peut pas être cédé sans lui.",
  },
  {
    title: "Véhicule abandonné par un client",
    text: "Un véhicule laissé à l'atelier ne devient pas automatiquement la propriété du garage : une procédure particulière s'applique. Signalez-le, la situation est examinée avant tout enlèvement.",
  },
  {
    title: "Remise à un centre VHU agréé",
    text: "Un véhicule hors d'usage doit être remis à un centre VHU agréé, qui le dépollue et délivre le certificat de destruction.",
  },
];

const steps = [
  { title: "Vous décrivez le lot", text: "Nombre de véhicules, état, accès au site, situation administrative." },
  { title: "L'équipe étudie", text: "Faisabilité, matériel, documents à prévoir pour chaque véhicule." },
  { title: "Conditions confirmées", text: "Gratuité pour les véhicules complets et accessibles, conditions annoncées pour les autres." },
  { title: "Enlèvement et suivi", text: "Remise au centre VHU partenaire, qui délivre les certificats de destruction." },
];

const faq = [
  {
    q: "L'enlèvement est-il gratuit pour un professionnel ?",
    a: "Oui, dans les mêmes conditions que pour un particulier : véhicule complet (moteur, pot catalytique, batterie) et accessible normalement. Pour un véhicule incomplet ou difficile d'accès, les conditions sont étudiées et annoncées avant le rendez-vous.",
  },
  {
    q: "Pouvez-vous enlever plusieurs véhicules lors d'un même passage ?",
    a: "Décrivez-les dans une seule demande, avec leur état et l'accès au site : un passage groupé est étudié. Le nombre de véhicules par passage dépend du matériel et de l'accès, il vous est confirmé avant le rendez-vous.",
  },
  {
    q: "Quels documents fournir pour un véhicule d'entreprise ?",
    a: "Les mêmes que pour un particulier : carte grise barrée et signée par le titulaire, déclaration de cession, certificat de situation administrative récent, et un justificatif permettant d'identifier le signataire pour l'entreprise.",
    link: { href: `${pages.centreVhu.path}#docs-title`, label: "Voir les documents à préparer" },
  },
  {
    q: "Un client a abandonné son véhicule à l'atelier : pouvez-vous l'enlever ?",
    a: "Pas sans les documents du titulaire. Un véhicule abandonné chez un professionnel suit une procédure particulière avant de pouvoir être cédé. Signalez la situation dans votre demande : elle est examinée avant tout déplacement.",
  },
  {
    q: "Recevons-nous un justificatif de destruction ?",
    a: "Oui : le centre VHU agréé qui prend en charge chaque véhicule délivre un certificat de destruction, à conserver.",
  },
  {
    q: "Proposez-vous des pièces d'occasion aux professionnels ?",
    a: "Le service de pièces auto d'occasion est en cours de préparation. Les demandes de pièces seront ouvertes dès qu'il sera prêt.",
    link: { href: pages.pieces.path, label: "Pièces auto d'occasion" },
  },
];

export default function ProfessionnelsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Garages, carrossiers, dépanneurs, flottes"
        title={page.h1}
        lead={
          <p>
            Épaves de clients, véhicules accidentés, fin de flotte : un formulaire unique pour faire enlever un ou
            plusieurs véhicules hors d&apos;usage en Provence-Alpes-Côte d&apos;Azur, demander une étude de rachat ou
            proposer un partenariat. L&apos;enlèvement est gratuit pour tout véhicule complet et accessible.
          </p>
        }
        actions={<ButtonLink href="#demande">Envoyer une demande</ButtonLink>}
      />

      <Section labelledBy="offres-title">
        <Eyebrow>Ce que vous pouvez nous confier</Eyebrow>
        <H2 id="offres-title">Enlèvement d&apos;épaves et rachat de véhicules pour les professionnels</H2>
        <p className="mt-5 max-w-3xl text-lg text-ink-3">
          Un seul interlocuteur pour vos véhicules hors d&apos;usage : la demande est étudiée, les conditions et la
          date vous sont confirmées avant tout déplacement, et chaque véhicule est remis à un centre VHU agréé
          partenaire.
        </p>
        <div className="mt-10">
          <FeatureList items={offers} columns={3} />
        </div>
      </Section>

      <Section tone="surface" labelledBy="profils-title">
        <Eyebrow>Pour qui</Eyebrow>
        <H2 id="profils-title">Un épaviste pour les garages, carrossiers et dépanneurs de PACA</H2>
        <div className="mt-10">
          <FeatureList items={profiles} columns={3} />
        </div>
      </Section>

      <Section tone="ink" labelledBy="etapes-title">
        <Eyebrow tone="light">Déroulement</Eyebrow>
        <H2 id="etapes-title">Une demande professionnelle en 4 étapes</H2>
        <div className="mt-10">
          <RequestSteps steps={steps} tone="dark" />
        </div>
      </Section>

      <Section labelledBy="regles-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal">
            <Eyebrow>Cadre réglementaire</Eyebrow>
            <H2 id="regles-title">Ce qu&apos;il faut savoir avant de céder un véhicule hors d&apos;usage</H2>
            <p className="mt-5 text-ink-3">
              Les règles de cession et de destruction s&apos;appliquent aux professionnels comme aux particuliers.
              Les connaître évite un déplacement pour rien.
            </p>
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
          <ul className="grid gap-3">
            {rules.map((r) => (
              <li key={r.title} className="reveal card flex gap-4 p-6">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="block font-semibold">{r.title}</span>
                  <span className="mt-1 block text-[0.95rem] text-ink-3">{r.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal mt-12">
          <PartnerCentreCard />
        </div>
      </Section>

      <Section tone="surface" labelledBy="zone-pro-title">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="reveal">
            <Eyebrow>Zone d&apos;intervention</Eyebrow>
            <H2 id="zone-pro-title">Les six départements de Provence-Alpes-Côte d&apos;Azur</H2>
            <p className="mt-5 text-ink-3">
              Les demandes professionnelles sont étudiées dans toute la région. La faisabilité et l&apos;organisation
              sont confirmées pour chaque site, selon la commune, l&apos;accès et le nombre de véhicules.
            </p>
            <p className="mt-5">
              <Link href={pages.zones.path} className="font-semibold text-brand underline underline-offset-4">
                Voir la carte et toutes les villes
              </Link>
            </p>
          </div>
          <ul className="reveal grid grid-cols-2 gap-2 sm:grid-cols-3">
            {departments.map((d) => (
              <li key={d.code} className="card flex items-center gap-3 p-4">
                <span className="flex h-8 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-xs font-bold text-lime">
                  {d.code}
                </span>
                <span className="text-sm font-semibold leading-tight">{d.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section id="demande" aria-labelledby="demande-title" className="scroll-mt-20 py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-line bg-paper p-5 shadow-[0_30px_60px_-40px_rgb(11_19_16/0.35)] sm:p-9">
            <H2 id="demande-title" className="!mt-0 mb-6">
              Demande professionnelle
            </H2>
            <ProForm pagePath={page.path} />
          </div>
          <aside className="space-y-4 lg:pt-2">
            <div className="card-dark bg-ink p-6 text-white">
              <p className="font-semibold">Pour une réponse plus rapide</p>
              <ul className="mt-3 space-y-2 text-[0.95rem] text-white/75">
                {[
                  "une ligne par véhicule : modèle, année, état ;",
                  "clés et carte grise présentes ou non ;",
                  "titulaire de la carte grise (vous, un client, un loueur) ;",
                  "accès au site et horaires d'ouverture.",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <Section tone="surface" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <H2 id="faq-title">Professionnels : vos questions sur l&apos;enlèvement d&apos;épaves</H2>
          </div>
          <div className="reveal">
            <Faq items={faq} />
          </div>
        </div>
      </Section>

      <CallBand
        placement="pros"
        formHref="#demande"
        formLabel="Envoyer une demande"
        title="Des véhicules hors d'usage à faire enlever ?"
        text="Appelez pour en parler, ou décrivez vos véhicules en ligne : la demande est étudiée avant tout déplacement."
      />
    </>
  );
}
