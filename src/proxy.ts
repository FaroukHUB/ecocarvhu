import { NextResponse, type NextRequest } from "next/server";
import { isKnownDynamicPath } from "@/lib/routes";

/**
 * 1. Protection optionnelle de la prévisualisation (Basic Auth) si
 *    PREVIEW_BASIC_AUTH="utilisateur:motdepasse" est défini hors production.
 *    À préférer : la protection native de l'hébergeur si elle existe.
 * 2. Vrai 404 pour les segments dynamiques inconnus ou non publiés.
 */
export function proxy(request: NextRequest) {
  const credentials = process.env.PREVIEW_BASIC_AUTH;
  if (credentials && process.env.SITE_ENV !== "production") {
    const header = request.headers.get("authorization");
    const ok = header?.startsWith("Basic ") && atob(header.slice(6)) === credentials;
    if (!ok) {
      return new NextResponse("Accès restreint", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Previsualisation EcocarVHU", charset="UTF-8"',
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }
  }

  if (isKnownDynamicPath(request.nextUrl.pathname) === false) {
    // Réécriture vers une route inexistante : rendu de not-found.tsx avec le statut 404.
    return NextResponse.rewrite(new URL("/_page-introuvable", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/|icon.svg|opengraph-image).*)"],
};
