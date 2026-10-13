import Image from "next/image";
import Link from "next/link";

/**
 * Logo EcocarVHU (fichier fourni par le porteur de projet : public/logo-ecocarvhu.png).
 * Le logo a un fond blanc : sur fond sombre il est posé sur une pastille blanche.
 */
export function Logo({ tone = "dark", size = "header" }: { tone?: "dark" | "light"; size?: "header" | "footer" }) {
  const img = size === "footer" ? "h-24 w-24" : "h-14 w-14";
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 font-bold tracking-tight no-underline"
      aria-label="EcocarVHU, retour à l'accueil"
    >
      <span className={`shrink-0 overflow-hidden ${tone === "light" ? "rounded-2xl bg-white p-1.5" : ""}`}>
        <Image
          src="/logo-ecocarvhu.png"
          alt=""
          width={512}
          height={512}
          sizes={size === "footer" ? "96px" : "56px"}
          priority={size === "header"}
          className={img}
        />
      </span>
      <span
        className={`leading-none ${size === "footer" ? "text-2xl" : "hidden text-xl sm:inline"} ${
          tone === "dark" ? "text-ink" : "text-white"
        }`}
      >
        Ecocar<span className={tone === "dark" ? "text-brand" : "text-brand-bright"}>VHU</span>
      </span>
    </Link>
  );
}
