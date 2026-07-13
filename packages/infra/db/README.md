# @repo/db

Typed Supabase clients, one per runtime context. Built on `@supabase/ssr` with
the new publishable/secret API keys, validated through `@repo/env`. The
`Database` type comes from `@repo/types` (`bun run generate-types`).

## Clients

| Import | Context | Keys / access |
| --- | --- | --- |
| `@repo/db/client` — `createClient()` | Browser / client components | publishable key + RLS |
| `@repo/db/server` — `createClient(cookies)` | RSC, route handlers, server actions | publishable key + RLS, session via cookies |
| `@repo/db/admin` — `createAdminClient()` | **Server-only** (cron, webhooks, admin) | secret key — **bypasses RLS** |

The barrel re-exports them as `createBrowserClient` / `createServerClient` /
`createAdminClient`. Prefer `@repo/auth/server`'s `createServerClient()` in
Next.js — it binds the `next/headers` cookie adapter for you.

```ts
import { createAdminClient } from "@repo/db/admin";

const admin = createAdminClient(); // never import this into a client component
```

## Types

`@repo/db/types` exposes helpers over the generated `public` schema:

```ts
import type { Tables, TablesInsert, Enums } from "@repo/db/types";

type Profile = Tables<"profiles">;
type NewProfile = TablesInsert<"profiles">;
type Role = Enums<"user_role">;
```

Regenerate the schema types with `bun run generate-types` (writes to
`@repo/types`). Never hand-edit generated types or write row shapes by hand.

## Env

Reads `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`,
optional `NEXT_PUBLIC_SUPABASE_STORAGE_KEY`, and (admin only) `SUPABASE_SECRET_KEY`.
