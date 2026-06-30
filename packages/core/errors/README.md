# @repo/errors

Framework-agnostic error core — **zero runtime dependencies**. A catalog-driven
`AppError`, a `Result`/`tryCatch` flow, and a PII sanitizer. Lives in
`packages/core/` because it's pure domain logic; map it to tRPC/HTTP at the
transport edge.

## AppError

```ts
import { AppError, isAppError, toAppError } from "@repo/errors";

throw AppError.notFound("id=42", { userId });        // catalog-driven
throw AppError.internal("upstream failed", {}, cause);

error.toClient(); // { code, key, title, retryable } — safe for the client
error.toLog();    // adds detail + context — sanitize before writing
```

`detail` and `context` are **never** sent to clients. Codes live in
`catalog.ts`; extend it per app.

## Result & retries

```ts
import { ok, retry, tryCatch, withTimeout } from "@repo/errors";

const result = await tryCatch(() => loadUser(id));
if (!result.ok) return result.error.toClient();

await retry(() => callFlakyApi(), { attempts: 4 }); // backoff while retryable
await withTimeout(slowCall(), 5_000);
```

## PII sanitizer

```ts
import { sanitize } from "@repo/errors/sanitizer";

logger.error(sanitize(error.toLog())); // masks passwords, tokens, emails, …
```

`sanitize` masks the values of sensitive keys and secrets/PII in free strings,
and is circular-safe. Add keys in `sanitizer.ts` as new fields appear.
