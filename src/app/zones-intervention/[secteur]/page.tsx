import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pages } from "@/content/pages";
import { departments, sectors } from "@/content/sectors/data";
import type { CityLocal, Sector } from "@/content/sectors/types";
import { resolveFileLimits } from "@/lib/forms/files";
import {
  getSector,
  isSectorPublished,
  isSectorRenderable,
  sectorPath,
} from "@/lib/publication";
import { buildMetadata, type Crumb } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Eyebrow, H2, Notice, Section } from "@/components/ui/primitives";
import { Faq } from "@/components/ui/Faq";
import { RequestSteps } from "@/components/sections/RequestSteps";
import { DocumentsChecklist } from "@/components/sections/DocumentsChecklist";
import { PartnerCentreCard } from "@/components/sections/PartnerCentreCard";
import { CallBand } from "@/components/sections/CallBand";
import { PickupForm } from "@/components/forms/RequestForms";
import { AlertIcon, CheckIcon, CoinsIcon, DocIcon, GearIcon, MapPinIcon, TruckIcon } from "@/components/ui/icons";
import { FeatureList } from "@/components/ui/FeatureList";

/** Toutes les pages de secteur sont pré-générées ; une page non rendable renvoie un vrai 404. */
export function generateStaticParams() {
  return sectors.map((s) => ({ secteur: s.slug }));
}

function resolve(slug: string): Sector {
  const sector = getSector(slug);
  if (!sector || !isSectorRenderable(sector)) notFound();
  return sector;
}

export async function generateMetadata({ params }: PageProps<"/zones-intervention/[secteur]">): Promise<Metadata> {
  const { secteur } = await params;
  const sector = getSector(secteur);
  if (!sector || !isSectorRenderable(sector)) return { title: "Page introuvable", robots: { index: false } };
  return buildMetadata({
    path: sectorPath(sector),
    title: sector.seo.title,
    description: sector.seo.description,
    absoluteTitle: false,
    draft: !isSectorPublished(sector.status),
  });
}

const CONDITIONS_BEFORE = [
  "si l'enlèvement est faisable compte tenu de l'accès et de l'état du véhicule ;",
  "les éventuels frais de transport ou d'intervention, ou la gratuité lorsqu'elle s'applique ;",
  "les documents à préparer selon votre situation ;",
  "la date et le créneau proposés.",
];

export default async function SectorPage({ params }: PageProps<"/zones-intervention/[secteur]">) {
  const { secteur } = await params;
  const sector = resolve(secteur);

  const crumbs: Crumb[] = [{ name: pages.zones.label, path: pages.zones.path }];
  if (sector.kind === "city") {
    const paca = getSector("paca");
    if (paca && isSectorRenderable(paca)) crumbs.push({ name: "PACA", path: sectorPath(paca) });
  }
  crumbs.push({ name: sector.name, path: sectorPath(sector) });

  const related = sector.related
    .map((slug) => getSector(slug))
    .filter((s): s is Sector => Boolean(s && isSectorRenderable(s)));

  return (
    <>

      <PageHero
        crumbs={crumbs}
        eyebrow={sector.department ? `${sector.department.name} (${sector.department.code})` : "Région"}
        title={sector.seo.h1}
        lead={<p>{sector.lead}</p>}
      />

      {sector.local ? (
        <CityBody sector={sector} local={sector.local} />
      ) : (
        <>
          <Section labelledBy="services-title">
            <Eyebrow>Ce que vous pouvez demander</Eyebrow>
            <H2 id="services-title">Trois demandes possibles {sector.locative}</H2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              <ServiceCard
                href="#demande"
                icon={TruckIcon}
                title="Enlèvement d'épave gratuit"
                text="Véhicule complet en panne, accidenté ou non roulant, enlevé gratuitement et remis au centre VHU agréé partenaire."
              />
              <ServiceCard
                href={pages.demandePiece.path}
                icon={GearIcon}
                title="Recherche de pièce"
                text="Une pièce d'occasion compatible, même sans connaître son nom exact."
              />
              <ServiceCard
                href={pages.rachat.path}
                icon={CoinsIcon}
                title="Étude de rachat"
                text="Pour un véhicule qui garde une valeur, sans estimation automatique."
              />
            </ul>
            {!sector.status.serviceConfirmed ? (
              <p className="mt-6 text-sm text-muted">
                La disponibilité de chaque service sur ce secteur est confirmée lors de l&apos;étude de votre
                demande.
              </p>
            ) : null}
          </Section>

          <Section tone="mint" labelledBy="acces-title">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <Eyebrow>Décrire le véhicule et son accès</Eyebrow>
                <H2 id="acces-title">Ce qui permet une réponse fiable</H2>
                <ul className="mt-6 space-y-3">
                  {sector.accessTips.map((t) => (
                    <li key={t} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
                      <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
                      <span className="text-ink-3">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow>Avant le rendez-vous</Eyebrow>
                <H2>Ce qui vous est confirmé</H2>
                <ul className="prose-eco mt-4 text-ink-3">
                  {CONDITIONS_BEFORE.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Notice tone="warn">
                  Un créneau souhaité n&apos;est pas un rendez-vous confirmé, et la demande en ligne
                  n&apos;autorise pas la destruction du véhicule.
                </Notice>
              </div>
            </div>
          </Section>

          {sector.kind === "region" ? (
            <Section labelledBy="dep-title">
              <Eyebrow>Départements</Eyebrow>
              <H2 id="dep-title">Les six départements de la zone visée</H2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {departments.map((d) => (
                  <li key={d.code} className="card p-5">
                    <span className="font-bold">{d.name}</span> <span className="text-muted">({d.code})</span>
                    <p className="mt-0.5 text-sm text-muted">
                      {d.serviceConfirmed ? "Service confirmé" : "Faisabilité confirmée à chaque demande"}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          <Section tone="ink" labelledBy="deroule-title">
            <Eyebrow tone="light">Déroulement</Eyebrow>
            <H2 id="deroule-title">De la demande au certificat de destruction</H2>
            <div className="mt-10">
              <RequestSteps tone="dark" />
            </div>
          </Section>

          <Container className="py-14">
            <PartnerCentreCard />
          </Container>

          <section id="demande" aria-labelledby="demande-title" className="scroll-mt-20 bg-surface py-14 sm:py-20">
            <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-3xl border border-line bg-paper p-5 shadow-[0_30px_60px_-40px_rgb(11_19_16/0.35)] sm:p-9">
                <H2 id="demande-title" className="!mt-0 mb-2">
                  Demande d&apos;enlèvement gratuit {sector.locative}
                </H2>
                <p className="mb-6 text-sm text-muted">
                  La commune est préremplie : modifiez-la si le véhicule se trouve ailleurs.
                </p>
                <PickupForm
                  pagePath={sectorPath(sector)}
                  sector={sector.slug}
                  defaultCity={sector.form.city}
                  defaultPostalCode={sector.form.postalCode}
                  askArrondissement={sector.form.askArrondissement}
                  limits={resolveFileLimits()}
                />
              </div>
              <aside className="space-y-5">
                {sector.localFacts.length ? (
                  <div className="card p-6">
                    <h3 className="font-bold">Repères pour ce secteur</h3>
                    <ul className="mt-3 space-y-3 text-[0.95rem]">
                      {sector.localFacts.map((f) => (
                        <li key={f.text}>
                          <p className="text-ink-3">{f.text}</p>
                          <p className="mt-0.5 text-xs text-muted">Source : {f.source}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </aside>
            </Container>
          </section>

          <Section labelledBy="docs-title">
            <Eyebrow>Documents</Eyebrow>
            <H2 id="docs-title">Documents et cas particuliers</H2>
            <div className="mt-8">
              <DocumentsChecklist />
            </div>
          </Section>

          {sector.faq.length ? (
            <Section tone="mint" labelledBy="faq-title">
              <H2 id="faq-title">Questions fréquentes {sector.locative}</H2>
              <div className="mt-8">
                <Faq items={sector.faq} />
              </div>
            </Section>
          ) : null}
        </>
      )}

      <Section labelledBy="liens-title">
        <H2 id="liens-title" className="text-2xl sm:text-3xl">
          Voir aussi
        </H2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          <li>
            <Link href={pages.zones.path} className="inline-flex rounded-full border border-line bg-white px-4 py-2 font-medium transition hover:-translate-y-0.5 hover:border-ink">
              Toutes les zones d&apos;intervention
            </Link>
          </li>
          {related.map((s) => (
            <li key={s.slug}>
              <Link href={sectorPath(s)} className="inline-flex rounded-full border border-line bg-white px-4 py-2 font-medium transition hover:-translate-y-0.5 hover:border-ink">
                {s.kind === "region" ? s.name : `Enlèvement ${s.locative}`}
              </Link>
            </li>
          ))}
          <li>
            <Link href={pages.enlevement.path} className="inline-flex rounded-full border border-line bg-white px-4 py-2 font-medium transition hover:-translate-y-0.5 hover:border-ink">
              Enlèvement d&apos;épave
            </Link>
          </li>
          <li>
            <Link href={pages.centreVhu.path} className="inline-flex rounded-full border border-line bg-white px-4 py-2 font-medium transition hover:-translate-y-0.5 hover:border-ink">
              Rôle du centre VHU
            </Link>
          </li>
        </ul>
      </Section>

      <CallBand placement={`secteur-${sector.slug}`} formHref="#demande" />
    </>
  );
}

function ServiceCard({
  href,
  icon: Icon,
  title,
  text,
}: {
  href: string;
  icon: (p: { className?: string }) => React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <li>
      <Link href={href} className="card group block h-full p-7">
        <span className="icon-tile draw">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-ink-3">{text}</p>
      </Link>
    </li>
  );
}

/**
 * Corps d'une page de ville : contenu propre à la commune (article, situations,
 * conseils, FAQ) et ordre des sections variable selon la ville, pour que les
 * pages locales ne soient pas des copies les unes des autres. Les informations
 * communes (étapes, documents) sont résumées et renvoient aux pages dédiées.
 */
function CityBody({ sector, local }: { sector: Sector; local: CityLocal }) {
  const v = local.variant;
  const name = sector.name;

  const guide = (tone: "paper" | "surface") => (
    <Section key="guide" tone={tone} labelledBy="guide-title">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="reveal">
          <Eyebrow>{["Bon à savoir", "Notre éclairage", "Le contexte local"][v - 1]}</Eyebrow>
          <H2 id="guide-title">{local.guide.title}</H2>
          <div className="prose-eco mt-5 text-lg text-ink-3">
            {local.guide.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="reveal space-y-4 lg:pt-16">
          <div className="card p-6">
            <p className="flex items-center gap-2 font-semibold">
              <MapPinIcon className="h-5 w-5 text-brand" />
              {name} en bref
            </p>
            <ul className="mt-3 space-y-3 text-[0.95rem]">
              {sector.localFacts.map((f) => (
                <li key={f.text}>
                  <p className="text-ink-3">{f.text}</p>
                  <p className="mt-0.5 text-xs text-muted">Source : {f.source}</p>
                </li>
              ))}
            </ul>
          </div>
          {local.nearby.length ? (
            <div className="card-dark bg-ink p-6 text-white">
              <p className="font-semibold">Communes voisines</p>
              <p className="mt-2 text-[0.95rem] text-white/75">
                {local.nearby.join(" · ")}. Indiquez toujours la commune et le code postal exacts du véhicule.
              </p>
            </div>
          ) : null}
        </aside>
      </div>
    </Section>
  );

  const situations = (tone: "paper" | "surface") => (
    <Section key="situations" tone={tone} labelledBy="situations-title">
      <div className="reveal">
        <Eyebrow>{["Cas fréquents", "Situations locales", "Exemples concrets"][v - 1]}</Eyebrow>
        <H2 id="situations-title">{local.situations.title}</H2>
      </div>
      <div className="mt-10">
        <FeatureList
          columns={3}
          items={local.situations.items.map((it, i) => ({
            ...it,
            icon: [[TruckIcon, AlertIcon, DocIcon], [AlertIcon, DocIcon, TruckIcon], [DocIcon, TruckIcon, AlertIcon]][v - 1][i],
          }))}
        />
      </div>
    </Section>
  );

  const access = (tone: "paper" | "surface") => (
    <Section key="access" tone={tone} labelledBy="acces-title">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="reveal">
          <Eyebrow>Décrire le véhicule et son accès</Eyebrow>
          <H2 id="acces-title">
            {[`Ce qui permet une réponse fiable ${sector.locative}`, `Les détails qui comptent ${sector.locative}`, `Avant d'écrire : l'accès ${sector.locative}`][v - 1]}
          </H2>
          <ul className="mt-6 space-y-3">
            {sector.accessTips.map((t) => (
              <li key={t} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <CheckIcon className="h-3 w-3" />
                </span>
                <span className="text-ink-3">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal card-dark bg-ink-grid self-start p-7 text-white">
          <p className="text-lg font-semibold">Confirmé avec vous avant le rendez-vous</p>
          <p className="mt-3 text-white/75">
            Faisabilité, conditions (gratuité pour un véhicule complet et accessible), documents et date : rien
            n&apos;est engagé sans votre accord, et la demande en ligne n&apos;autorise pas la destruction.
          </p>
          <p className="mt-4 text-sm text-white/60">
            Déroulement complet :{" "}
            <Link href={pages.enlevement.path} className="font-semibold text-lime underline">
              enlèvement d&apos;épave
            </Link>{" "}
            · documents :{" "}
            <Link href={`${pages.centreVhu.path}#docs-title`} className="font-semibold text-lime underline">
              ce qu&apos;il faut préparer
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );

  const form = (
    <section
      key="form"
      id="demande"
      aria-labelledby="demande-title"
      className="scroll-mt-20 bg-surface py-16 sm:py-24"
    >
      <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-line bg-paper p-5 shadow-[0_30px_60px_-40px_rgb(11_19_16/0.35)] sm:p-9">
          <H2 id="demande-title" className="!mt-0 mb-2">
            {[`Demande d'enlèvement ${sector.locative}`, `Votre demande pour ${name}`, `Faire enlever un véhicule ${sector.locative}`][v - 1]}
          </H2>
          <p className="mb-6 text-sm text-muted">
            La commune est préremplie : modifiez-la si le véhicule se trouve ailleurs.
          </p>
          <PickupForm
            pagePath={sectorPath(sector)}
            sector={sector.slug}
            defaultCity={sector.form.city}
            defaultPostalCode={sector.form.postalCode}
            askArrondissement={sector.form.askArrondissement}
            limits={resolveFileLimits()}
          />
        </div>
        <aside className="space-y-4 lg:pt-2">
          <div className="card p-6">
            <span className="icon-tile draw h-10 w-10">
              <GearIcon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-semibold">Une pièce à chercher, un véhicule à vendre ?</p>
            <p className="mt-1.5 text-[0.95rem] text-ink-3">
              Ce formulaire concerne l&apos;enlèvement. Pour une pièce ou une étude de rachat, utilisez le formulaire
              dédié.
            </p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
              <Link href={pages.demandePiece.path} className="text-brand underline">
                Demande de pièce
              </Link>
              <Link href={pages.rachat.path} className="inline-flex items-center gap-1 text-brand underline">
                <CoinsIcon className="h-4 w-4" />
                Étude de rachat
              </Link>
            </p>
          </div>
        </aside>
      </Container>
    </section>
  );

  const faq = (tone: "paper" | "surface") =>
    sector.faq.length ? (
      <Section key="faq" tone={tone} labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <H2 id="faq-title">
              {[`Vos questions ${sector.locative}`, `On nous demande souvent ${sector.locative}`, `Questions fréquentes ${sector.locative}`][v - 1]}
            </H2>
          </div>
          <div className="reveal">
            <Faq items={sector.faq} />
          </div>
        </div>
      </Section>
    ) : null;

  const order = {
    1: ["guide", "situations", "access", "form", "faq"],
    2: ["situations", "form", "guide", "access", "faq"],
    3: ["access", "guide", "situations", "form", "faq"],
  }[v];

  let i = 0;
  return (
    <>
      {order.map((key) => {
        if (key === "form") return form;
        const tone = i++ % 2 === 0 ? "paper" : "surface";
        if (key === "guide") return guide(tone);
        if (key === "situations") return situations(tone);
        if (key === "access") return access(tone);
        return faq(tone);
      })}
    </>
  );
}
