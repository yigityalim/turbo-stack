import type { Database } from "@repo/db/types";
import { supabaseEnv } from "@repo/env";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Validated JWT claims. Extend with the claims your project's
 * `custom_access_token` auth hook injects (e.g. `org_id`, `role`).
 */
export interface SessionClaims {
  sub?: string;
  email?: string;
  role?: string;
  is_anonymous?: boolean;
  [key: string]: unknown;
}

export interface SessionResult {
  response: NextResponse;
  claims: SessionClaims | null;
}

/**
 * Refresh the Supabase session inside a Next.js proxy/middleware and return the
 * validated JWT claims. Follows the Supabase SSR contract: nothing runs between
 * client creation and `getClaims`, and refreshed cookies are mirrored onto
 * `response`. Wire this from `middleware.ts` and return `result.response`.
 */
export async function updateSession(request: NextRequest): Promise<SessionResult> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    supabaseEnv.NEXT_PUBLIC_SUPABASE_URL,
    supabaseEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      auth: { storageKey: supabaseEnv.NEXT_PUBLIC_SUPABASE_STORAGE_KEY },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  return { response, claims: (data?.claims ?? null) as SessionClaims | null };
}

/** Redirect while carrying the refreshed auth cookies so the session survives. */
export function redirectWithSession(
  request: NextRequest,
  pathname: string,
  session: SessionResult,
): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const redirect = NextResponse.redirect(url);
  for (const cookie of session.response.cookies.getAll()) {
    redirect.cookies.set(cookie);
  }
  return redirect;
}
