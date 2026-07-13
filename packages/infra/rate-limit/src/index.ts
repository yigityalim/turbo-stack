import { getRedis } from "@repo/redis";
import { type Duration, Ratelimit } from "@upstash/ratelimit";

export interface RateLimitResult {
  /** Whether the request is within the limit. */
  success: boolean;
  /** The configured maximum per window. */
  limit: number;
  /** Requests remaining in the current window. */
  remaining: number;
  /** Epoch milliseconds when the window resets. */
  reset: number;
}

export interface RateLimiterOptions {
  /** Max requests per window (default 10). */
  limit?: number;
  /** Window as an Upstash duration, e.g. "10 s", "1 m" (default "10 s"). */
  window?: Duration;
  /** Key namespace, so multiple limiters don't collide (default "ratelimit"). */
  prefix?: string;
}

export interface RateLimiter {
  /** Consume one token for `identifier` (an IP, user id, API key, …). */
  limit(identifier: string): Promise<RateLimitResult>;
}

const UNIT_MS: Record<string, number> = {
  ms: 1,
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
};

/** Parse an Upstash duration to milliseconds — tolerates both "10 s" and "10s". */
function durationToMs(window: Duration): number {
  const match = /^(\d+)\s*(ms|s|m|h|d)$/.exec(window);
  if (!match) return 10_000;
  return Number(match[1]) * (UNIT_MS[match[2] ?? "s"] ?? 1000);
}

/** Per-process fixed-window limiter — the local-dev fallback when Redis is absent. */
function createMemoryLimiter(limit: number, windowMs: number): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return {
    async limit(identifier) {
      const now = Date.now();
      const entry = hits.get(identifier);
      if (!entry || now >= entry.resetAt) {
        const resetAt = now + windowMs;
        hits.set(identifier, { count: 1, resetAt });
        return { success: true, limit, remaining: limit - 1, reset: resetAt };
      }
      entry.count += 1;
      return {
        success: entry.count <= limit,
        limit,
        remaining: Math.max(0, limit - entry.count),
        reset: entry.resetAt,
      };
    },
  };
}

/**
 * A sliding-window rate limiter. Uses Upstash Redis when configured (distributed,
 * correct across serverless instances); otherwise falls back to a per-process
 * in-memory limiter so local dev and tests work without Redis.
 */
export function createRateLimiter(options: RateLimiterOptions = {}): RateLimiter {
  const limit = options.limit ?? 10;
  const window = options.window ?? "10 s";
  const prefix = options.prefix ?? "ratelimit";

  const redis = getRedis();
  if (!redis) return createMemoryLimiter(limit, durationToMs(window));

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix,
  });

  return {
    async limit(identifier) {
      const { success, limit: max, remaining, reset } = await ratelimit.limit(identifier);
      return { success, limit: max, remaining, reset };
    },
  };
}
