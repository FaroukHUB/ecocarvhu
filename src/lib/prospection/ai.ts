import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { activite } from "./search";

/**
 * Rédaction personnalisée des 3 e-mails de prospection avec Claude.
 * Optionnelle : n'est proposée que si ANTHROPIC_API_KEY est défini (coût à
 * l'usage, quelques centimes par entreprise). Rien n'est envoyé sans validation.
 */
export const aiAvailable = () => Boolean(process.env.ANTHROPIC_API_KEY);

const Draft = z.object({
  emails: z
    .array(z.object({ subject: z.string().min(3).max(150), body: z.string().min(40).max(3000) }))
    .length(3),
});

const SCHEMA = {
  type: "object",
  properties: {
    emails: {
      type: "array",
      items: {
        type: "object",
        properties: { subject: { type: "string" }, body: { type: "string" } },
        required: ["subject", "body"],
        additionalProperties: false,
      },
    },
  },
  required: ["emails"],
  additionalProperties: false,
};

const SYSTEM = `Tu rédiges des e-mails de prospection B2B pour EcocarVHU, entreprise d'enlèvement de véhicules hors d'usage (VHU) en Provence-Alpes-Côte d'Azur.
Faits que tu peux utiliser, et seulement ceux-là : enlèvement sur place des véhicules hors d'usage ; remise à un centre VHU agréé partenaire qui délivre le certificat de destruction ; enlèvement gratuit pour un véhicule complet et accessible ; étude de rachat pour un véhicule qui garde de la valeur ; téléphone 07 53 08 62 18 ; site www.ecocarvhu.fr.
N'invente rien d'autre : pas de délai, de prix, de chiffre, de client, d'avis, de certification ni de promesse.
Ton : professionnel, chaleureux, direct, en français, vouvoiement. Pas de formules creuses ni de majuscules agressives.
Produis exactement 3 e-mails : 1) premier contact (8 à 12 lignes), 2) relance courte à J+5, 3) dernier message très court à J+12.
Chaque e-mail se termine par « L'équipe EcocarVHU ». N'ajoute pas de lien de désinscription : il est ajouté automatiquement.`;

export async function draftWithClaude(p: {
  name: string;
  city: string | null;
  naf: string | null;
  effectif: string | null;
  dirigeant: string | null;
  contact_name: string | null;
  notes: string;
}) {
  const client = new Anthropic();
  const a = activite(p.naf);
  const facts = [
    `Entreprise : ${p.name}`,
    `Activité : ${a?.label ?? p.naf ?? "non précisée"}`,
    `Ville : ${p.city ?? "non précisée"}`,
    `Taille : ${p.effectif ?? "inconnue"}`,
    `Interlocuteur : ${p.contact_name || p.dirigeant || "inconnu (commencer par « Bonjour, »)"}`,
    a ? `Pourquoi elle est concernée : elle ${a.accroche}.` : "",
    p.notes ? `Notes internes : ${p.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
    system: SYSTEM,
    messages: [{ role: "user", content: `Rédige la séquence pour cette entreprise :\n${facts}` }],
  });
  if (response.stop_reason === "refusal") throw new Error("La rédaction automatique n'a pas abouti pour cette entreprise. Pars des modèles.");
  const text = response.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
  const parsed = Draft.safeParse(JSON.parse(text));
  if (!parsed.success) throw new Error("La rédaction automatique n'a pas abouti. Réessaie, ou pars des modèles.");
  return parsed.data.emails;
}
