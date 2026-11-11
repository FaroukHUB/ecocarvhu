/**
 * Héros « vol de drone » de l'accueil : séquences d'images (une par format)
 * jouées au défilement dans un <canvas>.
 *
 * Les images sont dans `public/hero-drone/<format>/000.webp`, `001.webp`…
 * Elles proviennent de deux vidéos générées par IA (Kling 3 Pro via
 * ElevenLabs, novembre 2026) : départ d'une vue aérienne de Marseille,
 * arrivée sur la photo du hero (`hero-desktop` / `hero-mobile`).
 * Ce sont des images d'illustration, pas des prises de vue de l'entreprise.
 *
 * Pour remplacer la séquence : extraire les images de la nouvelle vidéo
 * (une image sur deux, WebP), mettre à jour `frames`, `width` et `height`.
 */
export const droneHero = {
  desktop: {
    dir: "/hero-drone/desktop",
    frames: 61,
    width: 1024,
    height: 576,
    poster: "/hero-drone/poster-desktop.webp",
    posterWidth: 1920,
    posterHeight: 1080,
  },
  mobile: {
    dir: "/hero-drone/mobile",
    frames: 61,
    width: 576,
    height: 1024,
    poster: "/hero-drone/poster-mobile.webp",
    posterWidth: 1080,
    posterHeight: 1920,
  },
  posterAlt:
    "Vue aérienne de Marseille, du Vieux-Port et de Notre-Dame de la Garde, avec une dépanneuse plateau sur la route en contrebas",
} as const;

export type DroneFormat = keyof Pick<typeof droneHero, "desktop" | "mobile">;
