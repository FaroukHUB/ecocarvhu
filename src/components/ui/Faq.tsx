import type { FaqItem } from "@/content/sectors/types";

/**
 * FAQ en <details> natif : accessible au clavier, sans JavaScript.
 * Pas de balisage FAQPage : il n'apporte pas de résultat enrichi garanti.
 */
export function Faq({ items, headingId }: { items: FaqItem[]; headingId?: string }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-paper" aria-labelledby={headingId}>
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-1 sm:px-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-[1.05rem] font-bold [&::-webkit-details-marker]:hidden">
            <h3 className="font-bold">{item.q}</h3>
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-brand transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-5 leading-relaxed text-ink-3">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
