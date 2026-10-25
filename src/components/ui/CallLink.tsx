"use client";

import { track } from "@/lib/analytics";

/** Lien `tel:` ou WhatsApp avec mesure du clic (si la mesure est activée). */
export function CallLink({
  href,
  placement,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  placement: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const whatsapp = href.startsWith("https://wa.me/");
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => track(whatsapp ? "whatsapp_click" : "call_click", { placement })}
    >
      {children}
    </a>
  );
}
