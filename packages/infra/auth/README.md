# @repo/auth

Next.js SSR auth glue on top of `@repo/db` (Supabase). Session refresh, RSC
clients, and route guards.

- **`@repo/auth`** — `updateSession(request)` for `proxy.ts` (Next 16's renamed
  `middleware.ts`): refreshes the session via `getClaims`, mirrors cookies onto
  the response, and returns the validated claims. `redirectWithSession()` keeps
  the refreshed cookies when a guard redirects.
- **`@repo/auth/server`** — `createServerClient()` (binds `next/headers`
  cookies), plus `getClaims()` and `requireClaims(loginPath?)` guards for RSC,
  route handlers, and server actions.

Always verify with `getClaims()`; never trust `getSession()` in server code.

## proxy.ts (Next 16)

```ts
import { updateSession } from "@repo/auth";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { response } = await updateSession(request);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

## Server component / action

```ts
import { requireClaims } from "@repo/auth/server";

export default async function Page() {
  const claims = await requireClaims(); // redirects to /login when signed out
  return <p>Hello {claims.email}</p>;
}
```
