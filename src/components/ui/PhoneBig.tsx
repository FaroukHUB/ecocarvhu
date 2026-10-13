import Link from "next/link";
import { company, telHref } from "@/config/company";
import { CallLink } from "./CallLink";

/**
 * Bouton d'appel "3D" : touche en relief (tranche pleine + ombre portée),
 * numéro net, sans effet flou. Utilisable sur fond clair comme sombre.
 * Sans numéro configuré : renvoie vers le formulaire de contact (pas de faux lien).
 */
export function PhoneBig({
  placement,
  size = "lg",
  caption = "Appel direct",
  className = "",
}: {
  placement: string;
  /** @deprecated conservé pour compatibilité : le bouton s'adapte seul au fond. */
  tone?: "dark" | "light";
  size?: "md" | "lg" | "xl";
  caption?: string | null;
  className?: string;
}) {
  const href = telHref();
  if (!href || !company.phone) {
    return (
      <Link href="/contact" className="inline-flex items-center gap-2 btn btn-lime">
        Nous écrire
      </Link>
    );
  }

  const s = {
    md: { pad: "py-2.5 pl-2.5 pr-5 gap-3", icon: "h-11 w-11", svg: "h-5 w-5", num: "text-2xl", cap: "text-[0.65rem]" },
    lg: { pad: "py-3 pl-3 pr-6 gap-3.5", icon: "h-14 w-14", svg: "h-7 w-7", num: "text-[1.75rem] sm:text-[2rem]", cap: "text-xs" },
    xl: { pad: "py-3.5 pl-3.5 pr-7 gap-4", icon: "h-16 w-16", svg: "h-8 w-8", num: "text-[1.9rem] sm:text-[2.6rem]", cap: "text-xs sm:text-sm" },
  }[size];

  return (
    <CallLink href={href} placement={placement} className={`phone-key ${s.pad} ${className}`}>
      <span className={`phone-key__icon ${s.icon}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" className={s.svg} fill="currentColor">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
        </svg>
      </span>
      <span className="flex flex-col items-start leading-none">
        {caption ? <span className={`${s.cap} font-semibold uppercase tracking-[0.14em] text-ink/65`}>{caption}</span> : null}
        <span className={`${s.num} mt-1 whitespace-nowrap font-bold tracking-tight tabular-nums`}>
          {company.phone.value}
        </span>
      </span>
    </CallLink>
  );
}
