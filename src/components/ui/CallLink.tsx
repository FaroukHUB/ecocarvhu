"use client";

import { track } from "@/lib/analytics";

/** Lien `tel:` avec mesure du clic (si la mesure est activée). */
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
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => track("call_click", { placement })}
    >
      {children}
    </a>
  );
}
