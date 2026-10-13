/**
 * Mesure des conversions — désactivée par défaut.
 *
 * Aucun script tiers n'est chargé. Les événements sont poussés dans
 * `window.dataLayer` seulement si NEXT_PUBLIC_ANALYTICS_ENABLED="true", ce qui
 * suppose qu'un outil ait été choisi, configuré, et que le consentement soit
 * géré lorsque l'outil l'exige (voir README, section Mesure).
 *
 * Jamais de donnée personnelle : seulement le type d'événement, le type de
 * demande et le chemin de la page.
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

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (!enabled || typeof window === "undefined") return;
  const page_path = props.page_path ?? window.location.pathname;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...props, page_path });
}
