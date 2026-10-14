import Link from "next/link";
import { DEPARTMENT_SHAPES, PACA_VIEWBOX, project } from "@/content/paca-map";
import { CITY_COORDS, MAP_LABELS } from "@/content/sectors/coords";
import type { Sector } from "@/content/sectors/types";
import { sectorPath } from "@/lib/publication";

/** Côté du nom pour les villes très entourées. */
const LABEL_SIDE: Record<string, "l" | "r" | "t" | "b"> = { marseille: "l", toulon: "b", cannes: "b", "aix-en-provence": "t", avignon: "l", arles: "l" };

const DEP_NAMES: Record<string, string> = {
  "04": "Alpes-de-Haute-Provence",
  "05": "Hautes-Alpes",
  "06": "Alpes-Maritimes",
  "13": "Bouches-du-Rhône",
  "83": "Var",
  "84": "Vaucluse",
};

/**
 * Carte de Provence-Alpes-Côte d'Azur : départements cliquables (renvoient à
 * leur liste de villes) et villes desservies, avec un point lumineux animé.
 */
export function PacaMap({ cities, className = "" }: { cities: Sector[]; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${PACA_VIEWBOX.width} ${PACA_VIEWBOX.height}`}
      className={`paca-map ${className}`}
      role="img"
      aria-label="Carte de la région Provence-Alpes-Côte d'Azur avec les six départements et les villes desservies"
    >
      <defs>
        <linearGradient id="pm-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#123d2a" />
          <stop offset="100%" stopColor="#0d2a1e" />
        </linearGradient>
        <radialGradient id="pm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#25d366" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#25d366" stopOpacity="0" />
        </radialGradient>
      </defs>

      {DEPARTMENT_SHAPES.map((dep) => (
        <a key={dep.code} href={`#dep-${dep.code}`} aria-label={`${DEP_NAMES[dep.code]} : voir les villes`} className="paca-dep">
          <path d={dep.d} fill="url(#pm-fill)" stroke="#25d366" strokeOpacity="0.35" strokeWidth="2" strokeLinejoin="round" />
          <text
            x={dep.label[0]}
            y={dep.label[1]}
            textAnchor="middle"
            className="paca-dep__code"
            fill="#fff"
            fillOpacity="0.14"
            fontSize="88"
            fontWeight="800"
          >
            {dep.code}
          </text>
        </a>
      ))}

      {cities.map((c, i) => {
        const pos = CITY_COORDS[c.slug];
        if (!pos) return null;
        const [x, y] = project(pos[0], pos[1]);
        const labelled = MAP_LABELS.has(c.slug);
        return (
          <Link key={c.slug} href={sectorPath(c)} aria-label={`Enlèvement d'épave ${c.locative}`} className="paca-city">
            <title>{`Enlèvement d'épave ${c.locative}`}</title>
            {labelled ? <circle cx={x} cy={y} r="34" fill="url(#pm-glow)" /> : null}
            <circle
              className="ping-svg"
              style={{ animationDelay: `${(i % 8) * 0.3}s` }}
              cx={x}
              cy={y}
              r="9"
              fill="#25d366"
              fillOpacity="0.4"
            />
            <circle cx={x} cy={y} r={labelled ? 7 : 5} fill="#25d366" stroke="#0b1310" strokeWidth="2" />
            {!labelled ? (
              <text x={x + 12} y={y + 7} fill="#fff" fontSize="21" fontWeight="600" className="paca-city__label paca-city__label--hover">
                {c.name}
              </text>
            ) : null}
          </Link>
        );
      })}

      {/* Noms des villes principales, au-dessus de tous les points */}
      <g aria-hidden="true" pointerEvents="none">
        {cities.map((c) => {
          const pos = CITY_COORDS[c.slug];
          if (!pos || !MAP_LABELS.has(c.slug)) return null;
          const [x, y] = project(pos[0], pos[1]);
          const side = LABEL_SIDE[c.slug] ?? "r";
          const lx = side === "l" ? x - 14 : side === "r" ? x + 14 : x;
          const ly = side === "b" ? y + 34 : side === "t" ? y - 16 : y + 7;
          const anchor = side === "l" ? "end" : side === "r" ? "start" : "middle";
          return (
            <text key={c.slug} x={lx} y={ly} textAnchor={anchor} fill="#fff" fontSize="23" fontWeight="700" className="paca-city__label">
              {c.name}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
