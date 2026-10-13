import Image from "next/image";
import Link from "next/link";
import { company } from "@/config/company";
import { heroAlt, heroImageSrc } from "@/config/media";
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
import { CheckIcon, CoinsIcon, DocIcon, GearIcon, PhoneIcon, ShieldIcon, TruckIcon } from "@/components/ui/icons";
import { Faq } from "@/components/ui/Faq";
import { Photo, hasPhotoBlock } from "@/components/ui/Photo";
import { HeroIllustration } from "@/components/sections/HeroIllustration";
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
  const heroSrc = heroImageSrc();
  const accessGuide = guideHref("enlevement-acces-difficile");
  const docsGuide = guideHref("documents-remise-vehicule");
  const refGuide = guideHref("identifier-reference-piece");

  return (
    <>
      {/* A. Hero : enlèvement en priorité, pièce en second, rachat en entrée secondaire */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {heroSrc ? (
          <>
            <Image src={heroSrc} alt={heroAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/30" />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_85%_15%,#17803d_0%,transparent_50%),linear-gradient(135deg,#2a3036_0%,#1b1f23_60%)]"
          />
        )}

        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:py-20">
          <div>
            <Eyebrow tone="light">Épaviste · Pièces auto d&apos;occasion · PACA</Eyebrow>
            <h1 className="mt-3 text-[2.2rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Enlèvement d&apos;épave gratuit{" "}
              <span className="mt-1 block text-[0.62em] font-bold leading-tight text-white/90">
                en Provence-Alpes-Côte d&apos;Azur
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Votre véhicule hors d&apos;usage est enlevé <strong className="text-white">gratuitement</strong>{" "}
              s&apos;il est complet et accessible, puis remis à un centre VHU partenaire. Vous connaissez les
              conditions avant le déplacement.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/enlevement-epave#demande"
                className="flex min-h-16 items-center gap-3 rounded-2xl bg-brand px-6 py-3.5 text-white shadow-[0_6px_0_var(--color-brand-deep)] transition hover:bg-brand-dark active:translate-y-1 active:shadow-[0_2px_0_var(--color-brand-deep)]"
              >
                <TruckIcon className="h-8 w-8 shrink-0" />
                <span className="text-lg font-extrabold leading-tight sm:whitespace-nowrap">Demander un enlèvement</span>
              </Link>
              <Link
                href={pages.demandePiece.path}
                className="flex min-h-16 items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-ink shadow-[0_6px_0_rgb(0_0_0/0.35)] transition hover:bg-brand-soft active:translate-y-1 active:shadow-[0_2px_0_rgb(0_0_0/0.35)]"
              >
                <GearIcon className="h-8 w-8 shrink-0 text-brand" />
                <span className="text-lg font-extrabold leading-tight sm:whitespace-nowrap">Trouver une pièce</span>
              </Link>
            </div>

            <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <PhoneBig placement="hero" size="lg" caption="Appel direct" />
              <Link
                href={pages.rachat.path}
                className="inline-flex items-center gap-2 font-semibold text-white underline decoration-brand-bright decoration-2 underline-offset-4 hover:text-brand-bright"
              >
                <CoinsIcon className="h-5 w-5 text-brand-bright" />
                Faire étudier le rachat de mon véhicule
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            {heroSrc ? null : (
              <figure>
                <HeroIllustration className="rounded-[28px] shadow-2xl ring-1 ring-white/10" />
                <figcaption className="mt-2 text-right text-xs text-white/50">Illustration</figcaption>
              </figure>
            )}
          </div>
        </Container>

        <div className="border-t border-white/10 bg-black/20">
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
          <div>
            <Eyebrow>Qui fait quoi</Eyebrow>
            <H2 id="role-title">Un interlocuteur pour préparer la prise en charge de votre véhicule</H2>
            <p className="mt-4 text-lg leading-relaxed text-ink-3">
              Faire enlever une épave soulève toujours les mêmes questions : est-ce faisable chez moi, est-ce
              gratuit, quels papiers, et qui détruit le véhicule ? EcocarVHU y répond{" "}
              <strong className="text-ink">avant</strong> le déplacement, puis organise l&apos;enlèvement. La
              destruction elle-même relève du centre VHU partenaire.
            </p>
            <p className="mt-4 text-ink-3">
              Vous savez à chaque étape ce qui se passe ensuite : l&apos;équipe vous rappelle, vous confirme
              les conditions et le rendez-vous, et vous indique les documents à remettre.{" "}
              <Link href={pages.centreVhu.path} className="font-semibold text-brand underline underline-offset-2">
                Comprendre le rôle du centre VHU
              </Link>
            </p>
            <Photo slot="enlevement" className="mt-8" />
          </div>
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:sticky lg:top-28">
            {roles.map((r) => (
              <div key={r.who} className="rounded-2xl bg-surface p-6">
                <p className="text-sm font-bold uppercase tracking-wider text-brand">{r.who}</p>
                <h3 className="mt-1 text-lg font-bold">{r.title}</h3>
                <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-3">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <h3 className="mt-14 text-2xl font-extrabold">Votre enlèvement d&apos;épave en 4 étapes</h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-paper p-5 ring-1 ring-line">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-lg font-extrabold text-white shadow-[3px_3px_0_var(--color-brand-deep)]"
              >
                {i + 1}
              </span>
              <h4 className="mt-4 text-lg font-bold">{s.title}</h4>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-3">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-muted">
          La demande en ligne n&apos;est ni un rendez-vous confirmé ni une autorisation de destruction.
          {docsGuide ? (
            <>
              {" "}
              <Link href={docsGuide} className="underline">
                Préparer les documents de remise
              </Link>
            </>
          ) : null}
        </p>
      </Section>

      {/* C. Situations de véhicules */}
      <Section tone="surface" labelledBy="situations-title">
        <div className={hasPhotoBlock("acces") ? "grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]" : ""}>
          <div>
            <Eyebrow>Véhicules hors d&apos;usage</Eyebrow>
            <H2 id="situations-title">Quels véhicules faire enlever, et quoi nous indiquer</H2>
            <p className="mt-3 max-w-3xl text-ink-3">
              Chaque situation demande des informations différentes. Plus la description est précise, plus la
              réponse est fiable. Une photo de l&apos;accès est souvent aussi utile qu&apos;une photo du
              véhicule : elle montre si un camion plateau peut approcher.
            </p>
          </div>
          <Photo slot="acces" />
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {situations.map((s) => (
            <li key={s.title} className="rounded-2xl bg-paper p-6 ring-1 ring-line">
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-ink-3">{s.text}</p>
              <dl className="mt-4 space-y-2 text-[0.95rem]">
                <div>
                  <dt className="inline font-semibold">À indiquer : </dt>
                  <dd className="inline text-ink-3">{s.provide}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Ce que l&apos;équipe vérifie : </dt>
                  <dd className="inline text-ink-3">{s.check}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-xl font-bold">Cas à vérifier avant tout rendez-vous</h3>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {toVerify.map((t) => (
            <li key={t.title} className="rounded-2xl border-l-4 border-signal bg-paper p-5">
              <p className="font-bold">{t.title}</p>
              <p className="mt-1 text-[0.95rem] text-ink-3">{t.text}</p>
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
      </Section>

      {/* D. Gratuité et conditions */}
      <Section labelledBy="gratuite-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Eyebrow>Gratuité</Eyebrow>
            <H2 id="gratuite-title">Enlèvement d&apos;épave gratuit : à quelles conditions ?</H2>
            <p className="mt-4 text-ink-3">
              L&apos;enlèvement est gratuit lorsque les quatre conditions ci-contre sont réunies. Si
              l&apos;une d&apos;elles ne l&apos;est pas, la demande est étudiée et les conditions vous sont
              annoncées avant le rendez-vous : vous restez libre de ne pas donner suite.
            </p>
            <div className="mt-6 rounded-2xl bg-surface p-5 text-[0.95rem] leading-relaxed text-ink-3">
              <p className="font-bold text-ink">Remise au centre et collecte : deux choses différentes</p>
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
              <li key={c.title} className="rounded-2xl bg-brand-soft p-6">
                <p className="text-sm font-bold text-brand-dark">Condition {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold">{c.title}</h3>
                <p className="mt-1.5 text-[0.95rem] text-ink-3">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* E (suite). Questionnaire existant */}
      <Section tone="surface" labelledBy="check-title">
        <Eyebrow>Avant le déplacement</Eyebrow>
        <H2 id="check-title">Préparez votre demande en 5 questions</H2>
        <p className="mt-3 max-w-2xl text-ink-3">
          Cet outil vous aide à repérer ce qu&apos;il faut signaler. Il ne vaut ni accord, ni devis : vos
          réponses sont simplement reprises dans le formulaire d&apos;enlèvement, rien n&apos;est envoyé
          tant que vous ne validez pas la demande.
        </p>
        <div className="mt-8">
          <VehicleCheck />
        </div>
      </Section>

      {/* F. Pièces auto d'occasion */}
      <Section labelledBy="pieces-title">
        <div className={hasPhotoBlock("pieces") ? "grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]" : ""}>
          <Photo slot="pieces" className="lg:order-first" />
          <div className="order-first lg:order-none">
            <Eyebrow>Pièces de réemploi</Eyebrow>
            <H2 id="pieces-title">Pièces auto d&apos;occasion : la bonne pièce, vérifiée avant toute proposition</H2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-3">
              Une pièce d&apos;occasion n&apos;est utile que si elle correspond exactement à votre véhicule. La
              même marque et le même modèle ne suffisent pas : l&apos;année, la motorisation, la finition et
              les options changent souvent la pièce. Chaque demande est donc vérifiée (disponibilité,
              compatibilité, état) avant de vous proposer quoi que ce soit.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partFamilies.map((f) => (
            <li key={f.title} className="rounded-2xl bg-surface p-5">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <GearIcon className="h-5 w-5 shrink-0 text-brand" />
                {f.title}
              </h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-3">{f.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-6 rounded-2xl bg-ink p-6 text-white sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h3 className="text-xl font-bold">Préparer une demande de pièce</h3>
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
      <Section tone="surface">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl bg-paper p-6 ring-1 ring-line sm:p-8">
            <CoinsIcon className="h-9 w-9 text-brand" />
            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
              Rachat de véhicule : demander une étude
            </h2>
            <p className="mt-3 text-ink-3">
              Votre véhicule est en panne, accidenté ou très kilométré mais garde de la valeur, pour ses pièces
              ou pour une réparation ? Décrivez-le : l&apos;équipe étudie la demande et vous indique si une offre
              est possible. Le site ne calcule aucun prix automatiquement.
            </p>
            <p className="mt-4 font-semibold">Les informations utiles :</p>
            <ul className="mt-2 space-y-1.5 text-[0.95rem] text-ink-3">
              {buybackInfo.map((b) => (
                <li key={b} className="flex gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Une première réponse reste indicative : une offre définitive suppose de vérifier le véhicule. Tous
              les véhicules ne font pas l&apos;objet d&apos;une offre ; s&apos;il est hors d&apos;usage,
              l&apos;enlèvement vers le centre VHU vous est alors proposé.
            </p>
            <div className="mt-auto pt-6">
              <ButtonLink href={pages.rachat.path} variant="secondary">
                Demander une étude de rachat
              </ButtonLink>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl bg-paper p-6 ring-1 ring-line sm:p-8">
            <ShieldIcon className="h-9 w-9 text-brand" />
            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
              Garages, carrossiers, dépanneurs : vos demandes groupées
            </h2>
            <p className="mt-3 text-ink-3">
              Un formulaire dédié aux professionnels, sans compte à créer. Les modalités (quantités, retrait,
              fréquence) sont discutées au cas par cas.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {proUses.map((u) => (
                <li key={u.title} className="rounded-xl bg-surface p-4">
                  <h3 className="font-bold">{u.title}</h3>
                  <p className="mt-1 text-sm text-ink-3">{u.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <ButtonLink href={pages.pros.path} variant="secondary">
                Faire une demande professionnelle
              </ButtonLink>
            </div>
          </article>
        </div>
      </Section>

      {/* I. Présentation régionale */}
      <Section tone="ink" labelledBy="zones-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow tone="light">Zones d&apos;intervention</Eyebrow>
            <H2 id="zones-title">Épaviste en Provence-Alpes-Côte d&apos;Azur : vérifiez votre commune</H2>
            <p className="mt-4 text-white/80">
              La zone visée couvre les six départements de la région, des villes du littoral aux communes de
              l&apos;arrière-pays. Les accès et les distances y sont très différents : plutôt qu&apos;une
              promesse générale, chaque commune est vérifiée à partir de votre code postal.
            </p>
            <ol className="mt-6 space-y-3 text-white/85">
              <li className="flex gap-3">
                <span className="font-extrabold text-brand-bright">1.</span>
                Indiquez votre code postal dans la demande ou au téléphone.
              </li>
              <li className="flex gap-3">
                <span className="font-extrabold text-brand-bright">2.</span>
                L&apos;équipe vous confirme si l&apos;enlèvement est possible dans votre commune, et à quelles
                conditions.
              </li>
              <li className="flex gap-3">
                <span className="font-extrabold text-brand-bright">3.</span>
                Il s&apos;agit de zones desservies, pas d&apos;agences : aucune adresse locale n&apos;est
                annoncée.
              </li>
            </ol>
            <p className="mt-6">
              <Link href={pages.zones.path} className="font-semibold text-brand-bright underline underline-offset-4">
                Toutes les zones d&apos;intervention
              </Link>
            </p>
          </div>
          <SectorList tone="dark" />
        </div>
      </Section>

      {/* J. Confiance : uniquement des éléments vérifiables */}
      <Section labelledBy="confiance-title">
        <Eyebrow>Ce que vous pouvez vérifier</Eyebrow>
        <H2 id="confiance-title">Des engagements que vous pouvez contrôler</H2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {company.phone ? (
            <li className="rounded-2xl bg-surface p-5">
              <PhoneIcon className="h-7 w-7 text-brand" />
              <h3 className="mt-3 font-bold">Un numéro direct</h3>
              <p className="mt-1 text-[0.95rem] text-ink-3">
                Le {company.phone.value} pour poser vos questions avant toute demande.
              </p>
            </li>
          ) : null}
          <li className="rounded-2xl bg-surface p-5">
            <DocIcon className="h-7 w-7 text-brand" />
            <h3 className="mt-3 font-bold">Les conditions avant le déplacement</h3>
            <p className="mt-1 text-[0.95rem] text-ink-3">
              Gratuité ou conditions particulières, documents et date vous sont confirmés avant le rendez-vous.
            </p>
          </li>
          <li className="rounded-2xl bg-surface p-5">
            <ShieldIcon className="h-7 w-7 text-brand" />
            <h3 className="mt-3 font-bold">Un certificat de destruction</h3>
            <p className="mt-1 text-[0.95rem] text-ink-3">
              Délivré par le centre VHU qui prend en charge le véhicule. Conservez-le pour votre assurance.
            </p>
          </li>
          <li className="rounded-2xl bg-surface p-5">
            <CheckIcon className="h-7 w-7 text-brand" />
            <h3 className="mt-3 font-bold">Les règles officielles</h3>
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
        <div className="mt-10">
          <PartnerCentreCard />
        </div>
      </Section>

      {/* K. FAQ */}
      <Section tone="surface" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>Questions fréquentes</Eyebrow>
            <H2 id="faq-title">Enlèvement, pièces, rachat : vos questions</H2>
            <p className="mt-4 text-ink-3">
              Une question qui n&apos;est pas ici ? Appelez, c&apos;est souvent le plus rapide.
            </p>
            <div className="mt-6">
              <PhoneBig placement="home-faq" size="md" caption="Appel direct" />
            </div>
          </div>
          <Faq items={homeFaq} />
        </div>
      </Section>

      <CallBand placement="home-bottom" title="Enlèvement d'épave gratuit : appelez-nous" />
    </>
  );
}
