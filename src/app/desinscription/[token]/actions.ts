"use server";

import { redirect } from "next/navigation";
import { unsubscribeToken } from "@/lib/prospection/unsubscribe";

export async function confirmUnsubscribe(token: string) {
  let ok = false;
  try {
    ok = (await unsubscribeToken(token)) !== null;
  } catch {
    ok = false;
  }
  redirect(`/desinscription/${encodeURIComponent(token)}?${ok ? "fait=1" : "erreur=1"}`);
}
