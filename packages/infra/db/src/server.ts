import { supabaseEnv } from "@repo/env";
import { type CookieMethodsServer, createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Supabase client for the server (RSC, route handlers, server actions). Pass the
 * request's cookie adapter — e.g. built from Next.js `cookies()` — so the auth
 * session is read from and written back to the request cookies.
 */
export function createClient(cookies: CookieMethodsServer) {
  return createServerClient<Database>(
    supabaseEnv.NEXT_PUBLIC_SUPABASE_URL,
    supabaseEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    { cookies, auth: { storageKey: supabaseEnv.NEXT_PUBLIC_SUPABASE_STORAGE_KEY } },
  );
}
