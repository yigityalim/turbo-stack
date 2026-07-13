import { createClient as createDbServerClient } from "@repo/db/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { SessionClaims } from "./index";

/**
 * Supabase client for RSC, route handlers, and server actions — bound to the
 * request cookies from `next/headers`. Session refresh is handled by the proxy/
 * middleware, so a failed cookie write here (Server Component context) is safe
 * to ignore.
 */
export async function createServerClient() {
  const cookieStore = await cookies();
  return createDbServerClient({
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet) {
      try {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, options);
        }
      } catch {
        return;
      }
    },
  });
}

/**
 * Validated JWT claims in a server context, or `null` when signed out. Uses
 * `getClaims()` (verifies the JWT) — never trust `getSession()` on the server.
 */
export async function getClaims(): Promise<SessionClaims | null> {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getClaims();
  return (data?.claims ?? null) as SessionClaims | null;
}

/**
 * Require an authenticated user in an RSC / route handler; `redirect()` to
 * `loginPath` when signed out, otherwise return the validated claims.
 */
export async function requireClaims(loginPath = "/login"): Promise<SessionClaims> {
  const claims = await getClaims();
  if (!claims?.sub) redirect(loginPath);
  return claims;
}
