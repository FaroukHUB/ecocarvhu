import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { company } from "@/config/company";

/**
 * Aide à la rédaction d'un article de blog ou d'une page ville.
 * - Sans clé : un plan à compléter (gratuit).
 * - Avec ANTHROPIC_API_KEY : un premier jet rédigé par Claude, limité aux faits
 *   connus ; tout le reste est marqué [À CONFIRMER]. Rien n'est publié sans validation.
 */

export type ContentKind = "article" | "ville";
export const TO_CONFIRM = "[À CONFIRMER]";
/** Repères à traiter avant validation : [À CONFIRMER…] et [À COMPLÉTER…]. */
export const countToConfirm = (s: string) => (s.match(/\[\s*À\s+(CONFIRMER|COMPLÉTER)[^\]]*\]/giu) ?? []).length;

export function contentTemplate(kind: ContentKind, topic: string, keyword: string) {
  const t = topic.trim();
  if (kind === "ville") {
    return {
      title: `Enlèvement d'épave gratuit à ${t}`,
      meta_description: `Enlèvement d'épave à ${t} : gratuit pour un véhicule complet et accessible. [À COMPLÉTER]`,
      body: [
        `# Enlèvement d'épave gratuit à ${t}`,
        "",
        `[À COMPLÉTER : 2 ou 3 phrases d'introduction propres à ${t}.]`,
        "",
        `## Enlèvement gratuit à ${t} : ce qui est compris`,
        "",
        company.pickup.freeConditions ?? TO_CONFIRM,
        "",
        "## Ce qui permet une réponse fiable (accès)",
        "",
        `[À COMPLÉTER : rues étroites, parkings, résidences, stationnement à ${t}. Uniquement des faits vérifiables.]`,
        "",
        `## Situations fréquentes à ${t}`,
        "",
        "[À COMPLÉTER : 3 situations, une phrase chacune.]",
        "",
        "## Documents à préparer",
        "",
        "[À COMPLÉTER : reprendre la liste officielle déjà utilisée sur le site.]",
        "",
        "## Questions fréquentes",
        "",
        "[À COMPLÉTER : 3 ou 4 questions et réponses.]",
        "",
        `Mot-clé visé : ${keyword || `épaviste ${t}`}`,
      ].join("\n"),
    };
  }
  return {
    title: t,
    meta_description: `[À COMPLÉTER : résumé de l'article en 150 caractères environ, avec « ${keyword || t} ».]`,
    body: [
      `# ${t}`,
      "",
      "[À COMPLÉTER : introduction. La question du lecteur et la réponse courte.]",
      "",
      "## [À COMPLÉTER : première partie]",
      "",
      "## [À COMPLÉTER : deuxième partie]",
      "",
      "## [À COMPLÉTER : troisième partie]",
      "",
      "## En résumé",
      "",
      "[À COMPLÉTER]",
      "",
      `Mot-clé visé : ${keyword || t}`,
    ].join("\n"),
  };
}

const Draft = z.object({ title: z.string().min(5).max(120), meta_description: z.string().min(20).max(320), body: z.string().min(200).max(20000) });
const SCHEMA = {
  type: "object",
  properties: { title: { type: "string" }, meta_description: { type: "string" }, body: { type: "string" } },
  required: ["title", "meta_description", "body"],
  additionalProperties: false,
};

const SYSTEM = `Tu rédiges un premier jet de contenu web en français pour EcocarVHU, entreprise d'enlèvement de véhicules hors d'usage (VHU) en Provence-Alpes-Côte d'Azur.
Faits que tu peux affirmer, et seulement ceux-là :
- ${company.pickup.freeConditions}
- EcocarVHU remet les véhicules à un centre VHU agréé partenaire, qui délivre le certificat de destruction.
- Pour un véhicule qui garde de la valeur, EcocarVHU peut étudier un rachat.
- Les conditions sont confirmées avec le client avant le rendez-vous.
- Téléphone : ${company.phone?.value ?? "non communiqué"}. Site : www.ecocarvhu.fr.
- Les faits fournis dans les « notes vérifiées » de la demande.
Règles :
- N'invente rien : aucun délai, prix, chiffre, avis client, certification, nom de partenaire, ni détail local non fourni. Si une information serait utile mais n'est pas dans les faits, écris « [À CONFIRMER] » suivi de ce qu'il faut vérifier.
- Pour la réglementation (documents, cession, certificat de destruction), reste général et marque chaque affirmation précise « [À CONFIRMER] ».
- Ton : clair, concret, rassurant, vouvoiement. Phrases courtes. Pas de superlatifs.
- Format du corps : texte simple, titres en « # » (un seul) et « ## », listes en « - ». 600 à 1000 mots.
- Le titre fait au plus 60 caractères ; la meta description entre 120 et 160 caractères.`;

export async function draftContentWithClaude(input: { kind: ContentKind; topic: string; keyword: string; notes: string }) {
  const client = new Anthropic();
  const ask = [
    input.kind === "ville" ? `Page ville pour la commune : ${input.topic}` : `Article de blog sur le sujet : ${input.topic}`,
    `Recherche Google visée : ${input.keyword || "à choisir"}`,
    input.notes ? `Notes vérifiées fournies par l'entreprise :\n${input.notes}` : "Aucune note vérifiée fournie.",
  ].join("\n");
  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
    system: SYSTEM,
    messages: [{ role: "user", content: ask }],
  });
  if (response.stop_reason === "refusal") throw new Error("La rédaction automatique n'a pas abouti. Réessaie, ou pars du plan.");
  const text = response.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
  const parsed = Draft.safeParse(JSON.parse(text));
  if (!parsed.success) throw new Error("La rédaction automatique n'a pas abouti. Réessaie, ou pars du plan.");
  return parsed.data;
}
