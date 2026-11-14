/** Outils du registre : mois au format AAAA-MM, en heure de Paris (approximation : bornes à minuit UTC). */

export function monthBounds(mois: string): [string, string] {
  const [y, m] = mois.split("-").map(Number);
  const from = new Date(Date.UTC(y, m - 1, 1)).toISOString();
  const to = new Date(Date.UTC(y, m, 1)).toISOString();
  return [from, to];
}

export function shiftMonth(mois: string, n: number): string {
  const [y, m] = mois.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return d.toISOString().slice(0, 7);
}

export function monthLabel(mois: string): string {
  const [y, m] = mois.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString("fr-FR", { timeZone: "UTC", month: "long", year: "numeric" });
}

/** Une cellule CSV (séparateur point-virgule, lu par Excel en français). */
export function csvCell(v: unknown): string {
  const s = v == null ? "" : String(v);
  return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
