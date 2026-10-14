import Image from "next/image";
import { photoSrc, photos, type PhotoSlot } from "@/config/media";

/** Une photo est-elle affichée pour cet emplacement (vraie photo, ou cadre en prévisualisation) ? */
export function hasPhotoBlock(slot: PhotoSlot): boolean {
  return Boolean(photoSrc(slot));
}

/**
 * Emplacement photo au format 4:3, cadre identique partout pour un rendu
 * harmonieux. Sans fichier : cadre « photo à venir » en prévisualisation,
 * rien en production.
 */
export function Photo({ slot, className = "", flush = false }: { slot: PhotoSlot; className?: string; flush?: boolean }) {
  const src = photoSrc(slot);
  const frame = `relative aspect-[4/3] w-full overflow-hidden ${flush ? "" : "rounded-3xl"} ${className}`;

  if (src) {
    return (
      <div className={frame}>
        <Image src={src} alt={photos[slot].alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        {photos[slot].illustrative ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.7rem] font-semibold text-white">
            Photo d&apos;illustration
          </span>
        ) : null}
      </div>
    );
  }
  return null;
}
