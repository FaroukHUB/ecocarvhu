import { pages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/primitives";
import { PartsComingSoon } from "@/components/sections/PartsComingSoon";

const page = pages.demandePiece;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

export default function DemandePiecePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: pages.pieces.label, path: pages.pieces.path },
          { name: page.label, path: page.path },
        ]}
        eyebrow="Pièces auto d'occasion"
        title={page.h1}
        lead={
          <p>
            Le service de pièces auto d&apos;occasion est en cours de préparation : les demandes de pièces seront
            ouvertes dès qu&apos;il sera prêt.
          </p>
        }
        phone={false}
      />
      <section aria-label="Service pièces en préparation" className="bg-surface py-12 sm:py-16">
        <Container>
          <PartsComingSoon />
        </Container>
      </section>
    </>
  );
}
