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
  tone?: "paper" | "surface" | "ink";
  id?: string;
  labelledBy?: string;
}) {
  const toneClass =
    tone === "surface" ? "bg-surface" : tone === "ink" ? "bg-ink text-white" : "bg-paper";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${toneClass} py-14 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "light" }) {
  return (
    <p
      className={`text-sm font-bold uppercase tracking-[0.12em] ${
        tone === "light" ? "text-brand-bright" : "text-brand"
      }`}
    >
      {children}
    </p>
  );
}

export function H2({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`mt-2 text-[1.75rem] font-extrabold leading-tight tracking-tight sm:text-4xl ${className}`}>
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
    primary: "bg-brand text-white shadow-[0_4px_0_var(--color-brand-deep)] hover:bg-brand-dark",
    secondary: "bg-ink text-white shadow-[0_4px_0_#000] hover:bg-ink-2",
    ghost: "border-2 border-ink/15 bg-paper text-ink hover:border-brand hover:text-brand",
    light: "bg-white text-ink shadow-[0_4px_0_rgb(0_0_0/0.35)] hover:bg-brand-soft",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold transition-colors active:translate-y-0.5 ${styles} ${className}`}
    >
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
      className={`rounded-xl border-l-4 p-4 text-[0.95rem] leading-relaxed ${
        tone === "warn" ? "border-signal bg-warn-soft" : "border-brand bg-brand-soft"
      }`}
    >
      {title ? <p className="mb-1 font-bold">{title}</p> : null}
      {children}
    </div>
  );
}
