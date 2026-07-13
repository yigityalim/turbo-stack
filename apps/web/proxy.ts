import { updateSession } from "@repo/auth";
import type { NextRequest } from "next/server";

/**
 * Next.js proxy (formerly `middleware`). Refreshes the Supabase session on every
 * matched request and returns the response with the mirrored auth cookies.
 * Route-level protection lives in the pages via `requireClaims()`.
 */
export async function proxy(request: NextRequest) {
  const { response } = await updateSession(request);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)"],
};
