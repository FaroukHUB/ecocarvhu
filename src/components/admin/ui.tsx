import Link from "next/link";
import { STATUS_INFO, type Status } from "@/lib/admin/demandes";

/** Petits éléments d'interface partagés par les pages de gestion. */

export function PageTitle({ emoji, title, subtitle, action }: { emoji: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm" aria-hidden="true">
            {emoji}
          </span>
          {title}
        </h1>
        {subtitle ? <p className="mt-2 text-muted">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Card({ title, emoji, className = "", children }: { title?: string; emoji?: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={`rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      {title ? (
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
          {emoji ? <span aria-hidden="true">{emoji}</span> : null}
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  const s = STATUS_INFO[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${s.tone}`}>
      <span aria-hidden="true">{s.emoji}</span>
      {s.label}
    </span>
  );
}

export function BigButton({ href, emoji, children, tone = "brand" }: { href: string; emoji: string; children: React.ReactNode; tone?: "brand" | "light" }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-sm transition hover:-translate-y-0.5 ${
        tone === "brand" ? "bg-brand-bright text-ink" : "border border-line bg-white text-ink"
      }`}
    >
      <span aria-hidden="true">{emoji}</span>
      {children}
    </Link>
  );
}

export const inputClass =
  "block w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-base focus:border-brand focus:outline-none focus:ring-4 focus:ring-lime/40";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold transition hover:-translate-y-0.5 disabled:opacity-50";
export const buttonClass = `${buttonBase} bg-ink text-white hover:bg-ink-2`;
export const greenButtonClass = `${buttonBase} bg-brand-bright text-ink shadow-sm hover:brightness-95`;
