import { supabaseEnv } from "@repo/env";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Supabase client for the browser / client components. Reads the validated
 * public env (`@repo/env`), so it is safe to run on the client — the publishable
 * key plus Row Level Security enforce access.
 */
export function createClient() {
  return createBrowserClient<Database>(
    supabaseEnv.NEXT_PUBLIC_SUPABASE_URL,
    supabaseEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    { auth: { storageKey: supabaseEnv.NEXT_PUBLIC_SUPABASE_STORAGE_KEY } },
  );
}
