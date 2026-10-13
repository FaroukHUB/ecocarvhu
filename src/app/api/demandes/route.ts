import { NextResponse, type NextRequest } from "next/server";
import { processRequest, type ProcessResult } from "@/lib/forms/process";
import { checkRateLimit } from "@/lib/forms/rate-limit";

/**
 * Réception des demandes (tous formulaires).
 * - Requête `fetch` (Accept: application/json) : réponse JSON.
 * - Envoi HTML classique (JavaScript désactivé) : redirection 303 vers une
 *   page de résultat, sans aucune donnée personnelle dans l'URL.
 */

const STATUS_CODE: Record<ProcessResult["status"], number> = {
  accepted: 200,
  invalid: 422,
  "rejected-file": 422,
  spam: 400,
  "rate-limited": 429,
  unavailable: 503,
  failed: 502,
};

export async function POST(request: NextRequest) {
  const wantsJson = request.headers.get("accept")?.includes("application/json") ?? false;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  let result: ProcessResult;
  if (!checkRateLimit(ip)) {
    result = { status: "rate-limited" };
  } else {
    const form = await request.formData().catch(() => null);
    result = form
      ? await processRequest(form)
      : {
          status: "rejected-file",
          message: "La demande est trop volumineuse ou mal formée. Réduisez le nombre de photos.",
        };
  }

  if (wantsJson) {
    return NextResponse.json(result, { status: STATUS_CODE[result.status] });
  }

  const statut = result.status === "accepted" ? `ok-${result.mode}` : result.status;
  return NextResponse.redirect(new URL(`/demande/resultat/${statut}`, request.url), 303);
}
