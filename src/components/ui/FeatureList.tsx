/**
 * Liste de points en cartes (bordure fine, élévation au survol) ou en lignes.
 * Option `numbered` : pastille 01, 02… ; option `icon` par élément : icône SVG tracée à l'apparition.
 */
export interface FeatureItem {
  title: string;
  text?: React.ReactNode;
  children?: React.ReactNode;
  icon?: (p: { className?: string }) => React.ReactNode;
}

export function FeatureList({
  items,
  columns = 2,
  numbered = false,
  tone = "light",
  headingLevel = 3,
  variant = "card",
}: {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
  tone?: "light" | "dark";
  headingLevel?: 3 | 4;
  variant?: "card" | "line";
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  const H = headingLevel === 4 ? "h4" : "h3";
  const List = numbered ? "ol" : "ul";
  const dark = tone === "dark";
  const box =
    variant === "card"
      ? dark
        ? "card-dark"
        : "card"
      : `border-t pt-5 ${dark ? "border-white/15" : "border-ink/10"}`;

  return (
    <List className={`grid gap-4 ${variant === "line" ? "gap-x-10 gap-y-8" : ""} ${cols}`}>
      {items.map((it, i) => (
        <li key={it.title} className={`reveal ${box}`}>
          <div className="flex items-center justify-between gap-3">
            {it.icon ? (
              <span className="icon-tile draw">
                <it.icon className="h-6 w-6" />
              </span>
            ) : null}
            {numbered ? (
              <span
                aria-hidden="true"
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2.5 text-sm font-bold tabular-nums ${
                  dark ? "bg-lime text-ink" : "bg-ink text-lime"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : null}
          </div>
          <H
            className={`text-lg font-semibold leading-snug tracking-tight ${numbered || it.icon ? "mt-5" : ""}`}
          >
            {it.title}
          </H>
          {it.text ? (
            <p className={`mt-2 text-[0.95rem] leading-relaxed ${dark ? "text-white/70" : "text-ink-3"}`}>{it.text}</p>
          ) : null}
          {it.children}
        </li>
      ))}
    </List>
  );
}
