import Link from "next/link";
import { company } from "@/config/company";
import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, H2 } from "@/components/ui/primitives";
import { PhoneBig } from "@/components/ui/PhoneBig";
import { ContactForm } from "@/components/forms/RequestForms";
import { CoinsIcon, GearIcon, TruckIcon } from "@/components/ui/icons";

const page = pages.contact;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

const shortcuts = [
  { href: "/enlevement-epave#demande", label: "Demande d'enlèvement", icon: TruckIcon },
  { href: pages.demandePiece.path, label: "Demande de pièce", icon: GearIcon },
  { href: "/rachat-vehicule#demande", label: "Étude de rachat", icon: CoinsIcon },
];

export default function ContactPage() {
  return (
    <>
      <div className="bg-hero-light border-b border-ink/5">
        <Breadcrumbs items={[{ name: page.label, path: page.path }]} />
        <Container className="pb-12 pt-6">
          <h1 className="text-[2.2rem] font-bold leading-[1.04] tracking-[-0.04em] sm:text-[3.4rem]">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-3">
            Pour une demande précise, le formulaire dédié pose directement les bonnes questions :
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {shortcuts.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="card flex min-h-16 items-center gap-3 p-4 font-semibold"
                >
                  <span className="icon-tile h-10 w-10">
                    <s.icon className="h-5 w-5" />
                  </span>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <div>
            <PhoneBig placement="contact" size="lg" caption="Téléphone" />
          </div>
          <dl className="space-y-4">
            {company.email ? (
              <div>
                <dt className="font-bold">E-mail</dt>
                <dd>
                  <a href={`mailto:${company.email.value}`} className="text-brand underline">
                    {company.email.value}
                  </a>
                </dd>
              </div>
            ) : null}
            {company.openingHours ? (
              <div>
                <dt className="font-bold">Horaires</dt>
                <dd>{company.openingHours}</dd>
              </div>
            ) : null}
            {company.publicAddress ? (
              <div>
                <dt className="font-bold">Adresse</dt>
                <dd>{company.publicAddress}</dd>
              </div>
            ) : null}
          </dl>
          <p className="text-sm text-muted">
            Les demandes reçues par formulaire sont traitées par l&apos;équipe ; le délai de réponse
            n&apos;est pas garanti. Pour une situation urgente, appelez.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-paper p-5 shadow-[0_30px_60px_-40px_rgb(11_19_16/0.35)] sm:p-9">
          <H2 className="!mt-0 mb-6">Écrire un message</H2>
          <ContactForm pagePath={page.path} />
        </div>
      </Container>
    </>
  );
}
