/**
 * Illustration originale (SVG inline, quelques Ko) : dépanneuse plateau et
 * pièces de réemploi. Ce n'est pas une photographie de l'entreprise.
 * Dimensions fixées par viewBox + aspect-ratio : aucun décalage de mise en page.
 */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 420"
      className={`aspect-[4/3] w-full ${className}`}
      role="img"
      aria-labelledby="hero-illu-title"
    >
      <title id="hero-illu-title">
        Illustration : une dépanneuse plateau transporte une voiture, entourée de pièces auto de réemploi
      </title>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3036" />
          <stop offset="1" stopColor="#1b1f23" />
        </linearGradient>
      </defs>
      <rect width="560" height="420" rx="28" fill="url(#sky)" />
      {/* soleil / cercle de marque */}
      <circle cx="430" cy="110" r="64" fill="#17803d" opacity="0.55" />
      <circle cx="430" cy="110" r="38" fill="#3fd17a" opacity="0.35" />
      {/* collines */}
      <path d="M0 300 Q120 230 240 280 T560 260 V420 H0Z" fill="#232a2f" />
      {/* route */}
      <rect x="0" y="330" width="560" height="90" fill="#15191c" />
      <g stroke="#f4c430" strokeWidth="5" strokeDasharray="34 26" opacity="0.8">
        <line x1="0" y1="378" x2="560" y2="378" />
      </g>
      {/* dépanneuse */}
      <g>
        {/* plateau */}
        <rect x="70" y="262" width="300" height="20" rx="4" fill="#3b434b" />
        <rect x="70" y="282" width="300" height="10" fill="#2a3036" />
        {/* cabine */}
        <path d="M370 222 h68 l42 46 v42 h-110z" fill="#17803d" />
        <path d="M384 234 h48 l30 34 h-78z" fill="#bfe9cf" opacity="0.9" />
        <rect x="370" y="290" width="110" height="22" fill="#0f5a2b" />
        <rect x="470" y="282" width="16" height="10" rx="2" fill="#f4c430" />
        {/* roues camion */}
        {[120, 300, 430].map((x) => (
          <g key={x}>
            <circle cx={x} cy="318" r="26" fill="#0d0f11" />
            <circle cx={x} cy="318" r="11" fill="#59626b" />
          </g>
        ))}
        {/* voiture chargée */}
        <path
          d="M96 262 v-30 q0-10 10-12 l40-8 l36-32 q8-6 18-6 h78 q12 0 20 8 l30 36 l22 4 q10 2 10 12 v28z"
          fill="#e8ebe7"
        />
        <path d="M188 196 h86 l26 32 h-142z" fill="#3b434b" />
        <line x1="236" y1="196" x2="236" y2="228" stroke="#e8ebe7" strokeWidth="5" />
        <circle cx="140" cy="262" r="20" fill="#1b1f23" />
        <circle cx="140" cy="262" r="8" fill="#8a949c" />
        <circle cx="300" cy="262" r="20" fill="#1b1f23" />
        <circle cx="300" cy="262" r="8" fill="#8a949c" />
        {/* sangles */}
        <path d="M150 240 l-12 22 M290 240 l12 22" stroke="#f4c430" strokeWidth="4" />
      </g>
      {/* pièces de réemploi */}
      <g transform="translate(470 360)">
        <circle r="30" fill="#2a3036" stroke="#3fd17a" strokeWidth="5" />
        <circle r="10" fill="#3fd17a" />
      </g>
      <g transform="translate(60 60)" fill="none" stroke="#3fd17a" strokeWidth="5" strokeLinecap="round">
        <path d="M0 24 a24 24 0 0 1 40 -18" />
        <path d="M40 -6 l2 14 l-14 -2" />
        <path d="M48 32 a24 24 0 0 1 -40 18" />
        <path d="M8 50 l-2 -14 l14 2" />
      </g>
    </svg>
  );
}
