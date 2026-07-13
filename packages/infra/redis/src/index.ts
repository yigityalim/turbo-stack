import { upstashEnv } from "@repo/env";
import { Redis } from "@upstash/redis";

let cached: Redis | null = null;

/**
 * Lazy Upstash Redis client — serverless Redis over REST, safe on the edge and
 * Vercel. Returns `null` when the Upstash env is absent, so builds and local dev
 * without Redis never crash; callers should degrade gracefully (see how
 * `@repo/rate-limit` falls back to an in-memory limiter).
 */
export function getRedis(): Redis | null {
  if (cached) return cached;
  const url = upstashEnv.UPSTASH_REDIS_REST_URL;
  const token = upstashEnv.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  cached = new Redis({ url, token });
  return cached;
}

export { Redis };
