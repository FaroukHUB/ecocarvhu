import Link from "next/link";
import { company, telHref } from "@/config/company";
import { CallLink } from "@/components/ui/CallLink";
import { PhoneIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { mainNav } from "./nav";

export function Header() {
  const tel = telHref();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[0.95rem] font-semibold text-ink-2 hover:bg-surface hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {tel && company.phone ? (
            <CallLink
              href={tel}
              placement="header"
              ariaLabel={`Appeler le ${company.phone.value}`}
              className="hidden items-center gap-2 rounded-xl bg-ink px-3.5 py-2 sm:inline-flex"
            >
              <PhoneIcon className="h-5 w-5 text-brand-bright" />
              <span className="phone-3d phone-3d--sm text-xl">{company.phone.value}</span>
            </CallLink>
          ) : null}
          <MobileNav items={mainNav} />
        </div>
      </div>
    </header>
  );
}

/** Bandeau téléphone sous l'en-tête, visible sur mobile (le numéro est vu dès l'arrivée). */
export function PhoneStrip() {
  const tel = telHref();
  if (!tel || !company.phone) return null;
  return (
    <div className="bg-ink sm:hidden">
      <CallLink
        href={tel}
        placement="phone-strip"
        ariaLabel={`Appeler le ${company.phone.value}`}
        className="flex items-center justify-center gap-3 px-4 py-3"
      >
        <PhoneIcon className="h-6 w-6 text-brand-bright" />
        <span className="phone-3d text-[1.9rem]">{company.phone.value}</span>
      </CallLink>
    </div>
  );
}
