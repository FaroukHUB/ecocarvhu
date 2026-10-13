import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { PhoneBig } from "@/components/ui/PhoneBig";
import type { Crumb } from "@/lib/seo";

/** En-tête de page intérieure : fil d'Ariane, H1 unique, accroche, actions, téléphone. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  phone = true,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead: React.ReactNode;
  actions?: React.ReactNode;
  phone?: boolean;
}) {
  return (
    <div className="border-b border-ink/10 bg-mint-dots">
      <Breadcrumbs items={crumbs} />
      <Container className="grid items-end gap-8 pb-12 pt-6 sm:pb-16 lg:grid-cols-[1.5fr_1fr]">
        <div>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">{title}</h1>
          <div className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-3">{lead}</div>
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {phone ? (
          <div className="lg:justify-self-end">
            <PhoneBig placement="page-hero" size="md" caption="Appel direct" />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
