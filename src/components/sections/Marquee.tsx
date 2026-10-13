/** Bandeau défilant (CSS seul, figé si l'utilisateur limite les animations). */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 text-sm font-semibold uppercase tracking-[0.12em] sm:text-base">
          {t}
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path d="M12 2l2.4 7.6H22l-6.2 4.6 2.4 7.6L12 17.2 5.8 21.8l2.4-7.6L2 9.6h7.6z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-lime py-3.5 text-ink">
      <div className="marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
