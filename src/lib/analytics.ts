import { track as vercelTrack } from "@vercel/analytics";

/**
 * Mesure des conversions avec Vercel Web Analytics (sans cookie).
 *
 * Les événements ne sont envoyés que sur les déploiements Vercel où Web
 * Analytics est activé ; en local, rien n'est transmis. Vercel limite chaque
 * événement à 2 propriétés : on garde les plus utiles.
 *
 * Jamais de donnée personnelle : seulement le type d'événement, le type de
 * demande, la page et l'emplacement du bouton.
 *
 * Rappel d'interprétation : un clic sur "Appeler" n'est pas un appel reçu,
 * un clic WhatsApp n'est pas une conversation, une demande transmise n'est
 * pas une vente.
 */

export type AnalyticsEvent =
  | "call_click"
  | "whatsapp_click"
  | "form_start"
  | "form_submit_accepted"
  | "form_submit_error";

export interface AnalyticsProps {
  form_type?: string;
  page_path?: string;
  placement?: string;
  error_kind?: string;
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  const page = props.page_path ?? window.location.pathname;
  const data: Record<string, string> =
    event === "call_click" || event === "whatsapp_click"
      ? { page, placement: props.placement ?? "inconnu" }
      : event === "form_submit_error"
        ? { form: props.form_type ?? "inconnu", error: props.error_kind ?? "inconnu" }
        : { form: props.form_type ?? "inconnu", page };
  vercelTrack(event, data);
}
