import Link from "next/link";
import type { FaqItem } from "@/content/sectors/types";

/**
 * FAQ en <details> natif : accessible au clavier, sans JavaScript.
 * Pas de balisage FAQPage : il n'apporte pas de résultat enrichi garanti.
 */
export function Faq({ items, headingId }: { items: FaqItem[]; headingId?: string }) {
  return (
    <div className="space-y-3" aria-labelledby={headingId}>
      {items.map((item) => (
        <details key={item.q} className="group rounded-2xl bg-paper px-5 py-1 shadow-sm ring-1 ring-black/5 transition open:shadow-md open:ring-brand/30 sm:px-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-[1.05rem] font-bold [&::-webkit-details-marker]:hidden">
            <h3 className="font-bold">{item.q}</h3>
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white transition-transform group-open:rotate-45 group-open:bg-signal group-open:text-ink"
            >
              +
            </span>
          </summary>
          <p className={`leading-relaxed text-ink-3 ${item.link ? "pb-2" : "pb-5"}`}>{item.a}</p>
          {item.link ? (
            <p className="pb-5">
              <Link href={item.link.href} className="font-semibold text-brand underline underline-offset-2">
                {item.link.label}
              </Link>
            </p>
          ) : null}
        </details>
      ))}
    </div>
  );
}
