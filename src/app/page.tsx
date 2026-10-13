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
import { CheckIcon, CoinsIcon, GearIcon, TruckIcon } from "@/components/ui/icons";
import { FeatureList } from "@/components/ui/FeatureList";
import { Faq } from "@/components/ui/Faq";
import { Photo, hasPhotoBlock } from "@/components/ui/Photo";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { VehicleCheck } from "@/components/sections/VehicleCheck";
import { PartnerCentreCard } from "@/components/sections/PartnerCentreCard";
import { SectorList } from "@/components/sections/SectorList";
import { CallBand } from "@/components/sections/CallBand";
import { RequestSteps } from "@/components/sections/RequestSteps";

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

        <Container className="flex min-h-[calc(100svh-7rem)] flex-col justify-start pb-10 pt-8 md:min-h-[600px] md:justify-center md:py-20 lg:min-h-[680px]">
          <div className="max-w-2xl [text-shadow:0_2px_12px_rgb(0_0_0/0.45)]">
            <div className="hidden sm:block">
              <Eyebrow tone="light">Épaviste · Pièces auto d&apos;occasion · PACA</Eyebrow>
            </div>
            <h1 className="text-[2.15rem] sm:mt-3 font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.6rem]">
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
                className="hidden min-h-14 items-center gap-3 rounded-2xl bg-white/95 px-5 py-3 text-ink shadow-[0_6px_0_rgb(0_0_0/0.35)] backdrop-blur transition hover:bg-white active:translate-y-1 active:shadow-[0_2px_0_rgb(0_0_0/0.35)] sm:flex sm:px-6"
              >
                <GearIcon className="h-7 w-7 shrink-0 text-brand" />
                <span className="text-lg font-extrabold leading-tight sm:whitespace-nowrap">Trouver une pièce</span>
              </Link>
            </div>

            <div className="mt-3 flex flex-col items-stretch gap-4 [text-shadow:none] sm:mt-6 sm:flex-row sm:items-center sm:gap-6">
              {/* Sur mobile, le numéro reste visible dans la barre du haut et le bouton flottant. */}
              <div className="hidden sm:block">
                <PhoneBig placement="hero" size="lg" caption="Appel direct" />
              </div>
              <Link
                href={pages.rachat.path}
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-2xl border-2 border-white/70 bg-ink/40 px-4 py-2 font-bold text-white backdrop-blur hover:bg-ink/70 sm:min-h-0 sm:justify-start sm:rounded-full sm:border-0 sm:bg-ink/60 sm:font-semibold"
              >
                <CoinsIcon className="h-5 w-5 text-brand-bright" />
                Faire étudier le rachat de mon véhicule
              </Link>
            </div>
          </div>
        </Container>

        <div className="hidden border-t border-white/10 bg-ink/70 backdrop-blur sm:block">
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
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
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
          <div className="space-y-10 lg:pt-14">
            {roles.map((r) => (
              <div key={r.who} className="reveal border-t-2 border-ink pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">{r.who}</p>
                <h3 className="mt-2 text-2xl font-extrabold leading-snug">{r.title}</h3>
                <ul className="mt-4 space-y-2.5 text-ink-3">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-extrabold sm:text-3xl">Votre enlèvement d&apos;épave en 4 étapes</h3>
          <div className="mt-8">
            <RequestSteps steps={steps} />
          </div>
          <p className="mt-8 text-sm text-ink-3">
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
        <ul className="mt-12 border-b border-ink/15">
          {situations.map((s) => (
            <li key={s.title} className="reveal grid gap-4 border-t border-ink/15 py-7 lg:grid-cols-[1fr_2fr] lg:gap-10">
              <div>
                <h3 className="text-xl font-extrabold leading-snug">{s.title}</h3>
                <p className="mt-2 text-ink-3">{s.text}</p>
              </div>
              <dl className="grid gap-5 text-[0.95rem] sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-dark">À indiquer</dt>
                  <dd className="mt-1.5 text-ink-2">{s.provide}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-brand-dark">Ce que l&apos;équipe vérifie</dt>
                  <dd className="mt-1.5 text-ink-2">{s.check}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-l-4 border-signal pl-5 sm:pl-8">
          <h3 className="text-xl font-extrabold sm:text-2xl">Cas à vérifier avant tout rendez-vous</h3>
          <div className="mt-6">
            <FeatureList items={toVerify} columns={3} headingLevel={4} />
          </div>
          {accessGuide ? (
            <p className="mt-6 text-sm">
              <Link href={accessGuide} className="font-semibold text-brand underline underline-offset-2">
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
            <H2 id="gratuite-title">Enlèvement d&apos;épave gratuit : à quelles conditions ?</H2>
            <p className="mt-5 text-lg text-white/90">
              L&apos;enlèvement est <strong className="text-white">gratuit</strong> lorsque les quatre conditions
              ci-contre sont réunies. Si l&apos;une d&apos;elles ne l&apos;est pas, la demande est étudiée et les
              conditions vous sont annoncées avant le rendez-vous : vous restez libre de ne pas donner suite.
            </p>
            <div className="mt-8 border-l-2 border-white/40 pl-5 text-[0.95rem] leading-relaxed text-white/85">
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
          <div className="lg:pt-4">
            <FeatureList items={freeConditions} numbered tone="dark" />
          </div>
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
        <div className="mt-12">
          <FeatureList items={partFamilies} columns={3} />
        </div>
        <div className="reveal mt-14 grid gap-8 border-t-2 border-ink pt-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h3 className="text-xl font-extrabold sm:text-2xl">Préparer une demande de pièce</h3>
            <ul className="mt-4 space-y-2.5">
              {partChecklist.map((c) => (
                <li key={c} className="flex gap-2.5 text-ink-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <ButtonLink href={pages.demandePiece.path} variant="primary">
              Faire une demande de pièce
            </ButtonLink>
            <p className="text-sm text-ink-3">
              Ces familles décrivent les recherches possibles, pas un stock en ligne : la disponibilité est
              confirmée au cas par cas.{" "}
              <Link href={pages.pieces.path} className="font-semibold text-brand underline">
                En savoir plus sur les pièces d&apos;occasion
              </Link>
              {refGuide ? (
                <>
                  {" · "}
                  <Link href={refGuide} className="font-semibold text-brand underline">
                    Trouver la référence d&apos;une pièce
                  </Link>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </Section>

      {/* G + H. Rachat et professionnels : deux colonnes séparées par un filet */}
      <Section tone="sun">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-ink/15">
          <article className="reveal flex flex-col lg:pr-12">
            <Photo slot="rachat" className="mb-8" />
            <Eyebrow tone="sun">Rachat</Eyebrow>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-tight sm:text-3xl">
              Rachat de véhicule : demander une étude
            </h2>
            <p className="mt-4 text-ink-3">
              Votre véhicule est en panne, accidenté ou très kilométré mais garde de la valeur, pour ses pièces
              ou pour une réparation ? Décrivez-le : l&apos;équipe étudie la demande et vous indique si une
              offre est possible. Le site ne calcule aucun prix automatiquement.
            </p>
            <p className="mt-5 font-bold">Les informations utiles :</p>
            <ul className="mt-2 space-y-1.5 text-[0.95rem] text-ink-3">
              {buybackInfo.map((b) => (
                <li key={b} className="flex gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-3">
              Une première réponse reste indicative : une offre définitive suppose de vérifier le véhicule. Tous
              les véhicules ne font pas l&apos;objet d&apos;une offre ; s&apos;il est hors d&apos;usage,
              l&apos;enlèvement vers le centre VHU vous est alors proposé.
            </p>
            <div className="mt-auto pt-7">
              <ButtonLink href={pages.rachat.path} variant="secondary">
                Demander une étude de rachat
              </ButtonLink>
            </div>
          </article>

          <article className="reveal flex flex-col border-t-2 border-ink pt-10 lg:border-t-0 lg:pl-12 lg:pt-0">
            <Eyebrow tone="sun">Professionnels</Eyebrow>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-tight sm:text-3xl">
              Garages, carrossiers, dépanneurs : vos demandes groupées
            </h2>
            <p className="mt-4 text-ink-3">
              Un formulaire dédié aux professionnels, sans compte à créer. Les modalités (quantités, retrait,
              fréquence) sont discutées au cas par cas.
            </p>
            <dl className="mt-6 border-b border-ink/15">
              {proUses.map((u) => (
                <div key={u.title} className="border-t border-ink/15 py-4">
                  <dt className="font-extrabold">{u.title}</dt>
                  <dd className="mt-1 text-[0.95rem] text-ink-3">{u.text}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-7">
              <ButtonLink href={pages.pros.path} variant="primary">
                Faire une demande professionnelle
              </ButtonLink>
            </div>
          </article>
        </div>
      </Section>

      {/* I. Présentation régionale */}
      <Section tone="ink" labelledBy="zones-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="reveal">
            <Eyebrow tone="light">Zones d&apos;intervention</Eyebrow>
            <H2 id="zones-title">Épaviste en Provence-Alpes-Côte d&apos;Azur : vérifiez votre commune</H2>
            <p className="mt-5 text-white/80">
              La zone visée couvre les six départements de la région, des villes du littoral aux communes de
              l&apos;arrière-pays. Les accès et les distances y sont très différents : plutôt qu&apos;une
              promesse générale, chaque commune est vérifiée à partir de votre code postal.
            </p>
            <ol className="mt-6 space-y-4">
              {[
                "Indiquez votre code postal dans la demande ou au téléphone.",
                "L'équipe vous confirme si l'enlèvement est possible dans votre commune, et à quelles conditions.",
                "Il s'agit de zones desservies, pas d'agences : aucune adresse locale n'est annoncée.",
              ].map((t, i) => (
                <li key={t} className="flex gap-4 text-white/90">
                  <span aria-hidden="true" className="w-7 shrink-0 text-xl font-extrabold leading-tight text-signal tabular-nums">
                    {String(i + 1).padStart(2, "0")}
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
        <div className="mt-10">
          <FeatureList
            columns={4}
            items={[
              ...(company.phone
                ? [
                    {
                      title: "Un numéro direct",
                      text: `Le ${company.phone.value} pour poser vos questions avant toute demande.`,
                    },
                  ]
                : []),
              {
                title: "Les conditions avant le déplacement",
                text: "Gratuité ou conditions particulières, documents et date vous sont confirmés avant le rendez-vous.",
              },
              {
                title: "Un certificat de destruction",
                text: "Délivré par le centre VHU qui prend en charge le véhicule. Conservez-le pour votre assurance.",
              },
              {
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
          <div className="mt-10">
            <FeatureList columns={3} items={company.proofs.map((p) => ({ title: p.label, text: p.detail }))} />
          </div>
        ) : null}

        {/* Encart du centre VHU partenaire, placé en bas de page à la demande du porteur de projet */}
        <div className="reveal mt-14">
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
