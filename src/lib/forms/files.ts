/**
 * Contrôle des fichiers joints : type réel (signature binaire, pas seulement
 * l'extension ou le type annoncé par le navigateur), taille par fichier et
 * taille totale.
 *
 * Seules des photos sont acceptées : aucune pièce d'identité ni carte grise
 * n'est demandée par le formulaire.
 */

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"] as const;
export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

export interface FileLimits {
  maxFileBytes: number;
  maxTotalBytes: number;
}

/**
 * Limites par défaut compatibles avec les hébergeurs qui plafonnent le corps
 * des requêtes à ~4,5 Mo (ex. fonctions Vercel). Les photos sont réduites
 * dans le navigateur avant l'envoi. Configurables par variables d'environnement.
 */
export function resolveFileLimits(env: Record<string, string | undefined> = process.env): FileLimits {
  const mb = (v: string | undefined, fallback: number) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  };
  return {
    maxFileBytes: Math.round(mb(env.FORM_MAX_FILE_MB, 3) * 1024 * 1024),
    maxTotalBytes: Math.round(mb(env.FORM_MAX_TOTAL_MB, 4) * 1024 * 1024),
  };
}

/** Détecte le type réel à partir des premiers octets. */
export function sniffImageType(bytes: Uint8Array): AllowedImageType | null {
  if (bytes.length < 12) return null;
  // JPEG : FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  // PNG : 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  )
    return "image/png";
  // WEBP : "RIFF" .... "WEBP"
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  )
    return "image/webp";
  // HEIC/HEIF : boîte "ftyp" puis marque heic/heix/mif1/msf1/heim/heis/hevc
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) {
    const brand = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]);
    if (["heic", "heix", "heim", "heis", "hevc", "hevx", "mif1", "msf1"].includes(brand)) return "image/heic";
  }
  return null;
}

export interface CheckedFile {
  filename: string;
  contentType: AllowedImageType;
  size: number;
  content: Uint8Array;
}

export type FileCheckResult =
  | { ok: true; files: CheckedFile[] }
  | { ok: false; message: string };

const EXT: Record<AllowedImageType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
};

export async function checkFiles(
  entries: FormDataEntryValue[],
  opts: { maxFiles: number; limits: FileLimits },
): Promise<FileCheckResult> {
  const files = entries.filter((e): e is File => typeof e !== "string" && e.size > 0);
  if (files.length > opts.maxFiles) {
    return { ok: false, message: `${opts.maxFiles} photos maximum.` };
  }
  let total = 0;
  const out: CheckedFile[] = [];
  for (const [i, file] of files.entries()) {
    if (file.size > opts.limits.maxFileBytes) {
      return {
        ok: false,
        message: `La photo « ${safeName(file.name)} » est trop lourde (${formatMb(opts.limits.maxFileBytes)} maximum par photo).`,
      };
    }
    total += file.size;
    if (total > opts.limits.maxTotalBytes) {
      return {
        ok: false,
        message: `L'ensemble des photos dépasse ${formatMb(opts.limits.maxTotalBytes)}. Retirez une photo ou envoyez-en moins.`,
      };
    }
    const content = new Uint8Array(await file.arrayBuffer());
    const type = sniffImageType(content);
    if (!type) {
      return {
        ok: false,
        message: `Le fichier « ${safeName(file.name)} » n'est pas une photo acceptée (JPEG, PNG, WebP ou HEIC).`,
      };
    }
    out.push({ filename: `photo-${i + 1}.${EXT[type]}`, contentType: type, size: file.size, content });
  }
  return { ok: true, files: out };
}

function safeName(name: string): string {
  return name.replace(/[^\p{L}\p{N}._ -]/gu, "").slice(0, 60) || "sans nom";
}

export function formatMb(bytes: number): string {
  const v = bytes / (1024 * 1024);
  return `${v.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo`;
}
