"use client";

import { Analytics } from "@vercel/analytics/next";

/** Vercel Web Analytics, sans compter les visites du tableau de bord privé. */
export function SiteAnalytics() {
  return <Analytics beforeSend={(event) => (new URL(event.url).pathname.startsWith("/admin") ? null : event)} />;
}
