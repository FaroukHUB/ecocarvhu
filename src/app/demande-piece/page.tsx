import Link from "next/link";
import { pages } from "@/content/pages";
import { resolveFileLimits } from "@/lib/forms/files";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Notice } from "@/components/ui/primitives";
import { PartForm } from "@/components/forms/RequestForms";

const page = pages.demandePiece;

export const metadata = buildMetadata({ path: page.path, title: page.title, description: page.description });

export default function DemandePiecePage() {
  const limits = resolveFileLimits();
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
            Trois étapes : votre véhicule, la pièce, vos coordonnées. Si vous ne connaissez pas le nom de
            la pièce, une description et une photo suffisent.
          </p>
        }
      />
      <section aria-label="Formulaire de demande de pièce" className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl bg-paper p-5 shadow-sm ring-1 ring-line sm:p-8">
            <PartForm pagePath={page.path} limits={limits} />
          </div>
          <aside className="space-y-5">
            <Notice title="Avant la réponse, l'équipe vérifie">
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>que la pièce est disponible ;</li>
                <li>qu&apos;elle est compatible avec votre véhicule ;</li>
                <li>son état.</li>
              </ul>
            </Notice>
            <Notice tone="warn" title="Sans engagement">
              Une demande ne réserve aucune pièce. Le prix et les modalités (retrait, envoi, garantie
              éventuelle) sont indiqués avec la proposition.
            </Notice>
            <p className="text-sm text-ink-3">
              Plusieurs références à chercher pour un atelier ?{" "}
              <Link href={pages.pros.path} className="font-semibold text-brand underline">
                Utilisez le formulaire professionnel
              </Link>
              .
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
