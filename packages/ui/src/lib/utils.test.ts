import { expect, test } from "bun:test";
import { cn } from "./utils";

test("cn joins truthy class names", () => {
  expect(cn("a", "b")).toBe("a b");
});

test("cn drops falsy values", () => {
  expect(cn("a", false, null, undefined, 0 as unknown as string, "b")).toBe("a b");
});

test("cn resolves conflicting Tailwind utilities (last wins)", () => {
  expect(cn("px-2", "px-4")).toBe("px-4");
  expect(cn("text-sm text-muted-foreground", "text-foreground")).toBe("text-sm text-foreground");
});
