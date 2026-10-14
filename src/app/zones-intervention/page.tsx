import Link from "next/link";
import { pages } from "@/content/pages";
import { departments } from "@/content/sectors/data";
import { sectorPath, visibleSectors } from "@/lib/publication";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Eyebrow, H2, Section } from "@/components/ui/primitives";
import { PacaMap } from "@/components/sections/PacaMap";
import { CallBand } from "@/components/sections/CallBand";
import { ArrowIcon, MapPinIcon } from "@/components/ui/icons";

const page = pages.zones;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

export default function ZonesPage() {
  const all = visibleSectors();
  const region = all.find((s) => s.kind === "region");
  const cities = all.filter((s) => s.kind === "city");
  const byDep = departments.map((d) => ({
    ...d,
    cities: cities.filter((c) => c.department?.code === d.code).sort((a, b) => Number(!a.featured) - Number(!b.featured)),
  }));

  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Provence-Alpes-Côte d'Azur"
        title={page.h1}
        lead={
          <p>
            Six départements, {cities.length} villes avec leur page dédiée, et toutes les autres communes sur simple
            demande : la faisabilité est vérifiée à partir de la commune et de l&apos;accès au véhicule.
          </p>
        }
        actions={<ButtonLink href="/enlevement-epave#demande">Vérifier ma commune avec une demande</ButtonLink>}
      />

      {/* Carte de la région */}
      <Section tone="ink" labelledBy="carte-title">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="reveal">
            <Eyebrow tone="light">Carte des secteurs</Eyebrow>
            <H2 id="carte-title">Toute la région, département par département</H2>
            <p className="mt-5 text-white/75">
              Touchez un département pour afficher ses villes, ou un point pour ouvrir la page de la ville. Votre
              commune n&apos;y figure pas ? Faites une demande avec votre code postal : la liste n&apos;est pas fermée.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-3">
              {[
                { k: "Départements", v: departments.length },
                { k: "Villes", v: cities.length },
                { k: "Enlèvement", v: "Gratuit*" },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/60">{s.k}</dt>
                  <dd className="mt-1 text-2xl font-bold text-lime sm:text-3xl">{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-white/55">* Pour un véhicule complet et accessible.</p>
            <ul className="mt-8 grid grid-cols-2 gap-2">
              {byDep.map((d) => (
                <li key={d.code}>
                  <a
                    href={`#dep-${d.code}`}
                    className="flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-white/85 transition hover:border-lime/50 hover:text-white"
                  >
                    <span className="flex h-7 w-9 shrink-0 items-center justify-center rounded-md bg-lime text-xs font-bold text-ink">
                      {d.code}
                    </span>
                    <span className="truncate">{d.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal-zoom rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 sm:p-6">
            <PacaMap cities={cities} className="h-auto w-full" />
          </div>
        </div>
      </Section>

      {/* Annuaire par département */}
      <Section tone="surface" labelledBy="secteurs-title">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Villes desservies</Eyebrow>
            <H2 id="secteurs-title">Enlèvement d&apos;épave gratuit par département</H2>
          </div>
          {region ? (
            <Link href={sectorPath(region)} className="btn btn-outline">
              Toute la région PACA
              <ArrowIcon className="h-5 w-5" />
            </Link>
          ) : null}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {byDep.map((d) => (
            <section
              key={d.code}
              id={`dep-${d.code}`}
              aria-labelledby={`dep-${d.code}-title`}
              className="reveal scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-white"
            >
              <header className="bg-ink-grid flex items-center gap-4 px-6 py-5 text-white">
                <span className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl bg-lime text-lg font-bold text-ink">
                  {d.code}
                </span>
                <div className="min-w-0">
                  <h3 id={`dep-${d.code}-title`} className="truncate text-lg font-semibold tracking-tight">
                    Épaviste {d.name}
                  </h3>
                  <p className="text-sm text-white/60">
                    {d.cities.length} ville{d.cities.length > 1 ? "s" : ""} avec une page dédiée
                  </p>
                </div>
              </header>
              <ul className="divide-y divide-line">
                {d.cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={sectorPath(c)}
                      className="group flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-surface"
                    >
                      <MapPinIcon className="h-4 w-4 shrink-0 text-brand" />
                      <span className="min-w-0 flex-1">
                        <span className="text-ink-3">Enlèvement d&apos;épave </span>
                        <span className="font-semibold text-ink">{c.locative}</span>
                      </span>
                      <span className="hidden text-xs tabular-nums text-muted sm:inline">{c.postalCodes[0]}</span>
                      <ArrowIcon className="h-4 w-4 shrink-0 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-brand" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>

      <Section labelledBy="regles-title">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="reveal md:col-span-3">
            <Eyebrow>Notre méthode</Eyebrow>
            <H2 id="regles-title">Comment une commune est prise en charge</H2>
          </div>
          {[
            {
              t: "Une vérification par demande",
              d: "Commune, accès et état du véhicule sont étudiés avant de vous proposer un rendez-vous.",
            },
            {
              t: "Pas d'agence fictive",
              d: "Une zone desservie n'est pas une agence : aucune adresse locale n'est affichée sans établissement réel.",
            },
            {
              t: "Des conditions annoncées",
              d: "Délais et conditions sont donnés pour chaque demande, jamais de façon générale.",
            },
          ].map((r) => (
            <div key={r.t} className="reveal card p-7">
              <h3 className="text-lg font-semibold tracking-tight">{r.t}</h3>
              <p className="mt-2 text-[0.95rem] text-ink-3">{r.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <CallBand placement="zones" />
    </>
  );
}
