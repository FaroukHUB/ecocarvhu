/** Demandes : types, statuts et mise en forme pour l'espace de gestion. */

export const STATUSES = ["nouvelle", "a_rappeler", "rdv_fixe", "enlevee", "terminee", "perdue"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_INFO: Record<Status, { label: string; emoji: string; tone: string; dot: string }> = {
  nouvelle: { label: "Nouvelle", emoji: "🆕", tone: "bg-emerald-100 text-emerald-900 ring-emerald-300", dot: "bg-emerald-500" },
  a_rappeler: { label: "À rappeler", emoji: "📞", tone: "bg-amber-100 text-amber-900 ring-amber-300", dot: "bg-amber-500" },
  rdv_fixe: { label: "RDV fixé", emoji: "📅", tone: "bg-sky-100 text-sky-900 ring-sky-300", dot: "bg-sky-500" },
  enlevee: { label: "Enlevée", emoji: "🚛", tone: "bg-violet-100 text-violet-900 ring-violet-300", dot: "bg-violet-500" },
  terminee: { label: "Terminée", emoji: "✅", tone: "bg-lime-100 text-lime-900 ring-lime-300", dot: "bg-lime-600" },
  perdue: { label: "Perdue", emoji: "✖️", tone: "bg-stone-200 text-stone-700 ring-stone-300", dot: "bg-stone-400" },
};

export const FORM_INFO: Record<string, { label: string; emoji: string }> = {
  enlevement: { label: "Enlèvement", emoji: "🚗" },
  rachat: { label: "Rachat", emoji: "💶" },
  piece: { label: "Pièce", emoji: "⚙️" },
  pro: { label: "Professionnel", emoji: "🏢" },
  contact: { label: "Contact", emoji: "✉️" },
};

export interface Demande {
  id: string;
  numero: number;
  created_at: string;
  updated_at: string;
  origine: "site" | "manuelle";
  form_type: string;
  status: Status;
  source_page: string | null;
  sector: string | null;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  postal_code: string | null;
  city: string | null;
  address: string | null;
  brand: string | null;
  model: string | null;
  year: string | null;
  plate: string | null;
  data: Record<string, string>;
  notes: string;
  rdv_at: string | null;
  lost_reason: string | null;
  chauffeur_id: string | null;
  pro_id: string | null;
  enleve_at: string | null;
  centre_remis_at: string | null;
  cd_recu_at: string | null;
  cd_envoye_at: string | null;
  documents: Record<string, boolean>;
  signataire: string | null;
}

/** Pièces récupérées au moment de l'enlèvement. */
export const DOCUMENTS = [
  { key: "carte_grise", label: "Carte grise barrée et signée" },
  { key: "cerfa", label: "Certificat de cession (cerfa 15776)" },
  { key: "csa", label: "Certificat de situation administrative" },
  { key: "piece_identite", label: "Copie de la pièce d'identité" },
  { key: "cles", label: "Clés du véhicule" },
] as const;

/** Étapes du suivi avec le centre VHU, dans l'ordre. */
export const CENTRE_STEPS = [
  { key: "centre_remis_at", label: "Remis au centre VHU", emoji: "♻️" },
  { key: "cd_recu_at", label: "Certificat de destruction reçu", emoji: "📄" },
  { key: "cd_envoye_at", label: "Certificat envoyé au client", emoji: "📨" },
] as const;
export type CentreStep = (typeof CENTRE_STEPS)[number]["key"];

export const PHOTO_KINDS: Record<string, string> = {
  client: "Photo envoyée par le client",
  enlevement: "Photo prise à l'enlèvement",
  signature: "Signature du client",
  document: "Document",
};

/** Jour (AAAA-MM-JJ) d'une date en heure de Paris. */
export function parisDay(iso: string | Date): string {
  return new Date(iso).toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" });
}

export function isStatus(v: unknown): v is Status {
  return typeof v === "string" && (STATUSES as readonly string[]).includes(v);
}

export const vehicleLabel = (d: Pick<Demande, "brand" | "model" | "year">) =>
  [d.brand, d.model, d.year].filter(Boolean).join(" ") || "Véhicule non précisé";

export const placeLabel = (d: Pick<Demande, "postal_code" | "city">) =>
  [d.postal_code, d.city].filter(Boolean).join(" ") || "Lieu non précisé";

const TZ = "Europe/Paris";

export function formatDate(iso: string, withTime = true): string {
  return new Date(iso).toLocaleString("fr-FR", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export function ago(iso: string, now = Date.now()): string {
  const min = Math.round((now - new Date(iso).getTime()) / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.round(h / 24);
  return `il y a ${d} jour${d > 1 ? "s" : ""}`;
}

/** Valeur pour un champ <input type="datetime-local"> en heure de Paris. */
export function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
  return parts.replace(" ", "T");
}

/** Convertit une saisie datetime-local (heure de Paris) en ISO UTC. */
export function fromLocalInput(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  const asUtc = new Date(`${value}:00Z`);
  const parisAsUtc = new Date(asUtc.toLocaleString("en-US", { timeZone: TZ }));
  const offset = parisAsUtc.getTime() - new Date(asUtc.toLocaleString("en-US", { timeZone: "UTC" })).getTime();
  return new Date(asUtc.getTime() - offset).toISOString();
}

/** Remplace {prenom}, {nom}, {ville}, {vehicule}, {date_rdv} dans un message type. */
export function fillTemplate(body: string, d: Demande): string {
  const name = (d.contact_name ?? "").trim();
  return body
    .replaceAll("{prenom}", name.split(/\s+/)[0] || "")
    .replaceAll("{nom}", name)
    .replaceAll("{ville}", d.city ?? "")
    .replaceAll("{vehicule}", [d.brand, d.model].filter(Boolean).join(" ") || "véhicule")
    .replaceAll("{date_rdv}", d.rdv_at ? formatDate(d.rdv_at) : "(date à définir)")
    .replace(/ {2,}/g, " ");
}

/** Numéro au format international pour wa.me (France par défaut). */
export function whatsappNumber(phone: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits.slice(1);
  if (/^0\d{9}$/.test(digits)) return `33${digits.slice(1)}`;
  return digits || null;
}

/** Heure actuelle (composants serveur, rendus à chaque requête). */
export function currentTime(): number {
  return Date.now();
}
