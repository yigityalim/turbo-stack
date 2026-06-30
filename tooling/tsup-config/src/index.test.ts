import { expect, test } from "bun:test";
import { createTsupConfig } from "./index";

test("createTsupConfig returns a defined config", () => {
  expect(createTsupConfig()).toBeDefined();
});

test("createTsupConfig merges overrides", () => {
  const config = createTsupConfig({ minify: true });
  expect(config).toBeDefined();
});
