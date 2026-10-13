import Link from "next/link";
import { company } from "@/config/company";
import { heroImages } from "@/config/media";
import { pages } from "@/content/pages";
import { sources } from "@/content/regulatory";
import {
  buybackInfo,
  freeConditions,
  homeFaq,
  partChecklist,
  partFamilies,
  proUses,
  roles,
  situations,
  steps,
  toVerify,
} from "@/content/home";
import { buildMetadata } from "@/lib/seo";
import { guideHref } from "@/lib/publication";
import { PhoneBig } from "@/components/ui/PhoneBig";
import { ButtonLink, Container, Eyebrow, H2, Section } from "@/components/ui/primitives";
import {
  AlertIcon,
  BuildingIcon,
  CheckIcon,
  CoinsIcon,
  DocIcon,
  GearIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/ui/icons";
import { FeatureList } from "@/components/ui/FeatureList";
import { Faq } from "@/components/ui/Faq";
import { Photo, hasPhotoBlock } from "@/components/ui/Photo";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { VehicleCheck } from "@/components/sections/VehicleCheck";
import { PartnerCentreCard } from "@/components/sections/PartnerCentreCard";
import { SectorList } from "@/components/sections/SectorList";
import { CallBand } from "@/components/sections/CallBand";
import { RequestSteps } from "@/components/sections/RequestSteps";
import { ZoneMap } from "@/components/sections/ZoneMap";
import { Marquee } from "@/components/sections/Marquee";

const page = pages.home;

export const metadata = buildMetadata({
  path: page.path,
  title: page.title,
  description: page.description,
  absoluteTitle: true,
});

export default function HomePage() {
  const hasHeroImage = Boolean(heroImages());
  const accessGuide = guideHref("enlevement-acces-difficile");
  const docsGuide = guideHref("documents-remise-vehicule");
  const refGuide = guideHref("identifier-reference-piece");

  return (
    <>
      {/* A. Hero : image plein cadre (paysage sur ordinateur, portrait sur mobile), voile, texte par-dessus */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {hasHeroImage ? (
          <>
            <HeroBackground />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/5 portrait:bg-gradient-to-b portrait:from-ink/85 portrait:via-ink/45 portrait:to-ink/0"
            />
          </>
        ) : (
          <div aria-hidden="true" className="bg-ink-grid absolute inset-0 -z-20" />
        )}

        <Container className="flex min-h-[calc(100svh-7rem)] flex-col justify-start pb-10 pt-8 md:min-h-[620px] md:justify-center md:py-20 lg:min-h-[700px]">
          <div className="max-w-2xl [text-shadow:0_2px_16px_rgb(0_0_0/0.35)]">
            <div className="hidden [text-shadow:none] sm:block">
              <Eyebrow tone="light">Épaviste · Pièces auto d&apos;occasion · PACA</Eyebrow>
            </div>
            <h1 className="text-[2.3rem] font-bold leading-[1.02] tracking-[-0.04em] sm:mt-5 sm:text-6xl lg:text-[4.2rem]">
              Enlèvement d&apos;épave <span className="text-glow [text-shadow:none]">gratuit</span>
              <span className="mt-2 block text-[0.5em] font-semibold leading-tight tracking-[-0.02em] text-white/90">
                en Provence-Alpes-Côte d&apos;Azur
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Véhicule complet et accessible : nous l&apos;enlevons <strong className="text-white">gratuitement</strong>{" "}
              et le remettons à un centre VHU partenaire. Conditions confirmées avant le déplacement.
            </p>

            <div className="mt-7 grid gap-3 [text-shadow:none] sm:flex sm:flex-wrap">
              <Link href="/enlevement-epave#demande" className="btn btn-lime min-h-14 px-6 text-lg">
                <TruckIcon className="h-6 w-6" />
                Demander un enlèvement
              </Link>
              <Link href={pages.demandePiece.path} className="btn btn-glass hidden min-h-14 px-6 text-lg sm:inline-flex">
                <GearIcon className="h-6 w-6" />
                Trouver une pièce
              </Link>
              <Link href={pages.rachat.path} className="btn btn-glass min-h-12 sm:hidden">
                <CoinsIcon className="h-5 w-5 text-lime" />
                Faire étudier le rachat de mon véhicule
              </Link>
            </div>

            <div className="mt-7 hidden items-center gap-6 [text-shadow:none] sm:flex">
              <PhoneBig placement="hero" size="lg" caption="Appel direct" />
              <Link
                href={pages.rachat.path}
                className="inline-flex items-center gap-2 font-semibold text-white/90 underline-offset-4 hover:text-white hover:underline"
              >
                <CoinsIcon className="h-5 w-5 text-lime" />
                Faire étudier le rachat de mon véhicule
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Marquee
        items={[
          "Enlèvement gratuit",
          "Véhicule complet et accessible",
          "Centre VHU partenaire",
          "Certificat de destruction",
          "Toute la région PACA",
          "Pièces d'occasion vérifiées",
        ]}
      />

      {/* B + E. Rôle d'EcocarVHU et déroulement */}
      <Section labelledBy="role-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <Eyebrow>Qui fait quoi</Eyebrow>
            <H2 id="role-title">Un interlocuteur pour préparer la prise en charge de votre véhicule</H2>
            <p className="mt-5 text-lg leading-relaxed text-ink-3">
              Faire enlever une épave soulève toujours les mêmes questions : est-ce faisable chez moi, est-ce
              gratuit, quels papiers, et qui détruit le véhicule ? EcocarVHU y répond{" "}
              <strong className="text-ink">avant</strong> le déplacement, puis organise l&apos;enlèvement. La
              destruction elle-même relève du centre VHU partenaire.
            </p>
            <p className="mt-4 text-ink-3">
              Vous savez à chaque étape ce qui se passe ensuite : l&apos;équipe vous rappelle, vous confirme
              les conditions et le rendez-vous, et vous indique les documents à remettre.{" "}
              <Link href={pages.centreVhu.path} className="font-semibold text-brand underline underline-offset-4">
                Comprendre le rôle du centre VHU
              </Link>
            </p>
          </div>
          <div className="reveal-zoom relative">
            <Photo slot="enlevement" />
            <div className="float absolute -bottom-6 left-4 hidden items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-[0_20px_40px_-20px_rgb(11_19_16/0.45)] backdrop-blur sm:flex">
              <span className="icon-tile draw h-10 w-10">
                <ShieldIcon className="h-5 w-5" />
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-semibold">Centre VHU partenaire</span>
                <span className="text-muted">Certificat de destruction</span>
              </span>
            </div>
          </div>
        </div>

        <ul className="mt-16 grid gap-4 md:grid-cols-2">
          {roles.map((r, i) => {
            const Icon = i === 0 ? PhoneIcon : ShieldIcon;
            return (
              <li key={r.who} className={`reveal ${i === 0 ? "card" : "card-dark bg-ink text-white"} p-7`}>
                <span className="icon-tile draw">
                  <Icon className="h-6 w-6" />
                </span>
                <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.16em] ${i === 0 ? "text-brand" : "text-lime"}`}>
                  {r.who}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{r.title}</h3>
                <ul className={`mt-4 space-y-2.5 text-[0.95rem] ${i === 0 ? "text-ink-3" : "text-white/75"}`}>
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <CheckIcon className={`mt-0.5 h-4 w-4 shrink-0 ${i === 0 ? "text-brand" : "text-lime"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="mt-24">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Votre enlèvement d&apos;épave en 4 étapes</h3>
            <ButtonLink href="/enlevement-epave#demande" variant="secondary">
              Commencer ma demande
            </ButtonLink>
          </div>
          <div className="mt-8">
            <RequestSteps steps={steps} />
          </div>
          <p className="mt-6 text-sm text-muted">
            La demande en ligne n&apos;est ni un rendez-vous confirmé ni une autorisation de destruction.
            {docsGuide ? (
              <>
                {" "}
                <Link href={docsGuide} className="font-semibold text-brand underline">
                  Préparer les documents de remise
                </Link>
              </>
            ) : null}
          </p>
        </div>
      </Section>

      {/* C. Situations de véhicules */}
      <Section tone="surface" labelledBy="situations-title">
        <div className={hasPhotoBlock("acces") ? "grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]" : ""}>
          <div className="reveal">
            <Eyebrow>Véhicules hors d&apos;usage</Eyebrow>
            <H2 id="situations-title">Quels véhicules faire enlever, et quoi nous indiquer</H2>
            <p className="mt-5 max-w-3xl text-lg text-ink-3">
              Chaque situation demande des informations différentes. Plus la description est précise, plus la
              réponse est fiable. Une photo de l&apos;accès est souvent aussi utile qu&apos;une photo du
              véhicule : elle montre si un camion plateau peut approcher.
            </p>
          </div>
          <Photo slot="acces" className="reveal-zoom" />
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {situations.map((s, i) => {
            const Icon = [GearIcon, AlertIcon, TruckIcon, MapPinIcon][i] ?? CheckIcon;
            return (
              <li key={s.title} className="reveal card p-7">
                <div className="flex items-start gap-4">
                  <span className="icon-tile draw">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] text-ink-3">{s.text}</p>
                  </div>
                </div>
                <dl className="mt-5 grid gap-3 text-[0.92rem] sm:grid-cols-2">
                  <div className="rounded-xl bg-surface p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">À indiquer</dt>
                    <dd className="mt-1 text-ink-2">{s.provide}</dd>
                  </div>
                  <div className="rounded-xl bg-brand-soft p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-brand">Ce que l&apos;équipe vérifie</dt>
                    <dd className="mt-1 text-ink-2">{s.check}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>

        <div className="mt-16">
          <h3 className="reveal text-xl font-bold tracking-tight sm:text-2xl">Cas à vérifier avant tout rendez-vous</h3>
          <div className="mt-6">
            <FeatureList
              items={toVerify.map((t, i) => ({ ...t, icon: [AlertIcon, TruckIcon, DocIcon][i] }))}
              columns={3}
              headingLevel={4}
            />
          </div>
          {accessGuide ? (
            <p className="mt-6 text-sm">
              <Link href={accessGuide} className="font-semibold text-brand underline underline-offset-4">
                Comment décrire un sous-sol ou un accès difficile
              </Link>
            </p>
          ) : null}
        </div>
      </Section>

      {/* D. Gratuité et conditions */}
      <Section tone="brand" labelledBy="gratuite-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal">
            <Eyebrow tone="light">Gratuité</Eyebrow>
            <H2 id="gratuite-title">
              Enlèvement d&apos;épave <span className="text-glow">gratuit</span> : à quelles conditions ?
            </H2>
            <p className="mt-5 text-lg text-white/80">
              L&apos;enlèvement est <strong className="text-white">gratuit</strong> lorsque les quatre conditions
              ci-contre sont réunies. Si l&apos;une d&apos;elles ne l&apos;est pas, la demande est étudiée et les
              conditions vous sont annoncées avant le rendez-vous : vous restez libre de ne pas donner suite.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-[0.95rem] leading-relaxed text-white/75 backdrop-blur">
              <p className="font-semibold text-white">Remise au centre et collecte : deux choses différentes</p>
              <p className="mt-2">
                La remise d&apos;un véhicule complet à un centre VHU est gratuite pour son détenteur. Depuis
                2024, la filière des constructeurs organise aussi une collecte sans frais des véhicules
                complets selon ses propres conditions. Notre enlèvement, lui, suit les conditions décrites ici.
              </p>
              <p className="mt-2 text-sm">
                Sources :{" "}
                <a href={sources.f1468.url} className="underline" rel="noopener">
                  Service-Public.fr
                </a>
                ,{" "}
                <a href={sources.ministere.url} className="underline" rel="noopener">
                  ministère de la Transition écologique
                </a>
              </p>
            </div>
          </div>
          <FeatureList items={freeConditions} numbered tone="dark" />
        </div>
      </Section>

      {/* E (suite). Questionnaire */}
      <Section tone="surface" labelledBy="check-title">
        <div className="reveal">
          <Eyebrow>Avant le déplacement</Eyebrow>
          <H2 id="check-title">Préparez votre demande en 5 questions</H2>
          <p className="mt-5 max-w-2xl text-lg text-ink-3">
            Répondez en un clic : vos réponses s&apos;affichent dans l&apos;encadré <strong>« Vos réponses »</strong>{" "}
            et sont reprises automatiquement dans le formulaire d&apos;enlèvement. Rien n&apos;est envoyé tant que
            vous ne validez pas la demande. Ce n&apos;est ni un accord ni un devis.
          </p>
        </div>
        <div className="mt-10">
          <VehicleCheck />
        </div>
      </Section>

      {/* F. Pièces auto d'occasion */}
      <Section labelledBy="pieces-title">
        <div className={hasPhotoBlock("pieces") ? "grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]" : ""}>
          <Photo slot="pieces" className="reveal-zoom lg:order-first" />
          <div className="reveal order-first lg:order-none">
            <Eyebrow>Pièces de réemploi</Eyebrow>
            <H2 id="pieces-title">Pièces auto d&apos;occasion : la bonne pièce, vérifiée avant toute proposition</H2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-3">
              Une pièce d&apos;occasion n&apos;est utile que si elle correspond exactement à votre véhicule. La
              même marque et le même modèle ne suffisent pas : l&apos;année, la motorisation, la finition et
              les options changent souvent la pièce. Chaque demande est donc vérifiée (disponibilité,
              compatibilité, état) avant de vous proposer quoi que ce soit.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <FeatureList items={partFamilies} columns={3} />
        </div>
        <div className="reveal bg-ink-grid mt-8 grid gap-8 overflow-hidden rounded-3xl p-7 text-white sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              Préparer une <span className="text-lime">demande de pièce</span>
            </h3>
            <ul className="mt-5 space-y-3">
              {partChecklist.map((c) => (
                <li key={c} className="flex gap-3 text-white/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <ButtonLink href={pages.demandePiece.path}>Faire une demande de pièce</ButtonLink>
            <p className="text-sm text-white/60">
              Ces familles décrivent les recherches possibles, pas un stock en ligne : la disponibilité est
              confirmée au cas par cas.{" "}
              <Link href={pages.pieces.path} className="font-semibold text-lime underline">
                En savoir plus sur les pièces d&apos;occasion
              </Link>
              {refGuide ? (
                <>
                  {" · "}
                  <Link href={refGuide} className="font-semibold text-lime underline">
                    Trouver la référence d&apos;une pièce
                  </Link>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </Section>

      {/* G + H. Rachat et professionnels */}
      <Section tone="surface">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="reveal card flex flex-col overflow-hidden p-0">
            <Photo slot="rachat" flush />
            <div className="flex flex-1 flex-col p-7 sm:p-9">
              <span className="icon-tile draw">
                <CoinsIcon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-[1.7rem] font-bold leading-tight tracking-tight sm:text-3xl">
                Rachat de véhicule : demander une étude
              </h2>
              <p className="mt-4 text-ink-3">
                Votre véhicule est en panne, accidenté ou très kilométré mais garde de la valeur, pour ses pièces
                ou pour une réparation ? Décrivez-le : l&apos;équipe étudie la demande et vous indique si une
                offre est possible. Le site ne calcule aucun prix automatiquement.
              </p>
              <p className="mt-5 font-semibold">Les informations utiles :</p>
              <ul className="mt-2 space-y-1.5 text-[0.95rem] text-ink-3">
                {buybackInfo.map((b) => (
                  <li key={b} className="flex gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-surface p-4 text-sm text-ink-3">
                Une première réponse reste indicative : une offre définitive suppose de vérifier le véhicule. Tous
                les véhicules ne font pas l&apos;objet d&apos;une offre ; s&apos;il est hors d&apos;usage,
                l&apos;enlèvement vers le centre VHU vous est alors proposé.
              </p>
              <div className="mt-auto pt-7">
                <ButtonLink href={pages.rachat.path} variant="secondary">
                  Demander une étude de rachat
                </ButtonLink>
              </div>
            </div>
          </article>

          <article className="reveal card-dark bg-ink-grid flex flex-col p-7 text-white sm:p-9">
            <span className="icon-tile draw">
              <BuildingIcon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-[1.7rem] font-bold leading-tight tracking-tight sm:text-3xl">
              Garages, carrossiers, dépanneurs : vos demandes groupées
            </h2>
            <p className="mt-4 text-white/75">
              Un formulaire dédié aux professionnels, sans compte à créer. Les modalités (quantités, retrait,
              fréquence) sont discutées au cas par cas.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {proUses.map((u) => (
                <li key={u.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-lime/40">
                  <h3 className="font-semibold text-lime">{u.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{u.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-7">
              <ButtonLink href={pages.pros.path}>Faire une demande professionnelle</ButtonLink>
            </div>
          </article>
        </div>
      </Section>

      {/* I. Présentation régionale */}
      <Section tone="ink" labelledBy="zones-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="reveal">
            <Eyebrow tone="light">Zones d&apos;intervention</Eyebrow>
            <H2 id="zones-title">Épaviste en Provence-Alpes-Côte d&apos;Azur : vérifiez votre commune</H2>
            <p className="mt-5 text-white/75">
              La zone visée couvre les six départements de la région, des villes du littoral aux communes de
              l&apos;arrière-pays. Les accès et les distances y sont très différents : plutôt qu&apos;une
              promesse générale, chaque commune est vérifiée à partir de votre code postal.
            </p>
            <ol className="mt-7 space-y-3">
              {[
                "Indiquez votre code postal dans la demande ou au téléphone.",
                "L'équipe vous confirme si l'enlèvement est possible dans votre commune, et à quelles conditions.",
                "Il s'agit de zones desservies, pas d'agences : aucune adresse locale n'est annoncée.",
              ].map((t, i) => (
                <li key={t} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/85">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-ink">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="reveal-zoom rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <ZoneMap className="h-auto w-full" />
          </div>
        </div>
        <div className="reveal mt-12">
          <SectorList tone="dark" />
          <p className="mt-6">
            <Link href={pages.zones.path} className="font-semibold text-lime underline underline-offset-4">
              Toutes les zones d&apos;intervention
            </Link>
          </p>
        </div>
      </Section>

      {/* J. Confiance : uniquement des éléments vérifiables */}
      <Section labelledBy="confiance-title">
        <div className="reveal">
          <Eyebrow>Ce que vous pouvez vérifier</Eyebrow>
          <H2 id="confiance-title">Des engagements que vous pouvez contrôler</H2>
        </div>
        <div className="mt-10">
          <FeatureList
            columns={4}
            items={[
              ...(company.phone
                ? [
                    {
                      icon: PhoneIcon,
                      title: "Un numéro direct",
                      text: `Le ${company.phone.value} pour poser vos questions avant toute demande.`,
                    },
                  ]
                : []),
              {
                icon: DocIcon,
                title: "Les conditions avant le déplacement",
                text: "Gratuité ou conditions particulières, documents et date vous sont confirmés avant le rendez-vous.",
              },
              {
                icon: ShieldIcon,
                title: "Un certificat de destruction",
                text: "Délivré par le centre VHU qui prend en charge le véhicule. Conservez-le pour votre assurance.",
              },
              {
                icon: CheckIcon,
                title: "Les règles officielles",
                text: (
                  <>
                    Nos explications renvoient aux sources officielles, comme{" "}
                    <a href={sources.f1468.url} className="underline" rel="noopener">
                      Service-Public.fr
                    </a>
                    .
                  </>
                ),
              },
            ]}
          />
        </div>

        {company.proofs.length ? (
          <div className="mt-6">
            <FeatureList columns={3} items={company.proofs.map((p) => ({ title: p.label, text: p.detail }))} />
          </div>
        ) : null}

        {/* Encart du centre VHU partenaire, placé en bas de page à la demande du porteur de projet */}
        <div className="reveal mt-12">
          <PartnerCentreCard />
        </div>
      </Section>

      {/* K. FAQ */}
      <Section tone="surface" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <H2 id="faq-title">Enlèvement, pièces, rachat : vos questions</H2>
            <p className="mt-5 text-ink-3">
              Une question qui n&apos;est pas ici ? Appelez, c&apos;est souvent le plus rapide.
            </p>
            <div className="mt-6">
              <PhoneBig placement="home-faq" size="md" caption="Appel direct" />
            </div>
          </div>
          <div className="reveal">
            <Faq items={homeFaq} />
          </div>
        </div>
      </Section>

      <CallBand placement="home-bottom" title="Enlèvement d'épave gratuit : appelez-nous" />
    </>
  );
}
