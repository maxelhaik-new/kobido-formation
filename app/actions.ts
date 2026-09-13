"use server";

import crypto from "crypto";

export interface VerifyResult {
  success: boolean;
  error?: string;
  redirectUrl?: string;
}

export async function verifyPassword(submittedPassword: string): Promise<VerifyResult> {
  const expectedPassword = process.env.SITE_PASSWORD;
  const targetUrl = process.env.TARGET_URL || "https://sensoa-formation.super.site/";

  if (!expectedPassword) {
    console.error("Variable d'environnement SITE_PASSWORD non configurée.");
    return {
      success: false,
      error: "Configuration serveur incomplète : la variable SITE_PASSWORD n'est pas définie.",
    };
  }

  const cleanInput = (submittedPassword || "").trim();
  const cleanExpected = expectedPassword.trim();

  // Comparaison sécurisée à temps constant
  const inputHash = crypto.createHash("sha256").update(cleanInput).digest();
  const expectedHash = crypto.createHash("sha256").update(cleanExpected).digest();

  const isValid = crypto.timingSafeEqual(inputHash, expectedHash);

  if (isValid) {
    return {
      success: true,
      redirectUrl: targetUrl,
    };
  }

  return {
    success: false,
    error: "Mot de passe incorrect. Veuillez vérifier et réessayer.",
  };
}
