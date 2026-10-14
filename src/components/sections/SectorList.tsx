import Link from "next/link";
import { departments } from "@/content/sectors/data";
import { isSectorPublished, sectorPath, visibleSectors } from "@/lib/publication";
import { MapPinIcon } from "@/components/ui/icons";

/**
 * Secteurs : seuls les secteurs publiés sont liés en production.
 */
export function SectorList({ tone = "light", featuredOnly = false }: { tone?: "light" | "dark"; featuredOnly?: boolean }) {
  // Listes courtes (accueil, page enlèvement) : secteurs mis en avant seulement ; la page des zones liste tout.
  const shown = visibleSectors().filter((s) => !featuredOnly || s.featured);
  const line =
    tone === "dark"
      ? "border-white/10 bg-white/5 hover:border-lime/50"
      : "border-line bg-white hover:border-brand/40 hover:shadow-[0_16px_30px_-20px_rgb(11_19_16/0.4)]";

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
                  className={`group flex h-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 font-semibold transition duration-300 hover:-translate-y-0.5 ${line}`}
                >
                  <span className="flex items-center gap-2.5">
                    <MapPinIcon className={`h-5 w-5 shrink-0 ${tone === "dark" ? "text-lime" : "text-brand"}`} />
                    {s.name}
                    {s.department ? (
                      <span className={tone === "dark" ? "text-white/60" : "text-muted"}>({s.department.code})</span>
                    ) : null}
                  </span>
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
        <ul className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm ${tone === "dark" ? "text-white/90" : "text-ink-2"}`}>
          {departments.map((d) => (
            <li key={d.code}>
              {d.name} ({d.code})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
