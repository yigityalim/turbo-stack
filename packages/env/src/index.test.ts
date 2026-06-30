import { expect, test } from "bun:test";
import { baseEnv } from "./index";

// NODE_ENV is "test" here, so validation is skipped and import never throws.
test("baseEnv exposes NODE_ENV", () => {
  expect(baseEnv.NODE_ENV).toBeDefined();
});
