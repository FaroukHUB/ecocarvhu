/**
 * Illustration SVG animée des secteurs (schématique, sans valeur cartographique) :
 * points lumineux sur les villes et trajets en pointillés qui défilent.
 * Positions approximatives, ajustées pour la lisibilité des noms.
 */
type City = { name: string; x: number; y: number; label: "l" | "r" | "t" | "b"; hub?: boolean; big?: boolean };

const CITIES: City[] = [
  { name: "Aix-en-Provence", x: 128, y: 44, label: "r", big: true },
  { name: "Plan-de-Cuques", x: 142, y: 128, label: "l" },
  { name: "Allauch", x: 178, y: 116, label: "r" },
  { name: "Marseille", x: 98, y: 178, label: "l", hub: true, big: true },
  { name: "La Penne-sur-Huveaune", x: 166, y: 170, label: "t" },
  { name: "Aubagne", x: 204, y: 184, label: "r", big: true },
  { name: "Auriol", x: 252, y: 122, label: "r" },
  { name: "Gémenos", x: 262, y: 172, label: "r" },
  { name: "Carnoux", x: 196, y: 222, label: "l" },
  { name: "Roquefort-la-Bédoule", x: 244, y: 214, label: "r" },
  { name: "Cassis", x: 160, y: 262, label: "l", big: true },
  { name: "Ceyreste", x: 258, y: 252, label: "r" },
  { name: "La Ciotat", x: 226, y: 284, label: "l", big: true },
  { name: "Saint-Cyr-sur-Mer", x: 296, y: 286, label: "b" },
  { name: "Toulon", x: 380, y: 296, label: "t", big: true },
  { name: "Nice", x: 398, y: 38, label: "b", big: true },
];

/** Trajets dessinés : [départ, arrivée]. */
const ROUTES: [string, string][] = [
  ["Marseille", "Aix-en-Provence"],
  ["Marseille", "Plan-de-Cuques"],
  ["Plan-de-Cuques", "Allauch"],
  ["Marseille", "La Penne-sur-Huveaune"],
  ["La Penne-sur-Huveaune", "Aubagne"],
  ["Aubagne", "Gémenos"],
  ["Aubagne", "Auriol"],
  ["Aubagne", "Carnoux"],
  ["Carnoux", "Roquefort-la-Bédoule"],
  ["Marseille", "Cassis"],
  ["Cassis", "La Ciotat"],
  ["La Ciotat", "Ceyreste"],
  ["La Ciotat", "Saint-Cyr-sur-Mer"],
  ["Saint-Cyr-sur-Mer", "Toulon"],
  ["Aix-en-Provence", "Nice"],
];

const byName = Object.fromEntries(CITIES.map((c) => [c.name, c]));

function labelPos(c: City) {
  const d = c.hub ? 12 : 9;
  switch (c.label) {
    case "l":
      return { x: c.x - d, y: c.y + 4, anchor: "end" as const };
    case "r":
      return { x: c.x + d, y: c.y + 4, anchor: "start" as const };
    case "t":
      return { x: c.x, y: c.y - d, anchor: "middle" as const };
    default:
      return { x: c.x, y: c.y + d + 9, anchor: "middle" as const };
  }
}

export function ZoneMap({ className = "" }: { className?: string }) {
  const hub = byName["Marseille"];
  return (
    <svg viewBox="0 0 440 330" className={className} aria-hidden="true" fill="none">
      <defs>
        <radialGradient id="zm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#25d366" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#25d366" stopOpacity="0" />
        </radialGradient>
        <pattern id="zm-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="#fff" fillOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="440" height="330" fill="url(#zm-dots)" />
      {/* Littoral schématique */}
      <path
        d="M8 200 C 50 196, 80 212, 100 200 S 140 268, 170 276 S 210 300, 240 300 S 330 312, 380 310 S 420 300, 436 296"
        stroke="#fff"
        strokeOpacity="0.22"
        strokeWidth="1.5"
        strokeDasharray="2 6"
      />
      <circle cx={hub.x} cy={hub.y} r="80" fill="url(#zm-glow)" />
      {ROUTES.map(([a, b]) => {
        const p = byName[a];
        const q = byName[b];
        const mx = (p.x + q.x) / 2;
        const my = (p.y + q.y) / 2 - Math.min(30, Math.hypot(q.x - p.x, q.y - p.y) / 5);
        return (
          <path
            key={`${a}-${b}`}
            className="flow"
            d={`M${p.x} ${p.y} Q ${mx} ${my} ${q.x} ${q.y}`}
            stroke="#25d366"
            strokeOpacity="0.6"
            strokeWidth="1.4"
            strokeDasharray="4 4"
          />
        );
      })}
      {CITIES.map((c, i) => {
        const l = labelPos(c);
        return (
          <g key={c.name}>
            <circle
              className="ping-svg"
              style={{ animationDelay: `${(i % 6) * 0.4}s` }}
              cx={c.x}
              cy={c.y}
              r={c.big ? 8 : 6}
              fill="#25d366"
              fillOpacity="0.45"
            />
            <circle cx={c.x} cy={c.y} r={c.hub ? 6 : c.big ? 4.5 : 3.5} fill="#25d366" />
            <text
              x={l.x}
              y={l.y}
              textAnchor={l.anchor}
              fill="#fff"
              fillOpacity={c.big ? 0.92 : 0.75}
              fontSize={c.big ? 12.5 : 10.5}
              fontWeight={c.big ? 700 : 500}
            >
              {c.name}
            </text>
          </g>
        );
      })}
      <text x="12" y="320" fill="#fff" fillOpacity="0.35" fontSize="9.5" letterSpacing="2">
        PROVENCE-ALPES-CÔTE D&apos;AZUR
      </text>
    </svg>
  );
}
