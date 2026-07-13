# @repo/redis

Lazy [Upstash](https://upstash.com) Redis client — serverless Redis over REST,
edge/Vercel friendly. One place for any KV need (cache, sessions, rate limits).

```ts
import { getRedis } from "@repo/redis";

const redis = getRedis(); // null when UPSTASH_* env is absent
await redis?.set("key", "value", { ex: 60 });
```

`getRedis()` returns `null` (never throws) when `UPSTASH_REDIS_REST_URL` /
`UPSTASH_REDIS_REST_TOKEN` are missing, so builds and local dev without Redis
keep working. Consumers should handle the `null` case — see `@repo/rate-limit`,
which falls back to an in-memory limiter.

## Env

`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (both optional, validated
in `@repo/env`).
