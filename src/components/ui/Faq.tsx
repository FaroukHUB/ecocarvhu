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
        <details key={item.q} className="group rounded-2xl border border-line bg-white px-5 transition-colors open:border-brand/40 hover:border-ink/25 sm:px-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-[1.02rem] font-semibold [&::-webkit-details-marker]:hidden">
            <h3 className="font-semibold tracking-tight">{item.q}</h3>
            <span
              aria-hidden="true"
              className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-lg leading-none text-lime transition-transform duration-300 group-open:rotate-45 group-open:bg-lime group-open:text-ink"
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
