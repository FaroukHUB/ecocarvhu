import Link from "next/link";
import { company } from "@/config/company";
import { PhoneBig } from "@/components/ui/PhoneBig";
import { PartnerCentreCard } from "@/components/sections/PartnerCentreCard";
import { Logo } from "./Logo";
import { footerNav } from "./nav";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo tone="light" size="footer" />
          <p className="max-w-sm text-sm leading-relaxed text-white/75">
            Enlèvement de véhicules hors d&apos;usage, pièces auto d&apos;occasion et étude de rachat en
            Provence-Alpes-Côte d&apos;Azur. Chaque demande est confirmée par l&apos;équipe avant tout
            déplacement.
          </p>
          <PhoneBig placement="footer" size="md" caption="Une question ? Appelez" />
          <PartnerCentreCard variant="compact" />
        </div>
        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 hover:text-brand-bright hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 pb-24 text-xs text-white/60 sm:pb-5">
          {company.brandName}
          {company.brandIsProvisional ? " (nom de marque provisoire)" : ""}
          {company.legalName ? ` — ${company.legalName}` : ""}.
        </p>
      </div>
    </footer>
  );
}
