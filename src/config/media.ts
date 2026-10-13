import fs from "node:fs";
import path from "node:path";

/**
 * Photos du site. Pour en mettre une en place :
 * 1. déposer le fichier dans `public/` sous le nom indiqué (`.webp`, `.jpg`
 *    ou `.png`) ;
 * 2. compléter son texte alternatif (`alt`) ci-dessous ;
 * 3. reconstruire / pousser : le fichier est détecté au build.
 *
 * Sans fichier : le hero affiche un fond dégradé et une illustration ; les
 * autres emplacements affichent un cadre « photo à venir » en prévisualisation
 * et disparaissent en production (aucune image générique n'est inventée).
 *
 * N'utiliser que des photos réelles de l'entreprise ou des images
 * correctement licenciées, jamais présentées à tort comme des photos maison.
 */

export type PhotoSlot = "hero" | "enlevement" | "acces" | "pieces";

export const photos: Record<PhotoSlot, { file: string; alt: string; brief: string }> = {
  hero: {
    file: "hero",
    alt: "",
    brief: "Dépanneuse plateau chargeant une voiture hors d'usage, format paysage large (≥ 2000 px).",
  },
  enlevement: {
    file: "accueil-enlevement",
    alt: "",
    brief: "Un véhicule hors d'usage en cours de chargement sur un camion plateau (format 4:3).",
  },
  acces: {
    file: "accueil-acces",
    alt: "",
    brief: "Un véhicule immobilisé dans un parking ou une cour, avec son accès visible (format 4:3).",
  },
  pieces: {
    file: "accueil-pieces",
    alt: "",
    brief: "Pièces d'occasion rangées et étiquetées : alternateur, optique, rétroviseur… (format 4:3).",
  },
};

const EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];

/** Chemin public de la photo si le fichier existe, sinon `null`. Lu au build. */
export function photoSrc(slot: PhotoSlot): string | null {
  for (const ext of EXTENSIONS) {
    const name = photos[slot].file + ext;
    if (fs.existsSync(path.join(process.cwd(), "public", name))) return `/${name}`;
  }
  return null;
}

/** Compatibilité avec le hero existant. */
export const heroAlt = photos.hero.alt;
export function heroImageSrc(): string | null {
  return photoSrc("hero");
}
