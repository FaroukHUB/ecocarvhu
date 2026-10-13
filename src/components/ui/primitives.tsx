import Link from "next/link";
import { ArrowIcon } from "./icons";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "surface" | "ink" | "mint" | "brand" | "sun";
  id?: string;
  labelledBy?: string;
}) {
  const toneClass = {
    paper: "bg-paper",
    surface: "bg-surface",
    ink: "bg-ink-grid text-white",
    mint: "bg-surface",
    brand: "bg-brand-glow text-white",
    sun: "bg-surface",
  }[tone];
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${toneClass} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Sur-titre : pastille avec point lumineux qui pulse. */
export function Eyebrow({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "light" | "sun" }) {
  const dark = tone === "light";
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
        dark ? "border-white/15 bg-white/5 text-white/85" : "border-ink/10 bg-white text-ink-3"
      }`}
    >
      <span aria-hidden="true" className={`pulse-dot ${dark ? "text-lime" : "text-brand"}`} />
      {children}
    </p>
  );
}

export function H2({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={`mt-4 text-[1.9rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[2.75rem] ${className}`}
    >
      {children}
    </h2>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
}) {
  const styles = {
    primary: "btn-lime",
    secondary: "btn-ink",
    ghost: "btn-outline",
    light: "btn-lime",
  }[variant];
  return (
    <Link href={href} className={`btn ${styles} ${className}`}>
      {children}
      <ArrowIcon className="h-5 w-5" />
    </Link>
  );
}

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Contenu entièrement généré côté serveur à partir de la configuration.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Notice({
  children,
  tone = "info",
  title,
}: {
  children: React.ReactNode;
  tone?: "info" | "warn";
  title?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 text-[0.95rem] leading-relaxed ${
        tone === "warn" ? "border-ink/15 bg-surface" : "border-brand/20 bg-brand-soft"
      }`}
    >
      {title ? (
        <p className="mb-1 flex items-center gap-2 font-bold">
          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${tone === "warn" ? "bg-ink" : "bg-brand"}`} />
          {title}
        </p>
      ) : null}
      {children}
    </div>
  );
}
