import { expect, test } from "bun:test";
import { initSentry } from "./index";

test("initSentry is a no-op without a DSN (safe for local dev and tests)", () => {
  expect(() => initSentry()).not.toThrow();
});
