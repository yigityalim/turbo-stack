import { expect, test } from "bun:test";
import { type AnalyticsChannel, isActive } from "./channel";

test("isActive routes providers by channel", () => {
  const both: AnalyticsChannel = "both";
  expect(isActive("posthog", both)).toBe(true);
  expect(isActive("vercel", both)).toBe(true);

  expect(isActive("posthog", "vercel")).toBe(false);
  expect(isActive("vercel", "vercel")).toBe(true);

  expect(isActive("posthog", "none")).toBe(false);
  expect(isActive("vercel", "none")).toBe(false);
});
