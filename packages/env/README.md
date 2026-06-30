# @repo/env

Typed, validated environment variables via [`@t3-oss/env`](https://env.t3.gg) +
zod. Schemas are split **by concern** so each consumer validates only the vars
it actually uses.

## Usage

```ts
import { supabaseEnv } from "@repo/env";

const url = supabaseEnv.NEXT_PUBLIC_SUPABASE_URL; // typed + validated
```

Available schemas: `baseEnv`, `supabaseEnv`, `supabaseAdminEnv`, `resendEnv`,
`upstashEnv`, `sentryEnv`. Add new ones in `src/shared.ts` as services are
introduced — never read `process.env` directly in app code.

## Validation

Validation runs at import. It is **skipped** when `SKIP_ENV_VALIDATION` is set
(CI/build) or in tests, so importing without real values never throws. Empty
strings are treated as `undefined`.
