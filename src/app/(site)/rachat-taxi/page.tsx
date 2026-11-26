import Link from "next/link";
import { pages } from "@/content/pages";
import { taxiCases } from "@/content/home";
import { resolveFileLimits } from "@/lib/forms/files";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink, Container, Eyebrow, H2, Notice, Section } from "@/components/ui/primitives";
import { Faq } from "@/components/ui/Faq";
import { RequestSteps } from "@/components/sections/RequestSteps";
import { BuybackForm } from "@/components/forms/RequestForms";
import { CallBand } from "@/components/sections/CallBand";
import { CheckIcon, MapPinIcon } from "@/components/ui/icons";
import { departments } from "@/content/sectors/data";
import { sectorPath, visibleSectors } from "@/lib/publication";

/**
 * Rachat de taxis : page mise en avant à la demande du porteur de projet
 * (24/11/2026). Aucun prix, délai ou seuil de kilométrage n'est annoncé :
 * chaque taxi est étudié sur description et photos. Le formulaire est celui
 * du rachat ; la page d'origine (/rachat-taxi) permet de reconnaître la demande.
 */
const page = pages.rachatTaxi;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

const models = [
  "Toyota Corolla, C-HR, Prius+",
  "Skoda Octavia, Superb",
  "Mercedes Classe E, Classe V",
  "Peugeot 508, 5008",
  "Volkswagen Passat, Touran",
  "Hybrides, diesels et électriques",
];

const prepare = [
  "Le kilométrage exact (une photo du compteur suffit).",
  "La panne ou les dommages : choc, voyants, boîte, batterie hybride…",
  "Si le véhicule est encore équipé : lumineux, taximètre, terminal de paiement.",
  "La carte grise : à votre nom ou à celui de votre société.",
  "Les factures d'entretien si vous les avez.",
];

const faq = [
  {
    q: "Y a-t-il un kilométrage maximum ?",
    a: "Aucun seuil n'est fixé à l'avance. Un taxi qui a beaucoup roulé est étudié comme les autres, selon son état, son entretien et les photos envoyées.",
  },
  {
    q: "Mon taxi est accidenté : pouvez-vous le racheter ?",
    a: "Oui, sur étude. Joignez des photos des dommages et, si vous l'avez, le rapport d'expertise. L'équipe vous répond après examen.",
  },
  {
    q: "Le taxi est au nom de ma société : comment faire ?",
    a: "La cession est signée par le représentant de la société, avec la carte grise au nom de la société, un certificat de situation administrative récent et la déclaration de cession.",
  },
  {
    q: "Rachetez-vous les taxis à Marseille, Nice ou Toulon ?",
    a: "Oui, dans toute la région Provence-Alpes-Côte d'Azur : Marseille, Aix-en-Provence, Toulon, Nice, Cannes, Antibes, Avignon et les autres communes de PACA. L'étude se fait sur description et photos ; la faisabilité est confirmée selon votre commune.",
    link: { href: pages.zones.path, label: "Les zones d'intervention" },
  },
  {
    q: "Mon taxi est conventionné : est-ce que ça change quelque chose ?",
    a: "Non. Taxi conventionné ou non, la demande d'étude est la même : c'est le véhicule qui est étudié, selon son état, son kilométrage et ses photos.",
  },
  {
    q: "Pouvez-vous me donner un prix en ligne ?",
    a: "Non. Le site ne calcule aucune estimation automatique : l'équipe étudie la description et les photos, puis vous indique si une offre est possible. Une offre définitive suppose de vérifier le véhicule.",
  },
  {
    q: "Et si mon taxi n'a plus de valeur ?",
    a: "Il peut être enlevé et remis à un centre VHU agréé. L'enlèvement est gratuit si le véhicule est complet et accessible.",
    link: { href: pages.enlevement.path, label: "Demander un enlèvement" },
  },
];

export default function RachatTaxiPage() {
  const limits = resolveFileLimits();
  return (
    <>
      <PageHero
        crumbs={[
          { name: pages.rachat.label, path: pages.rachat.path },
          { name: page.label, path: page.path },
        ]}
        eyebrow="Chauffeurs et sociétés de taxi · PACA"
        title={page.h1}
        lead={
          <p>
            Votre taxi a beaucoup roulé, il a été accidenté ou il est en panne ? Vous arrêtez l&apos;activité ou
            vous changez de véhicule ? Décrivez-le et joignez quelques photos : l&apos;équipe étudie le rachat et
            vous répond. Sans annonce à publier, sans estimation automatique.
          </p>
        }
        actions={<ButtonLink href="#demande">Faire racheter mon taxi</ButtonLink>}
      />

      <Section labelledBy="cas-title">
        <Eyebrow>Les taxis que nous rachetons</Eyebrow>
        <H2 id="cas-title">Fort kilométrage, accident, panne : votre taxi a encore de la valeur</H2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {taxiCases.map((c) => (
            <li key={c.title} className="reveal card p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <CheckIcon className="h-5 w-5 shrink-0 text-brand" />
                {c.title}
              </h3>
              <p className="mt-2 text-[0.95rem] text-ink-3">{c.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <h3 className="text-lg font-semibold tracking-tight">Tous les modèles sont étudiés</h3>
          <p className="mt-1.5 text-ink-3">Par exemple, parmi les véhicules courants en taxi :</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {models.map((m) => (
              <li key={m} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="vendre-title">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow>Vendre son taxi</Eyebrow>
            <H2 id="vendre-title">Vendre son taxi à fort kilométrage ou accidenté, sans passer par une annonce</H2>
            <div className="prose-eco mt-6 space-y-4 text-ink-3">
              <p>
                Un taxi roule beaucoup plus qu&apos;une voiture de particulier. Au moment de le vendre, le compteur
                fait souvent fuir les acheteurs, et une annonce peut rester en ligne longtemps : appels, visites,
                essais, négociation. Le <strong>rachat de taxi sur étude</strong> vous évite ces démarches : vous
                décrivez le véhicule, l&apos;équipe l&apos;étudie et vous répond.
              </p>
              <p>
                <strong>Taxi accidenté</strong> : s&apos;il reste réparable ou garde de la valeur pour ses pièces,
                il peut être racheté. S&apos;il est hors d&apos;usage, son enlèvement vers un centre VHU agréé vous
                est proposé, gratuit si le véhicule est complet et accessible.
              </p>
              <p>
                <strong>Taxi en panne</strong> : moteur, boîte de vitesses, batterie hybride, électronique… Une panne
                coûteuse à réparer n&apos;empêche pas une étude de rachat. Décrivez-la simplement, même sans
                diagnostic.
              </p>
              <p>
                <strong>Fin d&apos;activité, départ à la retraite ou renouvellement</strong> : vous changez de
                véhicule ou vous arrêtez le taxi ? Faites étudier le rachat de l&apos;ancien avant de le laisser
                immobilisé.
              </p>
            </div>
          </div>
          <aside className="card self-start p-7">
            <h3 className="text-lg font-semibold tracking-tight">Taxis hybrides, diesel ou électriques</h3>
            <p className="mt-2 text-[0.95rem] text-ink-3">
              Berline ou monospace, taxi conventionné ou non : la demande est la même. Indiquez la motorisation,
              le kilométrage et l&apos;état de la batterie si c&apos;est un hybride ou un électrique.
            </p>
            <ButtonLink href="#demande" className="mt-6">
              Demander une étude de rachat
            </ButtonLink>
          </aside>
        </div>
      </Section>

      <Section tone="surface" labelledBy="villes-title">
        <Eyebrow>Partout en PACA</Eyebrow>
        <H2 id="villes-title">Rachat de taxi à Marseille, Aix-en-Provence, Toulon, Nice et dans toute la région</H2>
        <p className="mt-5 max-w-3xl text-lg text-ink-3">
          Chauffeur de taxi dans les Bouches-du-Rhône, le Var, les Alpes-Maritimes, le Vaucluse ou les Alpes :
          l&apos;étude de rachat se fait à distance, sur description et photos. La faisabilité est ensuite
          confirmée selon la commune où le taxi est stationné.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => {
            const cities = visibleSectors().filter((s) => s.kind === "city" && s.department?.code === d.code);
            if (!cities.length) return null;
            return (
              <div key={d.code} className="card p-6">
                <h3 className="flex items-center gap-2 font-semibold tracking-tight">
                  <MapPinIcon className="h-5 w-5 shrink-0 text-brand" />
                  Taxis {d.name === "Var" ? "du Var" : d.name === "Vaucluse" ? "du Vaucluse" : `des ${d.name}`} ({d.code})
                </h3>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.95rem]">
                  {cities.map((c) => (
                    <li key={c.slug}>
                      <Link href={sectorPath(c)} className="text-ink-2 underline decoration-line underline-offset-4 hover:text-brand">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="mint" labelledBy="etapes-title">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Eyebrow>Déroulement</Eyebrow>
            <H2 id="etapes-title">Comment se passe le rachat de votre taxi</H2>
            <div className="mt-8">
              <RequestSteps
                steps={[
                  { title: "Description", text: "Modèle, kilométrage, état et photos, dans le formulaire ci-dessous." },
                  { title: "Étude", text: "L'équipe examine la demande et vous rappelle si une précision manque." },
                  { title: "Réponse", text: "Proposition de rachat, ou orientation vers un enlèvement si le taxi est hors d'usage." },
                  { title: "Cession", text: "Uniquement si vous acceptez, avec les documents de cession." },
                ]}
              />
            </div>
          </div>
          <div className="card self-start p-7">
            <h3 className="text-xl font-semibold tracking-tight">Ce qu&apos;il faut indiquer</h3>
            <ul className="mt-4 space-y-2.5 text-ink-2">
              {prepare.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <section id="demande" aria-labelledby="demande-title" className="scroll-mt-20 bg-surface py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-line bg-paper p-5 shadow-[0_30px_60px_-40px_rgb(11_19_16/0.35)] sm:p-9">
            <H2 id="demande-title" className="!mt-0 mb-6">
              Demande de rachat de taxi
            </H2>
            <BuybackForm pagePath={page.path} limits={limits} />
          </div>
          <aside className="space-y-5">
            <Notice title="Des photos utiles">
              Avant, arrière, les deux côtés, l&apos;intérieur et le compteur. Montrez les dommages de près.
            </Notice>
            <Notice tone="warn" title="Pas d'offre automatique">
              Aucun montant n&apos;est garanti avant l&apos;examen du véhicule.
            </Notice>
            <p className="text-sm text-ink-3">
              Un autre véhicule à vendre ?{" "}
              <Link href={pages.rachat.path} className="font-semibold text-brand underline">
                Étude de rachat de véhicule
              </Link>
              .
            </p>
          </aside>
        </Container>
      </section>

      <Section labelledBy="faq-title">
        <H2 id="faq-title">Questions fréquentes sur le rachat de taxi</H2>
        <div className="mt-8">
          <Faq items={faq} />
        </div>
      </Section>

      <CallBand
        placement="rachat-taxi"
        formHref="#demande"
        formLabel="Faire racheter mon taxi"
        title="Un taxi à vendre ?"
        text="Fort kilométrage, accident ou panne : décrivez-le et joignez quelques photos, l'équipe étudie le rachat et vous répond."
      />
    </>
  );
}
