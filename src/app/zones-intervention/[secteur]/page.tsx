import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pages } from "@/content/pages";
import { departments, sectors } from "@/content/sectors/data";
import type { Sector } from "@/content/sectors/types";
import { sources } from "@/content/regulatory";
import { resolveFileLimits } from "@/lib/forms/files";
import {
  getSector,
  isSectorPublished,
  isSectorRenderable,
  sectorPath,
} from "@/lib/publication";
import { buildMetadata, type Crumb } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { DraftBanner } from "@/components/ui/DraftBanner";
import { Container, Eyebrow, H2, Notice, Section } from "@/components/ui/primitives";
import { Faq } from "@/components/ui/Faq";
import { RequestSteps } from "@/components/sections/RequestSteps";
import { DocumentsChecklist } from "@/components/sections/DocumentsChecklist";
import { PartnerCentreCard } from "@/components/sections/PartnerCentreCard";
import { CallBand } from "@/components/sections/CallBand";
import { PickupForm } from "@/components/forms/RequestForms";
import { CoinsIcon, GearIcon, TruckIcon } from "@/components/ui/icons";

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
  const published = isSectorPublished(sector.status);
  const isForeign = sector.kind === "foreign-state";

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
      {!published ? (
        <DraftBanner
          missing={sector.missing}
          label={isForeign ? "Secteur séparé (État distinct) — brouillon" : "Brouillon de page locale"}
        />
      ) : null}

      <PageHero
        crumbs={crumbs}
        eyebrow={sector.department ? `${sector.department.name} (${sector.department.code})` : isForeign ? "État distinct" : "Région"}
        title={sector.seo.h1}
        lead={<p>{sector.lead}</p>}
      />

      {isForeign ? (
        <ForeignStateBody sector={sector} />
      ) : (
        <>
          <Section labelledBy="services-title">
            <Eyebrow>Ce que vous pouvez demander</Eyebrow>
            <H2 id="services-title">Trois demandes possibles {sector.locative}</H2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
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

          <Section tone="surface" labelledBy="acces-title">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <Eyebrow>Décrire le véhicule et son accès</Eyebrow>
                <H2 id="acces-title">Ce qui permet une réponse fiable</H2>
                <ul className="mt-6 space-y-3">
                  {sector.accessTips.map((t) => (
                    <li key={t} className="flex gap-3 rounded-xl bg-paper p-4 ring-1 ring-line">
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
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {departments.map((d) => (
                  <li key={d.code} className="rounded-xl bg-surface px-4 py-3.5">
                    <span className="font-bold">{d.name}</span> <span className="text-muted">({d.code})</span>
                    <p className="mt-0.5 text-sm text-muted">
                      {d.serviceConfirmed ? "Service confirmé" : "Faisabilité confirmée à chaque demande"}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          <Section tone={sector.kind === "region" ? "surface" : "paper"} labelledBy="deroule-title">
            <Eyebrow>Déroulement</Eyebrow>
            <H2 id="deroule-title">De la demande au certificat de destruction</H2>
            <div className="mt-8">
              <RequestSteps />
            </div>
          </Section>

          <Container className="py-6">
            <PartnerCentreCard />
          </Container>

          <section id="demande" aria-labelledby="demande-title" className="scroll-mt-20 bg-surface py-14 sm:py-20">
            <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-2xl bg-paper p-5 shadow-sm ring-1 ring-line sm:p-8">
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
                  <div className="rounded-2xl bg-paper p-5 ring-1 ring-line">
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
            <Section tone="surface" labelledBy="faq-title">
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
        <ul className="mt-5 flex flex-wrap gap-3">
          <li>
            <Link href={pages.zones.path} className="inline-flex rounded-full bg-surface px-4 py-2 font-semibold hover:text-brand">
              Toutes les zones d&apos;intervention
            </Link>
          </li>
          {related.map((s) => (
            <li key={s.slug}>
              <Link href={sectorPath(s)} className="inline-flex rounded-full bg-surface px-4 py-2 font-semibold hover:text-brand">
                {s.kind === "region" ? s.name : `Enlèvement ${s.locative}`}
              </Link>
            </li>
          ))}
          <li>
            <Link href={pages.enlevement.path} className="inline-flex rounded-full bg-surface px-4 py-2 font-semibold hover:text-brand">
              Enlèvement d&apos;épave
            </Link>
          </li>
          <li>
            <Link href={pages.centreVhu.path} className="inline-flex rounded-full bg-surface px-4 py-2 font-semibold hover:text-brand">
              Rôle du centre VHU
            </Link>
          </li>
        </ul>
      </Section>

      {!isForeign ? <CallBand placement={`secteur-${sector.slug}`} formHref="#demande" /> : null}
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
      <Link href={href} className="block h-full rounded-2xl bg-surface p-6 ring-1 ring-transparent hover:ring-brand">
        <Icon className="h-8 w-8 text-brand" />
        <h3 className="mt-3 text-lg font-bold">{title}</h3>
        <p className="mt-1.5 text-ink-3">{text}</p>
      </Link>
    </li>
  );
}

function ForeignStateBody({ sector }: { sector: Sector }) {
  return (
    <Section labelledBy="monaco-title">
      <div className="max-w-3xl space-y-6">
        <H2 id="monaco-title">Des démarches différentes des démarches françaises</H2>
        <ul className="space-y-4">
          {sector.localFacts.map((f) => (
            <li key={f.text} className="rounded-xl bg-surface p-4">
              <p className="text-ink-3">{f.text}</p>
              <p className="mt-1 text-xs text-muted">Source : {f.source}</p>
            </li>
          ))}
        </ul>
        <Notice tone="warn" title="Aucune intervention proposée à ce stade">
          Les procédures monégasques et les conditions d&apos;intervention doivent être vérifiées avant
          toute offre. Pour un véhicule immatriculé à Monaco, consultez{" "}
          <a href={sources.monaco.url} className="underline" rel="noopener">
            Mon Service Public
          </a>
          .
        </Notice>
      </div>
    </Section>
  );
}
