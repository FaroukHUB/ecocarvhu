/**
 * Illustration SVG animée des secteurs (schématique, sans valeur cartographique) :
 * points lumineux sur les villes et trajets en pointillés qui défilent.
 */
const CITIES = [
  { name: "Marseille", x: 118, y: 196, hub: true },
  { name: "Aubagne", x: 182, y: 178 },
  { name: "Cassis", x: 150, y: 246 },
  { name: "La Ciotat", x: 214, y: 236 },
  { name: "Nice", x: 352, y: 118 },
];

export function ZoneMap({ className = "" }: { className?: string }) {
  const hub = CITIES[0];
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" fill="none">
      <defs>
        <radialGradient id="zm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9fe870" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9fe870" stopOpacity="0" />
        </radialGradient>
        <pattern id="zm-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="#fff" fillOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#zm-dots)" />
      {/* Littoral schématique */}
      <path
        d="M10 215 C 60 205, 90 225, 118 212 S 170 262, 214 250 S 280 200, 320 160 S 370 120, 392 110"
        stroke="#fff"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="2 6"
      />
      <circle cx={hub.x} cy={hub.y} r="70" fill="url(#zm-glow)" />
      {CITIES.slice(1).map((c) => (
        <path
          key={c.name}
          className="flow"
          d={`M${hub.x} ${hub.y} Q ${(hub.x + c.x) / 2} ${Math.min(hub.y, c.y) - 40} ${c.x} ${c.y}`}
          stroke="#9fe870"
          strokeOpacity="0.7"
          strokeWidth="1.6"
          strokeDasharray="4 4"
        />
      ))}
      {CITIES.map((c, i) => (
        <g key={c.name}>
          <circle
            className="ping-svg"
            style={{ animationDelay: `${i * 0.4}s` }}
            cx={c.x}
            cy={c.y}
            r="8"
            fill="#9fe870"
            fillOpacity="0.45"
          />
          <circle cx={c.x} cy={c.y} r={c.hub ? 6 : 4.5} fill="#9fe870" />
          <text
            x={c.x + (c.name === "Nice" || c.hub ? -12 : 10)}
            y={c.hub ? c.y + 4 : c.y - 10}
            textAnchor={c.name === "Nice" || c.hub ? "end" : "start"}
            fill="#fff"
            fillOpacity="0.85"
            fontSize="12"
            fontWeight="600"
          >
            {c.name}
          </text>
        </g>
      ))}
      <text x="392" y="290" textAnchor="end" fill="#fff" fillOpacity="0.35" fontSize="10" letterSpacing="2">
        PROVENCE-ALPES-CÔTE D&apos;AZUR
      </text>
    </svg>
  );
}
