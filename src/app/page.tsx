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
import { AlertIcon, CheckIcon, CoinsIcon, DocIcon, GearIcon, MapPinIcon, PhoneIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";
import { Faq } from "@/components/ui/Faq";
import { Photo, hasPhotoBlock } from "@/components/ui/Photo";
import { HeroBackground } from "@/components/sections/HeroBackground";
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
  const hasHeroImage = Boolean(heroImages());
  const accessGuide = guideHref("enlevement-acces-difficile");
  const docsGuide = guideHref("documents-remise-vehicule");
  const refGuide = guideHref("identifier-reference-piece");

  return (
    <>
      {/* A. Hero : image plein cadre (paysage sur ordinateur, portrait sur mobile), voile léger, texte par-dessus */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {hasHeroImage ? (
          <>
            <HeroBackground />
            {/* Voile : plus dense derrière le texte (haut en portrait, gauche en paysage) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10 portrait:bg-gradient-to-b portrait:from-ink/85 portrait:via-ink/50 portrait:to-ink/10"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_85%_15%,#17803d_0%,transparent_50%),linear-gradient(135deg,#2a3036_0%,#1b1f23_60%)]"
          />
        )}

        <Container className="flex min-h-[calc(100svh-7rem)] flex-col justify-start pb-10 pt-10 md:min-h-[600px] md:justify-center md:py-20 lg:min-h-[680px]">
          <div className="max-w-2xl [text-shadow:0_2px_12px_rgb(0_0_0/0.45)]">
            <Eyebrow tone="light">Épaviste · Pièces auto d&apos;occasion · PACA</Eyebrow>
            <h1 className="mt-3 text-[2.3rem] font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              Enlèvement d&apos;épave gratuit{" "}
              <span className="mt-1 block text-[0.6em] font-bold leading-tight text-white/95">
                en Provence-Alpes-Côte d&apos;Azur
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Véhicule complet et accessible : nous l&apos;enlevons <strong className="text-white">gratuitement</strong>{" "}
              et le remettons à un centre VHU partenaire. Conditions confirmées avant le déplacement.
            </p>

            <div className="mt-6 grid gap-3 [text-shadow:none] sm:flex">
              <Link
                href="/enlevement-epave#demande"
                className="flex min-h-14 items-center gap-3 rounded-2xl bg-brand px-5 py-3 text-white shadow-[0_6px_0_var(--color-brand-deep)] transition hover:bg-brand-dark active:translate-y-1 active:shadow-[0_2px_0_var(--color-brand-deep)] sm:px-6"
              >
                <TruckIcon className="h-7 w-7 shrink-0" />
                <span className="text-lg font-extrabold leading-tight sm:whitespace-nowrap">Demander un enlèvement</span>
              </Link>
              <Link
                href={pages.demandePiece.path}
                className="flex min-h-14 items-center gap-3 rounded-2xl bg-white/95 px-5 py-3 text-ink shadow-[0_6px_0_rgb(0_0_0/0.35)] backdrop-blur transition hover:bg-white active:translate-y-1 active:shadow-[0_2px_0_rgb(0_0_0/0.35)] sm:px-6"
              >
                <GearIcon className="h-7 w-7 shrink-0 text-brand" />
                <span className="text-lg font-extrabold leading-tight sm:whitespace-nowrap">Trouver une pièce</span>
              </Link>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 [text-shadow:none] sm:flex-row sm:items-center sm:gap-6">
              <PhoneBig placement="hero" size="lg" caption="Appel direct" />
              <Link
                href={pages.rachat.path}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink/60 px-4 py-2 font-semibold text-white backdrop-blur hover:bg-ink/80"
              >
                <CoinsIcon className="h-5 w-5 text-brand-bright" />
                Faire étudier le rachat de mon véhicule
              </Link>
            </div>
          </div>
        </Container>

        <div className="border-t border-white/10 bg-ink/70 backdrop-blur">
          <Container>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 py-4 text-sm font-semibold text-white/90 md:grid-cols-4">
              {[
                "Gratuit si véhicule complet et accessible",
                "Remise à un centre VHU partenaire",
                "Certificat de destruction remis par le centre",
                "Demandes dans toute la région PACA",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                  {t}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* B + E. Rôle d'EcocarVHU et déroulement */}
      <Section labelledBy="role-title">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="reveal">
            <Eyebrow>Qui fait quoi</Eyebrow>
            <H2 id="role-title">Un interlocuteur pour préparer la prise en charge de votre véhicule</H2>
            <p className="mt-5 text-lg leading-relaxed text-ink-3">
              Faire enlever une épave soulève toujours les mêmes questions : est-ce faisable chez moi, est-ce
              gratuit, quels papiers, et qui détruit le véhicule ? EcocarVHU y répond{" "}
              <strong className="text-brand-dark">avant</strong> le déplacement, puis organise l&apos;enlèvement.
              La destruction elle-même relève du centre VHU partenaire.
            </p>
            <p className="mt-4 text-ink-3">
              Vous savez à chaque étape ce qui se passe ensuite : l&apos;équipe vous rappelle, vous confirme
              les conditions et le rendez-vous, et vous indique les documents à remettre.{" "}
              <Link href={pages.centreVhu.path} className="font-semibold text-brand underline underline-offset-2">
                Comprendre le rôle du centre VHU
              </Link>
            </p>
            <Photo slot="enlevement" className="reveal-zoom mt-8" />
          </div>
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:sticky lg:top-28">
            {roles.map((r, i) => (
              <div
                key={r.who}
                className={`reveal lift rounded-3xl p-6 text-white shadow-xl ${i === 0 ? "bg-brand-glow" : "bg-ink-grid"}`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                  {i === 0 ? <PhoneIcon className="h-6 w-6" /> : <ShieldIcon className="h-6 w-6 text-brand-bright" />}
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/70">{r.who}</p>
                <h3 className="mt-1 text-xl font-extrabold">{r.title}</h3>
                <ul className="mt-4 space-y-2.5 text-[0.95rem] text-white/90">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-mint-dots p-5 sm:p-8">
          <h3 className="text-2xl font-extrabold sm:text-3xl">
            Votre enlèvement d&apos;épave en <span className="text-brand">4 étapes</span>
          </h3>
          <ol className="relative mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="absolute left-6 right-6 top-6 hidden h-1 rounded-full bg-gradient-to-r from-brand via-brand-bright to-signal lg:block"
            />
            {steps.map((s, i) => (
              <li key={s.title} className="reveal relative rounded-2xl bg-paper p-5 shadow-md ring-1 ring-black/5">
                <span
                  aria-hidden="true"
                  className={`relative flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-extrabold text-white shadow-[3px_3px_0_rgb(0_0_0/0.2)] ${
                    ["bg-brand", "bg-brand-dark", "bg-[#c99a00]", "bg-ink"][i]
                  }`}
                >
                  {i + 1}
                </span>
                <h4 className="mt-4 text-lg font-bold">{s.title}</h4>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-3">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-3">
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
      <Section tone="mint" labelledBy="situations-title">
        <div className={hasPhotoBlock("acces") ? "grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]" : ""}>
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
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {situations.map((s, i) => {
            const Icon = [GearIcon, AlertIcon, TruckIcon, MapPinIcon][i] ?? CheckIcon;
            return (
              <li key={s.title} className="reveal lift overflow-hidden rounded-3xl bg-paper shadow-md ring-1 ring-black/5">
                <div className="flex items-center gap-4 bg-ink-grid px-6 py-4 text-white">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-bright text-ink">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-extrabold leading-snug">{s.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-ink-3">{s.text}</p>
                  <dl className="mt-4 grid gap-3 text-[0.95rem] sm:grid-cols-2">
                    <div className="rounded-2xl bg-sun p-4">
                      <dt className="text-xs font-bold uppercase tracking-wider text-[#6b4f00]">À indiquer</dt>
                      <dd className="mt-1 text-ink-2">{s.provide}</dd>
                    </div>
                    <div className="rounded-2xl bg-mint p-4">
                      <dt className="text-xs font-bold uppercase tracking-wider text-brand-dark">Ce que l&apos;équipe vérifie</dt>
                      <dd className="mt-1 text-ink-2">{s.check}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 rounded-3xl bg-sun-soft p-5 ring-1 ring-[#c99a00]/25 sm:p-8">
          <h3 className="flex items-center gap-3 text-xl font-extrabold sm:text-2xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal text-ink">
              <AlertIcon className="h-5 w-5" />
            </span>
            Cas à vérifier avant tout rendez-vous
          </h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {toVerify.map((t) => (
              <li key={t.title} className="reveal rounded-2xl bg-paper p-5 shadow-sm">
                <p className="font-extrabold text-ink">{t.title}</p>
                <p className="mt-1.5 text-[0.95rem] text-ink-3">{t.text}</p>
              </li>
            ))}
          </ul>
          {accessGuide ? (
            <p className="mt-5 text-sm">
              <Link href={accessGuide} className="font-semibold text-brand underline underline-offset-2">
                Comment décrire un sous-sol ou un accès difficile
              </Link>
            </p>
          ) : null}
        </div>
      </Section>

      {/* D. Gratuité et conditions */}
      <Section tone="brand" labelledBy="gratuite-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal">
            <Eyebrow tone="light">Gratuité</Eyebrow>
            <H2 id="gratuite-title">Enlèvement d&apos;épave gratuit : à quelles conditions ?</H2>
            <p className="mt-5 text-lg text-white/90">
              L&apos;enlèvement est <strong className="text-white">gratuit</strong> lorsque les quatre conditions
              ci-contre sont réunies. Si l&apos;une d&apos;elles ne l&apos;est pas, la demande est étudiée et les
              conditions vous sont annoncées avant le rendez-vous : vous restez libre de ne pas donner suite.
            </p>
            <div className="mt-6 rounded-2xl bg-white/10 p-5 text-[0.95rem] leading-relaxed text-white/85 ring-1 ring-white/20 backdrop-blur">
              <p className="font-bold text-white">Remise au centre et collecte : deux choses différentes</p>
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
          <ol className="grid gap-4 sm:grid-cols-2">
            {freeConditions.map((c, i) => (
              <li key={c.title} className="reveal lift rounded-3xl bg-paper p-6 text-ink shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun-2 text-xl font-extrabold text-[#6b4f00]">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-extrabold">{c.title}</h3>
                <p className="mt-1.5 text-[0.95rem] text-ink-3">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* E (suite). Questionnaire existant */}
      <Section tone="sun" labelledBy="check-title">
        <div className="reveal">
          <Eyebrow tone="sun">Avant le déplacement</Eyebrow>
          <H2 id="check-title">Préparez votre demande en 5 questions</H2>
          <p className="mt-5 max-w-2xl text-lg text-ink-3">
            Répondez en un clic : vos réponses s&apos;affichent dans l&apos;encadré <strong>« Vos réponses »</strong>{" "}
            et sont reprises automatiquement dans le formulaire d&apos;enlèvement. Rien n&apos;est envoyé tant que
            vous ne validez pas la demande. Ce n&apos;est ni un accord ni un devis.
          </p>
        </div>
        <div className="mt-8">
          <VehicleCheck />
        </div>
      </Section>

      {/* F. Pièces auto d'occasion */}
      <Section labelledBy="pieces-title">
        <div className={hasPhotoBlock("pieces") ? "grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]" : ""}>
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
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partFamilies.map((f, i) => (
            <li
              key={f.title}
              className={`reveal lift rounded-3xl p-6 ring-1 ring-black/5 ${i % 3 === 0 ? "bg-mint" : i % 3 === 1 ? "bg-sun" : "bg-surface"}`}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${
                  i % 3 === 0 ? "bg-brand" : i % 3 === 1 ? "bg-[#c99a00]" : "bg-ink"
                }`}
              >
                <GearIcon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold">{f.title}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-3">{f.text}</p>
            </li>
          ))}
        </ul>
        <div className="reveal mt-10 grid gap-6 rounded-3xl bg-ink-grid p-6 text-white shadow-xl sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h3 className="text-xl font-extrabold sm:text-2xl">
              Préparer une <span className="text-brand-bright">demande de pièce</span>
            </h3>
            <ul className="mt-4 space-y-2.5">
              {partChecklist.map((c) => (
                <li key={c} className="flex gap-2.5 text-white/85">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <ButtonLink href={pages.demandePiece.path} variant="light">
              Faire une demande de pièce
            </ButtonLink>
            <p className="text-sm text-white/70">
              Ces familles décrivent les recherches possibles, pas un stock en ligne : la disponibilité est
              confirmée au cas par cas.{" "}
              <Link href={pages.pieces.path} className="font-semibold text-brand-bright underline">
                En savoir plus sur les pièces d&apos;occasion
              </Link>
              {refGuide ? (
                <>
                  {" · "}
                  <Link href={refGuide} className="font-semibold text-brand-bright underline">
                    Trouver la référence d&apos;une pièce
                  </Link>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </Section>

      {/* G + H. Rachat et professionnels */}
      <Section tone="mint">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="reveal flex flex-col overflow-hidden rounded-3xl bg-paper shadow-xl ring-1 ring-black/5">
            <div className="bg-sun-soft px-6 py-6 sm:px-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal text-ink">
                <CoinsIcon className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">Rachat de véhicule : demander une étude</h2>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="text-ink-3">
                Votre véhicule est en panne, accidenté ou très kilométré mais garde de la valeur, pour ses pièces
                ou pour une réparation ? Décrivez-le : l&apos;équipe étudie la demande et vous indique si une
                offre est possible. Le site ne calcule aucun prix automatiquement.
              </p>
              <p className="mt-4 font-bold">Les informations utiles :</p>
              <ul className="mt-2 space-y-1.5 text-[0.95rem] text-ink-3">
                {buybackInfo.map((b) => (
                  <li key={b} className="flex gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-2xl bg-surface p-4 text-sm text-ink-3">
                Une première réponse reste indicative : une offre définitive suppose de vérifier le véhicule. Tous
                les véhicules ne font pas l&apos;objet d&apos;une offre ; s&apos;il est hors d&apos;usage,
                l&apos;enlèvement vers le centre VHU vous est alors proposé.
              </p>
              <div className="mt-auto pt-6">
                <ButtonLink href={pages.rachat.path} variant="secondary">
                  Demander une étude de rachat
                </ButtonLink>
              </div>
            </div>
          </article>

          <article className="reveal flex flex-col overflow-hidden rounded-3xl bg-paper shadow-xl ring-1 ring-black/5">
            <div className="bg-brand-glow px-6 py-6 text-white sm:px-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <ShieldIcon className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
                Garages, carrossiers, dépanneurs : vos demandes groupées
              </h2>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="text-ink-3">
                Un formulaire dédié aux professionnels, sans compte à créer. Les modalités (quantités, retrait,
                fréquence) sont discutées au cas par cas.
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {proUses.map((u) => (
                  <li key={u.title} className="rounded-2xl bg-mint p-4">
                    <h3 className="font-extrabold text-brand-dark">{u.title}</h3>
                    <p className="mt-1 text-sm text-ink-3">{u.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <ButtonLink href={pages.pros.path} variant="primary">
                  Faire une demande professionnelle
                </ButtonLink>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* I. Présentation régionale */}
      <Section tone="ink" labelledBy="zones-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="reveal">
            <Eyebrow tone="light">Zones d&apos;intervention</Eyebrow>
            <H2 id="zones-title">Épaviste en Provence-Alpes-Côte d&apos;Azur : vérifiez votre commune</H2>
            <p className="mt-5 text-white/80">
              La zone visée couvre les six départements de la région, des villes du littoral aux communes de
              l&apos;arrière-pays. Les accès et les distances y sont très différents : plutôt qu&apos;une
              promesse générale, chaque commune est vérifiée à partir de votre code postal.
            </p>
            <ol className="mt-6 space-y-3">
              {[
                "Indiquez votre code postal dans la demande ou au téléphone.",
                "L'équipe vous confirme si l'enlèvement est possible dans votre commune, et à quelles conditions.",
                "Il s'agit de zones desservies, pas d'agences : aucune adresse locale n'est annoncée.",
              ].map((t, i) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-white/5 p-4 text-white/90 ring-1 ring-white/10">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-bright font-extrabold text-ink">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
            <p className="mt-6">
              <Link href={pages.zones.path} className="font-semibold text-brand-bright underline underline-offset-4">
                Toutes les zones d&apos;intervention
              </Link>
            </p>
          </div>
          <div className="reveal">
            <SectorList tone="dark" />
          </div>
        </div>
      </Section>

      {/* J. Confiance : uniquement des éléments vérifiables */}
      <Section labelledBy="confiance-title">
        <div className="reveal">
          <Eyebrow>Ce que vous pouvez vérifier</Eyebrow>
          <H2 id="confiance-title">Des engagements que vous pouvez contrôler</H2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {company.phone ? (
            <li className="reveal lift rounded-3xl border-t-4 border-brand bg-mint p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                <PhoneIcon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-extrabold">Un numéro direct</h3>
              <p className="mt-1 text-[0.95rem] text-ink-3">
                Le {company.phone.value} pour poser vos questions avant toute demande.
              </p>
            </li>
          ) : null}
          <li className="reveal lift rounded-3xl border-t-4 border-signal bg-sun p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal text-ink">
              <DocIcon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-extrabold">Les conditions avant le déplacement</h3>
            <p className="mt-1 text-[0.95rem] text-ink-3">
              Gratuité ou conditions particulières, documents et date vous sont confirmés avant le rendez-vous.
            </p>
          </li>
          <li className="reveal lift rounded-3xl border-t-4 border-ink bg-surface p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-brand-bright">
              <ShieldIcon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-extrabold">Un certificat de destruction</h3>
            <p className="mt-1 text-[0.95rem] text-ink-3">
              Délivré par le centre VHU qui prend en charge le véhicule. Conservez-le pour votre assurance.
            </p>
          </li>
          <li className="reveal lift rounded-3xl border-t-4 border-brand-dark bg-mint p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark text-white">
              <CheckIcon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-extrabold">Les règles officielles</h3>
            <p className="mt-1 text-[0.95rem] text-ink-3">
              Nos explications renvoient aux sources officielles, comme{" "}
              <a href={sources.f1468.url} className="underline" rel="noopener">
                Service-Public.fr
              </a>
              .
            </p>
          </li>
        </ul>

        {company.proofs.length ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {company.proofs.map((p) => (
              <li key={p.label} className="rounded-2xl bg-paper p-5 ring-1 ring-line">
                <p className="font-bold">{p.label}</p>
                <p className="mt-1 text-ink-3">{p.detail}</p>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Encart du centre VHU partenaire, placé en bas de page à la demande du porteur de projet */}
        <div className="reveal mt-12">
          <PartnerCentreCard />
        </div>
      </Section>

      {/* K. FAQ */}
      <Section tone="mint" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
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
