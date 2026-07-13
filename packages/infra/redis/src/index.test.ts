import { expect, test } from "bun:test";
import { getRedis } from "./index";

test("returns null without Upstash env (safe for builds and local dev)", () => {
  expect(getRedis()).toBeNull();
});
