/**
 * Liste éditoriale : éléments séparés par un filet en haut, sans cartes.
 * Option `numbered` : grands numéros (01, 02…) pour les étapes.
 */
export interface FeatureItem {
  title: string;
  text?: React.ReactNode;
  children?: React.ReactNode;
}

export function FeatureList({
  items,
  columns = 2,
  numbered = false,
  tone = "light",
  headingLevel = 3,
}: {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
  tone?: "light" | "dark";
  headingLevel?: 3 | 4;
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  const H = headingLevel === 4 ? "h4" : "h3";
  const List = numbered ? "ol" : "ul";
  return (
    <List className={`grid gap-x-10 gap-y-8 ${cols}`}>
      {items.map((it, i) => (
        <li key={it.title} className={`reveal border-t-2 pt-5 ${tone === "dark" ? "border-white/25" : "border-ink/15"}`}>
          {numbered ? (
            <span
              aria-hidden="true"
              className={`block text-4xl font-extrabold leading-none tabular-nums ${tone === "dark" ? "text-signal" : "text-brand"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : null}
          <H className={`text-lg font-extrabold leading-snug ${numbered ? "mt-3" : ""}`}>{it.title}</H>
          {it.text ? (
            <p className={`mt-2 leading-relaxed ${tone === "dark" ? "text-white/80" : "text-ink-3"}`}>{it.text}</p>
          ) : null}
          {it.children}
        </li>
      ))}
    </List>
  );
}
