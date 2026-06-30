import { expect, test } from "bun:test";
import { createFlags, envSource } from "./index";

test("source overrides defaults, missing keys fall back", async () => {
  const flags = createFlags({
    defaults: { beta: false, limit: 10 },
    source: (key) => (key === "beta" ? true : undefined),
  });
  expect(await flags.get("beta")).toBe(true);
  expect(await flags.get("limit")).toBe(10);
  expect(await flags.isEnabled("beta")).toBe(true);
});

test("envSource parses booleans and numbers", () => {
  const source = envSource("FLAG_", { FLAG_BETA: "true", FLAG_LIMIT: "5" });
  expect(source("beta")).toBe(true);
  expect(source("limit")).toBe(5);
  expect(source("missing")).toBeUndefined();
});
