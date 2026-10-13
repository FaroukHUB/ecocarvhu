import Image from "next/image";
import { draftsVisible } from "@/config/env";
import { photoSrc, photos, type PhotoSlot } from "@/config/media";
import { CameraIcon } from "./icons";

/** Une photo est-elle affichée pour cet emplacement (vraie photo, ou cadre en prévisualisation) ? */
export function hasPhotoBlock(slot: PhotoSlot): boolean {
  return Boolean(photoSrc(slot)) || draftsVisible;
}

/**
 * Emplacement photo au format 4:3, cadre identique partout pour un rendu
 * harmonieux. Sans fichier : cadre « photo à venir » en prévisualisation,
 * rien en production.
 */
export function Photo({ slot, className = "" }: { slot: PhotoSlot; className?: string }) {
  const src = photoSrc(slot);
  const frame = `relative aspect-[4/3] w-full overflow-hidden rounded-[28px] shadow-xl ring-1 ring-black/5 ${className}`;

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
  if (!draftsVisible) return null;

  return (
    <div
      className={`${frame} flex flex-col items-center justify-center gap-3 border-2 border-dashed border-brand/40 bg-[repeating-linear-gradient(135deg,#e6f4ea_0_14px,#f4f6f2_14px_28px)] p-6 text-center`}
      role="img"
      aria-label={`Emplacement photo à venir : ${photos[slot].brief}`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand shadow">
        <CameraIcon className="h-7 w-7" />
      </span>
      <p className="font-bold text-ink">Photo à venir</p>
      <p className="max-w-xs text-sm text-ink-3">{photos[slot].brief}</p>
      <p className="text-xs text-muted">
        Fichier : <code>public/{photos[slot].file}.jpg</code>
      </p>
    </div>
  );
}
