import Link from "next/link";

/** Logo provisoire : pictogramme "flèche de réemploi + roue" et mot-symbole. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 font-extrabold tracking-tight no-underline"
      aria-label="EcocarVHU, retour à l'accueil"
    >
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="10" fill="#17803d" />
        <circle cx="20" cy="21" r="9" fill="none" stroke="#fff" strokeWidth="3.2" />
        <circle cx="20" cy="21" r="3" fill="#fff" />
        <path d="M11 9.5h12l-3.2-3.2M29 9.5" stroke="#3fd17a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`text-xl leading-none ${tone === "dark" ? "text-ink" : "text-white"}`}>
        Ecocar<span className={tone === "dark" ? "text-brand" : "text-brand-bright"}>VHU</span>
      </span>
    </Link>
  );
}
