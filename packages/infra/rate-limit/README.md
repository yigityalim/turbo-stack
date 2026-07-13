# @repo/rate-limit

Sliding-window rate limiting on top of `@repo/redis` (Upstash). Distributed and
correct across serverless instances in production; a per-process **in-memory
fallback** kicks in when Upstash is absent, so local dev and tests work without
Redis.

```ts
import { createRateLimiter } from "@repo/rate-limit";

const limiter = createRateLimiter({ limit: 10, window: "10 s" });

const { success, remaining, reset } = await limiter.limit(ip);
if (!success) {
  return new Response("Too many requests", {
    status: 429,
    headers: { "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)) },
  });
}
```

- `window` is an Upstash duration string: `"500 ms"`, `"10 s"`, `"1 m"`, `"1 h"`, `"1 d"`.
- `prefix` namespaces the keys so independent limiters (e.g. login vs API) don't collide.
- The in-memory fallback is **per-process** — fine for local dev, not for a
  multi-instance deployment. Set `UPSTASH_REDIS_REST_URL` / `_TOKEN` in production.
