import { supabaseAdminEnv, supabaseEnv } from "@repo/env";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Service/secret-key client — **server-only**, bypasses Row Level Security. Use
 * only in trusted server contexts (admin ops, cron jobs, webhooks). Never import
 * this into client components or expose the secret key.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    supabaseEnv.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAdminEnv.SUPABASE_SECRET_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
