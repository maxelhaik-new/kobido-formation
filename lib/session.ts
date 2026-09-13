export const SESSION_COOKIE_NAME = "sensoa_session";

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(secret: string): Promise<string> {
  const timestamp = Date.now().toString();
  const enc = new TextEncoder();
  const key = await getCryptoKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(`sensoa:${timestamp}`));
  const sigHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${timestamp}.${sigHex}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
  secret: string,
  maxAgeMs = 30 * 24 * 60 * 60 * 1000
): Promise<boolean> {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [timestampStr, sigHex] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Vérification expiration (30 jours par défaut)
  if (Date.now() - timestamp > maxAgeMs) return false;

  try {
    const key = await getCryptoKey(secret);
    const enc = new TextEncoder();
    const match = sigHex.match(/.{1,2}/g);
    if (!match) return false;
    const sigBytes = new Uint8Array(match.map((byte) => parseInt(byte, 16)));
    return await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(`sensoa:${timestamp}`));
  } catch {
    return false;
  }
}
