import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/** URL-safe random token, `bytes` of entropy (default 32). */
export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

/** SHA-256 hex digest. Not for passwords — use argon2/bcrypt for those. */
export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

/** HMAC-SHA256 hex signature of `payload` with `secret`. */
export function hmacSign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Constant-time HMAC verification. */
export function hmacVerify(payload: string, signature: string, secret: string): boolean {
  const expected = Buffer.from(hmacSign(payload, secret));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/** Constant-time string equality (for tokens/secrets). */
export function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}
