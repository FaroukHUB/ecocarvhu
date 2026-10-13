/**
 * Limitation de débit "au mieux", en mémoire de l'instance serveur.
 * Elle freine les envois répétés mais n'est PAS partagée entre instances
 * (hébergement serverless) : en production, compléter par la protection de
 * l'hébergeur (pare-feu, règles de débit) ou un captcha respectueux de la vie
 * privée. Aucune donnée n'est conservée au-delà de la fenêtre.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

export function checkRateLimit(key: string, now: number = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return true;
}
