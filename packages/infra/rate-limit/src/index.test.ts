import { expect, test } from "bun:test";
import { createRateLimiter } from "./index";

test("in-memory fallback enforces the limit within a window", async () => {
  const limiter = createRateLimiter({ limit: 2, window: "1 m" });
  const first = await limiter.limit("user-1");
  const second = await limiter.limit("user-1");
  const third = await limiter.limit("user-1");

  expect(first.success).toBe(true);
  expect(second.success).toBe(true);
  expect(third.success).toBe(false);
  expect(third.remaining).toBe(0);
  expect(first.limit).toBe(2);
});

test("tracks identifiers independently", async () => {
  const limiter = createRateLimiter({ limit: 1, window: "1 m" });

  expect((await limiter.limit("a")).success).toBe(true);
  expect((await limiter.limit("b")).success).toBe(true);
  expect((await limiter.limit("a")).success).toBe(false);
});
