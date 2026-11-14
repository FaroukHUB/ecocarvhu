import type { Pro } from "@/lib/admin/argent";

export type Stage = "a_contacter" | "pret" | "envoye" | "relance" | "repondu" | "gagne" | "refus" | "desinscrit";

export interface Prospect extends Pro {
  siren: string | null;
  naf: string | null;
  naf_label: string | null;
  effectif: string | null;
  dirigeant: string | null;
  website: string | null;
  stage: Stage;
  unsubscribe_token: string;
}

export interface ProspectEmail {
  id: string;
  pro_id: string;
  step: number;
  subject: string;
  body: string;
  status: "brouillon" | "planifie" | "envoye" | "annule" | "erreur";
  scheduled_at: string | null;
  sent_at: string | null;
  error: string | null;
}

export const STAGES: Record<Stage, { label: string; emoji: string; tone: string }> = {
  a_contacter: { label: "À contacter", emoji: "📋", tone: "bg-stone-100 text-stone-800 ring-stone-300" },
  pret: { label: "E-mails prêts", emoji: "✍️", tone: "bg-sky-100 text-sky-900 ring-sky-300" },
  envoye: { label: "Premier e-mail envoyé", emoji: "📨", tone: "bg-indigo-100 text-indigo-900 ring-indigo-300" },
  relance: { label: "Relancé", emoji: "🔁", tone: "bg-violet-100 text-violet-900 ring-violet-300" },
  repondu: { label: "A répondu", emoji: "💬", tone: "bg-amber-100 text-amber-950 ring-amber-300" },
  gagne: { label: "Client gagné", emoji: "🏆", tone: "bg-emerald-100 text-emerald-900 ring-emerald-300" },
  refus: { label: "Pas intéressé", emoji: "🙅", tone: "bg-stone-200 text-stone-700 ring-stone-300" },
  desinscrit: { label: "Désinscrit", emoji: "🚫", tone: "bg-red-100 text-red-900 ring-red-300" },
};

export const EMAIL_STEPS: Record<number, string> = { 1: "Premier e-mail", 2: "Relance", 3: "Dernier message" };

export const EMAIL_STATUS: Record<ProspectEmail["status"], { label: string; tone: string }> = {
  brouillon: { label: "Brouillon", tone: "bg-stone-100 text-stone-800 ring-stone-300" },
  planifie: { label: "Programmé", tone: "bg-sky-100 text-sky-900 ring-sky-300" },
  envoye: { label: "Envoyé", tone: "bg-emerald-100 text-emerald-900 ring-emerald-300" },
  annule: { label: "Annulé", tone: "bg-stone-200 text-stone-600 ring-stone-300" },
  erreur: { label: "Erreur", tone: "bg-red-100 text-red-900 ring-red-300" },
};

/** Lien de désinscription inclus dans chaque e-mail. */
export const unsubscribeUrl = (site: string, token: string) => `${site.replace(/\/$/, "")}/api/desinscription/${token}`;
