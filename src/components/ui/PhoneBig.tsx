import Link from "next/link";
import { company, telHref } from "@/config/company";
import { CallLink } from "./CallLink";
import { PhoneIcon } from "./icons";

/**
 * Numéro de téléphone en grand, effet relief "3D" (CSS pur).
 * Si aucun numéro n'est configuré, renvoie vers le formulaire (jamais de faux lien).
 */
export function PhoneBig({
  placement,
  tone = "dark",
  size = "lg",
  caption = "Appelez-nous",
}: {
  placement: string;
  tone?: "dark" | "light";
  size?: "md" | "lg" | "xl";
  caption?: string | null;
}) {
  const href = telHref();
  const sizeClass =
    size === "xl"
      ? "text-[2.6rem] sm:text-6xl"
      : size === "lg"
        ? "text-[2.1rem] sm:text-5xl"
        : "text-3xl sm:text-4xl";

  if (!href || !company.phone) {
    return (
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-bold text-white"
      >
        Nous écrire
      </Link>
    );
  }

  return (
    <CallLink
      href={href}
      placement={placement}
      className="group inline-flex flex-col items-start gap-1 no-underline"
    >
      {caption ? (
        <span
          className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider ${
            tone === "dark" ? "text-white/80" : "text-muted"
          }`}
        >
          <PhoneIcon className="h-4 w-4" />
          {caption}
        </span>
      ) : null}
      <span
        className={`phone-3d ${tone === "light" ? "phone-3d--light" : ""} ${sizeClass} whitespace-nowrap`}
      >
        {company.phone.value}
      </span>
    </CallLink>
  );
}
