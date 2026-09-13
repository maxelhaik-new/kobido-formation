"use server";

import crypto from "crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, createSessionToken } from "@/lib/session";

export interface VerifyResult {
  success: boolean;
  error?: string;
  redirectUrl?: string;
}

export async function verifyPassword(submittedPassword: string): Promise<VerifyResult> {
  const expectedPassword = process.env.SITE_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET || expectedPassword;

  if (!expectedPassword) {
    console.error("Variable d'environnement SITE_PASSWORD non configurée.");
    return {
      success: false,
      error: "Configuration serveur incomplète : variable SITE_PASSWORD absente.",
    };
  }

  const cleanInput = (submittedPassword || "").trim();
  const cleanExpected = expectedPassword.trim();

  // Comparaison sécurisée à temps constant
  const inputHash = crypto.createHash("sha256").update(cleanInput).digest();
  const expectedHash = crypto.createHash("sha256").update(cleanExpected).digest();

  const isValid = crypto.timingSafeEqual(inputHash, expectedHash);

  if (!isValid) {
    return {
      success: false,
      error: "Mot de passe incorrect. Veuillez vérifier et réessayer.",
    };
  }

  // Création du token de session sécurisé
  const token = await createSessionToken(sessionSecret || "sensoa_default_secret_key");

  // Enregistrement du cookie HTTP-Only
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  });

  return {
    success: true,
    redirectUrl: "/",
  };
}
