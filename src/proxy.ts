import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isKnownDynamicPath } from "@/lib/routes";
import { supabaseConfig } from "@/lib/supabase/config";

/**
 * 1. Protection optionnelle de la prévisualisation (Basic Auth) si
 *    PREVIEW_BASIC_AUTH="utilisateur:motdepasse" est défini hors production.
 *    À préférer : la protection native de l'hébergeur si elle existe.
 * 2. Espace de gestion /admin : session Supabase rafraîchie ici ; sans session,
 *    redirection vers /admin/connexion. Sans configuration Supabase, 404.
 * 3. Vrai 404 pour les segments dynamiques inconnus ou non publiés.
 */
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/admin" || path.startsWith("/admin/")) return adminGate(request);

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

  if (isKnownDynamicPath(path) === false) {
    // Réécriture vers une route inexistante : rendu de not-found.tsx avec le statut 404.
    return NextResponse.rewrite(new URL("/_page-introuvable", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/|icon.svg|opengraph-image).*)"],
};

async function adminGate(request: NextRequest) {
  const config = supabaseConfig();
  if (!config) return NextResponse.rewrite(new URL("/_page-introuvable", request.url));

  let response = NextResponse.next({ request });
  const supabase = createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) response.cookies.set(name, value, options);
      },
    },
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const login = request.nextUrl.pathname === "/admin/connexion" || request.nextUrl.pathname === "/admin/auth/confirm";
  if (!user && !login) {
    const redirect = NextResponse.redirect(new URL("/admin/connexion", request.url));
    for (const c of response.cookies.getAll()) redirect.cookies.set(c);
    return withAdminHeaders(redirect);
  }
  return withAdminHeaders(response);
}

function withAdminHeaders(res: NextResponse) {
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}
