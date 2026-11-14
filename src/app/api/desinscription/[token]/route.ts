import { NextResponse, type NextRequest } from "next/server";
import { unsubscribeToken } from "@/lib/prospection/unsubscribe";

/**
 * Lien de désinscription des e-mails de prospection.
 * - GET (clic dans l'e-mail) : page de confirmation.
 * - POST (désinscription en un clic des messageries, RFC 8058) : immédiat.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/api/desinscription/[token]">) {
  const { token } = await ctx.params;
  return NextResponse.redirect(new URL(`/desinscription/${encodeURIComponent(token)}`, request.url), 303);
}

export async function POST(_request: NextRequest, ctx: RouteContext<"/api/desinscription/[token]">) {
  const { token } = await ctx.params;
  try {
    await unsubscribeToken(token);
  } catch {
    return new NextResponse("Erreur", { status: 500 });
  }
  return new NextResponse("Désinscription enregistrée.", { status: 200, headers: { "X-Robots-Tag": "noindex" } });
}
