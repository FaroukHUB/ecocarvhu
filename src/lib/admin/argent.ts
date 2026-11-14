/** Argent et clients pros : types, libellés, calculs. */

export interface Company {
  legal_name: string;
  legal_form: string;
  siret: string;
  rcs: string;
  capital: string;
  tva_number: string;
  tva_franchise: boolean;
  address: string;
  postal_code: string;
  city: string;
  phone: string;
  email: string;
  iban: string;
  bic: string;
  payment_days: number;
  legal_footer: string;
}

export const companyReady = (c: Pick<Company, "legal_name" | "siret" | "address"> | null) =>
  Boolean(c?.legal_name && c.siret && c.address);

export interface Pro {
  id: string;
  created_at: string;
  name: string;
  kind: string;
  status: "prospect" | "client" | "inactif";
  source: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  siret: string | null;
  notes: string;
  last_contact_at: string | null;
}

export const PRO_KINDS: Record<string, { label: string; emoji: string }> = {
  garage: { label: "Garage", emoji: "🔧" },
  concession: { label: "Concession", emoji: "🏬" },
  flotte: { label: "Flotte d'entreprise", emoji: "🚐" },
  syndic: { label: "Syndic / bailleur", emoji: "🏢" },
  assurance: { label: "Assurance / expert", emoji: "🛡️" },
  fourriere: { label: "Fourrière / collectivité", emoji: "🏛️" },
  autre: { label: "Autre", emoji: "📌" },
};

export const PRO_STATUS: Record<Pro["status"], { label: string; tone: string }> = {
  prospect: { label: "Prospect", tone: "bg-sky-100 text-sky-900 ring-sky-300" },
  client: { label: "Client", tone: "bg-emerald-100 text-emerald-900 ring-emerald-300" },
  inactif: { label: "Inactif", tone: "bg-stone-200 text-stone-700 ring-stone-300" },
};

export interface Rachat {
  id: string;
  created_at: string;
  demande_id: string | null;
  vehicle: string;
  status: "estimation" | "propose" | "accepte" | "achete" | "revendu" | "refuse";
  prix_propose: number | null;
  prix_achat: number | null;
  frais: number;
  revente_pieces: number;
  revente_metal: number;
  achete_le: string | null;
  notes: string;
}

export const RACHAT_STATUS: Record<Rachat["status"], { label: string; emoji: string; tone: string }> = {
  estimation: { label: "À estimer", emoji: "🔍", tone: "bg-sky-100 text-sky-900 ring-sky-300" },
  propose: { label: "Prix proposé", emoji: "💬", tone: "bg-amber-100 text-amber-900 ring-amber-300" },
  accepte: { label: "Accepté", emoji: "🤝", tone: "bg-violet-100 text-violet-900 ring-violet-300" },
  achete: { label: "Acheté", emoji: "🚗", tone: "bg-emerald-100 text-emerald-900 ring-emerald-300" },
  revendu: { label: "Revendu", emoji: "💰", tone: "bg-lime-100 text-lime-900 ring-lime-300" },
  refuse: { label: "Refusé", emoji: "✖️", tone: "bg-stone-200 text-stone-700 ring-stone-300" },
};

/** Marge d'un rachat : reventes moins prix d'achat et frais. */
export function marge(r: Pick<Rachat, "prix_achat" | "frais" | "revente_pieces" | "revente_metal">): number {
  return Number(r.revente_pieces || 0) + Number(r.revente_metal || 0) - Number(r.prix_achat || 0) - Number(r.frais || 0);
}

export interface Line {
  label: string;
  qty: number;
  unit_ht: number;
  tva: number;
}

export interface Facture {
  id: string;
  created_at: string;
  kind: "devis" | "facture";
  numero: string | null;
  status: "brouillon" | "emis" | "accepte" | "refuse" | "paye" | "annule";
  issued_at: string | null;
  due_at: string | null;
  paid_at: string | null;
  pro_id: string | null;
  demande_id: string | null;
  devis_id: string | null;
  client_name: string;
  client_address: string;
  client_email: string;
  client_siret: string;
  lines: Line[];
  total_ht: number;
  total_tva: number;
  total_ttc: number;
  notes: string;
  seller: Company | null;
}

export const DOC_STATUS: Record<Facture["status"], { label: string; tone: string }> = {
  brouillon: { label: "Brouillon", tone: "bg-stone-200 text-stone-700 ring-stone-300" },
  emis: { label: "Émis", tone: "bg-sky-100 text-sky-900 ring-sky-300" },
  accepte: { label: "Accepté", tone: "bg-violet-100 text-violet-900 ring-violet-300" },
  refuse: { label: "Refusé", tone: "bg-red-100 text-red-900 ring-red-300" },
  paye: { label: "Payée", tone: "bg-emerald-100 text-emerald-900 ring-emerald-300" },
  annule: { label: "Annulé", tone: "bg-stone-200 text-stone-700 ring-stone-300" },
};

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Nettoie les lignes saisies et calcule les totaux (arrondis au centime par ligne). */
export function computeTotals(raw: unknown): { lines: Line[]; total_ht: number; total_tva: number; total_ttc: number } {
  const list = Array.isArray(raw) ? raw : [];
  const lines: Line[] = list
    .map((l) => ({
      label: String(l?.label ?? "").trim().slice(0, 300),
      qty: Number(l?.qty) || 0,
      unit_ht: round2(Number(l?.unit_ht) || 0),
      tva: [0, 5.5, 10, 20].includes(Number(l?.tva)) ? Number(l.tva) : 20,
    }))
    .filter((l) => l.label && l.qty)
    .slice(0, 50);
  let ht = 0;
  let tva = 0;
  for (const l of lines) {
    const lineHt = round2(l.qty * l.unit_ht);
    ht += lineHt;
    tva += round2((lineHt * l.tva) / 100);
  }
  return { lines, total_ht: round2(ht), total_tva: round2(tva), total_ttc: round2(ht + tva) };
}

export const euro = (n: number | null | undefined) =>
  n == null ? "—" : Number(n).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

/** Montant saisi (« 1 200,50 ») → nombre, ou null si vide. */
export function parseAmount(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? "").replace(/\s/g, "").replace(",", ".");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
}
