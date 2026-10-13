import fs from "node:fs";
import path from "node:path";

/**
 * Image du hero de l'accueil.
 *
 * Pour la mettre en place : déposer UNE image dans `public/` sous le nom
 * `hero.jpg`, `hero.webp` ou `hero.png` (idéalement ≥ 2000 px de large,
 * paysage, < 400 Ko après compression), puis renseigner `heroAlt`.
 * Sans fichier, le hero affiche un fond dégradé (aucune image générique).
 *
 * Rappel : n'utiliser que des photos réelles de l'entreprise ou des images
 * correctement licenciées, jamais présentées à tort comme des photos maison.
 */
export const heroAlt = "";

const CANDIDATES = ["hero.webp", "hero.jpg", "hero.jpeg", "hero.png"];

/** Lu au build : le fichier présent dans public/ est utilisé automatiquement. */
export function heroImageSrc(): string | null {
  for (const name of CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", name))) return `/${name}`;
  }
  return null;
}
