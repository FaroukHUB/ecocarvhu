import Link from "next/link";
import { company } from "@/config/company";
import { pages } from "@/content/pages";
import { homeFaq, partFamilies } from "@/content/home";
import { buildMetadata } from "@/lib/seo";
import { PhoneBig } from "@/components/ui/PhoneBig";
import { ButtonLink, Container, Eyebrow, H2, Section } from "@/components/ui/primitives";
import { CoinsIcon, GearIcon, TruckIcon, CheckIcon } from "@/components/ui/icons";
import { Faq } from "@/components/ui/Faq";
import { HeroIllustration } from "@/components/sections/HeroIllustration";
import { RequestSteps } from "@/components/sections/RequestSteps";
import { VehicleCheck } from "@/components/sections/VehicleCheck";
import { PartnerCentreCard } from "@/components/sections/PartnerCentreCard";
import { SectorList } from "@/components/sections/SectorList";
import { CallBand } from "@/components/sections/CallBand";

const page = pages.home;

export const metadata = buildMetadata({
  path: page.path,
  title: page.title,
  description: page.description,
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      {/* 1-4. Accroche, deux entrées dominantes, entrée secondaire, téléphone */}
      <section className="relative overflow-hidden bg-surface">
        <Container className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.15fr_1fr] lg:py-20">
          <div>
            <Eyebrow>Provence-Alpes-Côte d&apos;Azur</Eyebrow>
            <h1 className="mt-3 text-[2.15rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3rem]">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-3">
              Véhicule en panne, accidenté ou hors d&apos;usage, pièce introuvable : dites-nous ce dont
              vous avez besoin. Nous vérifions la faisabilité et vous confirmons les conditions{" "}
              <strong className="text-ink">avant</strong> tout déplacement.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href="/enlevement-epave#demande"
                className="group flex min-h-20 items-center gap-4 rounded-2xl bg-brand px-5 py-4 text-white shadow-[0_6px_0_var(--color-brand-deep)] transition hover:bg-brand-dark active:translate-y-1 active:shadow-[0_2px_0_var(--color-brand-deep)]"
              >
                <TruckIcon className="h-9 w-9 shrink-0" />
                <span>
                  <span className="block text-lg font-extrabold leading-tight">Demander un enlèvement</span>
                  <span className="text-sm text-white">Épave, panne, accident</span>
                </span>
              </Link>
              <Link
                href={pages.demandePiece.path}
                className="group flex min-h-20 items-center gap-4 rounded-2xl bg-ink px-5 py-4 text-white shadow-[0_6px_0_#000] transition hover:bg-ink-2 active:translate-y-1 active:shadow-[0_2px_0_#000]"
              >
                <GearIcon className="h-9 w-9 shrink-0 text-brand-bright" />
                <span>
                  <span className="block text-lg font-extrabold leading-tight">Trouver une pièce</span>
                  <span className="text-sm text-white/80">Même sans connaître son nom</span>
                </span>
              </Link>
            </div>
            <p className="mt-4">
              <Link href={pages.rachat.path} className="inline-flex items-center gap-2 font-semibold text-brand underline underline-offset-4 hover:text-brand-dark">
                <CoinsIcon className="h-5 w-5" />
                Faire étudier le rachat de mon véhicule
              </Link>
            </p>

            <div className="mt-8 inline-block rounded-2xl bg-ink px-6 py-5">
              <PhoneBig placement="hero" size="lg" caption="Appel direct" />
            </div>
          </div>
          <div className="hidden sm:block">
            <HeroIllustration className="rounded-[28px] shadow-2xl" />
          </div>
        </Container>
      </section>

      {/* Encart partenariat centre VHU */}
      <Container className="-mt-2 pt-12 sm:pt-16">
        <PartnerCentreCard />
      </Container>

      {/* 5. Étapes */}
      <Section labelledBy="etapes-title">
        <Eyebrow>Comment ça marche</Eyebrow>
        <H2 id="etapes-title">Une demande claire, des conditions confirmées avant le rendez-vous</H2>
        <p className="mt-3 max-w-2xl text-ink-3">
          Rien n&apos;est engagé tant que vous n&apos;avez pas validé les conditions proposées.
        </p>
        <div className="mt-8">
          <RequestSteps />
        </div>
      </Section>

      {/* 6. Module état et accès */}
      <Section tone="surface" labelledBy="check-title">
        <Eyebrow>Avant le déplacement</Eyebrow>
        <H2 id="check-title">Vérifiez l&apos;état et l&apos;accès de votre véhicule</H2>
        <p className="mt-3 max-w-2xl text-ink-3">
          Cinq questions pour savoir ce qu&apos;il faut signaler. Vos réponses sont reprises dans le
          formulaire d&apos;enlèvement ; rien n&apos;est envoyé tant que vous ne validez pas la demande.
        </p>
        <div className="mt-8">
          <VehicleCheck />
        </div>
      </Section>

      <CallBand placement="home-mid" />

      {/* 7. Familles de pièces */}
      <Section labelledBy="pieces-title">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Pièces auto d&apos;occasion</Eyebrow>
            <H2 id="pieces-title">Les familles de pièces recherchées</H2>
            <p className="mt-3 max-w-2xl text-ink-3">
              La disponibilité dépend des véhicules pris en charge : chaque demande est vérifiée, avec
              la compatibilité, avant toute proposition.
            </p>
          </div>
          <ButtonLink href={pages.demandePiece.path} variant="secondary">
            Demander une pièce
          </ButtonLink>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partFamilies.map((f) => (
            <li key={f.title} className="rounded-2xl bg-surface p-5">
              <p className="flex items-center gap-2 text-lg font-bold">
                <CheckIcon className="h-5 w-5 text-brand" />
                {f.title}
              </p>
              <p className="mt-1.5 text-[0.95rem] text-ink-3">{f.items}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href={pages.pieces.path} className="font-semibold text-brand underline underline-offset-4">
            Comment se passe une demande de pièce
          </Link>
        </p>
      </Section>

      {/* 8. Preuves vérifiées : bloc masqué tant qu'aucune preuve réelle n'est renseignée */}
      {company.proofs.length ? (
        <Section tone="surface" labelledBy="preuves-title">
          <H2 id="preuves-title">Ce que nous pouvons montrer</H2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {company.proofs.map((p) => (
              <li key={p.label} className="rounded-2xl bg-paper p-5 ring-1 ring-line">
                <p className="font-bold">{p.label}</p>
                <p className="mt-1 text-ink-3">{p.detail}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 9. Secteurs */}
      <Section tone="ink" labelledBy="zones-title">
        <Eyebrow tone="light">Zones d&apos;intervention</Eyebrow>
        <H2 id="zones-title">Provence-Alpes-Côte d&apos;Azur, commune par commune</H2>
        <p className="mt-3 max-w-2xl text-white/80">
          La zone visée couvre les six départements de la région. Chaque demande est confirmée selon la
          commune et l&apos;accès : nous préférons une réponse exacte à une promesse générale.
        </p>
        <div className="mt-8">
          <SectorList tone="dark" />
        </div>
        <p className="mt-6">
          <Link href={pages.zones.path} className="font-semibold text-brand-bright underline underline-offset-4">
            Voir les zones d&apos;intervention
          </Link>
        </p>
      </Section>

      {/* 10. FAQ + dernier accès */}
      <Section labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>Questions fréquentes</Eyebrow>
            <H2 id="faq-title">Ce que l&apos;on nous demande avant de se lancer</H2>
            <div className="mt-6 space-y-3">
              <ButtonLink href="/enlevement-epave#demande">Demander un enlèvement</ButtonLink>
              <div>
                <ButtonLink href={pages.demandePiece.path} variant="ghost">
                  Trouver une pièce
                </ButtonLink>
              </div>
            </div>
          </div>
          <Faq items={homeFaq} />
        </div>
      </Section>

      <CallBand placement="home-bottom" title="Le plus simple reste de nous appeler" />
    </>
  );
}
