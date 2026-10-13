import Link from "next/link";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { Container, JsonLd } from "./primitives";

/** Fil d'Ariane visible + BreadcrumbList cohérent (mêmes libellés, mêmes URL). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <Container>
      <nav aria-label="Fil d'Ariane" className="pt-5 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-semibold text-ink-2">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="hover:text-brand hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden="true">›</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </Container>
  );
}
