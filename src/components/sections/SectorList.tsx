import Link from "next/link";
import { departments } from "@/content/sectors/data";
import { isSectorPublished, sectorPath, visibleSectors } from "@/lib/publication";
import { MapPinIcon } from "@/components/ui/icons";

/**
 * Secteurs : seuls les secteurs publiés sont liés en production. Hors
 * production, les brouillons apparaissent avec un badge pour la recette.
 * Monaco (État distinct) n'est jamais mélangé aux secteurs de PACA.
 */
export function SectorList({ tone = "light" }: { tone?: "light" | "dark" }) {
  const shown = visibleSectors().filter((s) => s.kind !== "foreign-state");
  const card =
    tone === "dark" ? "bg-white/5 ring-1 ring-white/10 hover:ring-brand-bright" : "bg-paper ring-1 ring-line hover:ring-brand";

  return (
    <div className="space-y-6">
      {shown.length ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => {
            const published = isSectorPublished(s.status);
            return (
              <li key={s.slug}>
                <Link
                  href={sectorPath(s)}
                  className={`flex h-full items-center justify-between gap-3 rounded-xl px-4 py-3.5 font-semibold transition ${card}`}
                >
                  <span className="flex items-center gap-2.5">
                    <MapPinIcon className="h-5 w-5 shrink-0 text-brand-bright" />
                    {s.name}
                    {s.department ? (
                      <span className={tone === "dark" ? "text-white/60" : "text-muted"}>({s.department.code})</span>
                    ) : null}
                  </span>
                  {!published ? (
                    <span className="rounded bg-signal px-1.5 py-0.5 text-[0.7rem] font-bold uppercase text-ink">
                      Brouillon
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
      <div>
        <p className={`text-sm font-semibold ${tone === "dark" ? "text-white/80" : "text-ink-3"}`}>
          Départements de la zone visée (faisabilité confirmée pour chaque demande) :
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {departments.map((d) => (
            <li
              key={d.code}
              className={`rounded-full px-3 py-1 text-sm ${tone === "dark" ? "bg-white/10 text-white/90" : "bg-surface text-ink-2"}`}
            >
              {d.name} ({d.code})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
