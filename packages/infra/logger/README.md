# @repo/logger

Small structured logger — levels, pluggable transports, and injectable
redaction. **Zero runtime dependencies.**

```ts
import { createLogger } from "@repo/logger";
import { sanitize } from "@repo/errors/sanitizer";

const log = createLogger({
  level: "info",
  base: { service: "web" },
  redact: (ctx) => sanitize(ctx) as Record<string, unknown>, // strip PII
});

log.info("user signed in", { userId });
const reqLog = log.child({ requestId }); // inherits base + child context
```

Default transport writes one JSON line per record. Swap `transport` to forward
to pino/Axiom/etc. Redaction is injected (pair with
[`@repo/errors`](../../core/errors/README.md)) so the logger stays
dependency-free.
