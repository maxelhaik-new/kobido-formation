import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

const SUPER_TARGET = process.env.SUPER_TARGET_URL || "https://sensoa-formation.super.site";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Laisser passer les fichiers d'actifs du portail local et favicon
  if (pathname.startsWith("/_portal_assets") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  // 2. Laisser passer la route de déconnexion
  if (pathname === "/api/logout") {
    return NextResponse.next();
  }

  // 3. Vérification de la session
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const sessionSecret =
    process.env.SESSION_SECRET || process.env.SITE_PASSWORD || "sensoa_default_secret_key";
  const isAuthenticated = await verifySessionToken(sessionCookie, sessionSecret);

  // 4. Si l'utilisateur est sur la page de connexion
  if (pathname === "/login") {
    // S'il est déjà connecté, on le redirige directement vers l'espace de formation
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 5. Si l'utilisateur n'est pas connecté
  if (!isAuthenticated) {
    // Redirection vers la page de login
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 6. Utilisateur connecté : Reverse Proxy transparent vers Super.so
  const targetUrl = new URL(pathname + search, SUPER_TARGET);
  return NextResponse.rewrite(targetUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _portal_assets (local Next.js static files)
     * - favicon.ico
     */
    "/((?!_portal_assets|favicon.ico).*)",
  ],
};
