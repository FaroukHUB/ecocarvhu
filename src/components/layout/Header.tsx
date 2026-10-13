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
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4">
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
              className="phone-key gap-2 px-3 py-2 sm:gap-2.5 sm:py-1.5 sm:pl-1.5 sm:pr-4"
            >
              <span className="phone-key__icon hidden h-8 w-8 sm:inline-flex" aria-hidden="true">
                <PhoneIcon className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap text-[0.9rem] font-extrabold tabular-nums sm:text-lg">
                {company.phone.value}
              </span>
            </CallLink>
          ) : null}
          <MobileNav items={mainNav} />
        </div>
      </div>
    </header>
  );
}
