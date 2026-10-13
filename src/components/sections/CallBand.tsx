import { PhoneBig } from "@/components/ui/PhoneBig";
import { ButtonLink, Container } from "@/components/ui/primitives";

/** Bandeau d'appel : le numéro en grand, répété dans les pages, + accès au formulaire. */
export function CallBand({
  title = "Enlèvement d'épave gratuit : un appel suffit",
  text = "Véhicule complet et accessible : l'enlèvement est gratuit. Appelez directement ou envoyez votre demande en ligne.",
  formHref = "/enlevement-epave#demande",
  formLabel = "Demander un enlèvement gratuit",
  placement,
}: {
  title?: string;
  text?: string;
  formHref?: string;
  formLabel?: string;
  placement: string;
}) {
  return (
    <section aria-label="Nous appeler" className="bg-ink-grid text-white">
      <Container className="grid items-center gap-8 py-12 md:grid-cols-[1.2fr_1fr] md:py-14">
        <div>
          <p className="text-2xl font-extrabold leading-tight sm:text-3xl">{title}</p>
          <p className="mt-3 max-w-xl text-white/80">{text}</p>
          <div className="mt-6">
            <ButtonLink href={formHref} variant="light">
              {formLabel}
            </ButtonLink>
          </div>
        </div>
        <div className="md:justify-self-end">
          <PhoneBig placement={placement} size="xl" caption="Appel direct" />
        </div>
      </Container>
    </section>
  );
}
