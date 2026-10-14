import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, Notice } from "@/components/ui/primitives";

/** Valeur manquante affichée explicitement (jamais de valeur plausible inventée). */
export function Missing({ children = "à compléter" }: { children?: React.ReactNode }) {
  return <span className="rounded bg-warn-soft px-1.5 py-0.5 font-semibold text-ink">[{children}]</span>;
}

export function LegalPage({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: title, path }]} />
      <Container className="py-10">
        <h1 className="text-[2rem] font-bold sm:text-4xl">{title}</h1>
        <div className="prose-eco mt-8 max-w-3xl text-ink-2">{children}</div>
      </Container>
    </>
  );
}
