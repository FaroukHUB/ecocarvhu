import { PhoneBig } from "@/components/ui/PhoneBig";
import { ButtonLink, Container } from "@/components/ui/primitives";

/** Bandeau d'appel : le numéro en grand, répété dans les pages, + accès au formulaire. */
export function CallBand({
  title = "Un véhicule à faire enlever, une pièce à trouver ?",
  text = "Appelez directement ou envoyez votre demande en ligne : l'équipe vous rappelle pour confirmer les conditions.",
  formHref = "/enlevement-epave#demande",
  formLabel = "Faire ma demande en ligne",
  placement,
}: {
  title?: string;
  text?: string;
  formHref?: string;
  formLabel?: string;
  placement: string;
}) {
  return (
    <section aria-label="Nous appeler" className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl"
      />
      <Container className="relative grid items-center gap-8 py-12 md:grid-cols-[1.2fr_1fr] md:py-14">
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
