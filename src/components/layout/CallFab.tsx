"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Bouton d'appel flottant, en bas à droite, mobile uniquement.
 * Il se retire pendant la saisie dans un formulaire pour ne masquer ni champ
 * ni clavier, et réapparaît ensuite.
 */
export function CallFab({ href, label }: { href: string; label: string }) {
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches("input, textarea, select");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  return (
    <a
      href={href}
      aria-label={label}
      onClick={() => track("call_click", { placement: "floating-button" })}
      className={`call-fab call-fab__ring fixed bottom-5 right-4 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-lime text-ink transition-[opacity,transform] duration-200 sm:hidden ${
        typing ? "pointer-events-none translate-y-24 opacity-0" : "opacity-100"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
      </svg>
    </a>
  );
}
