import { expect, test } from "bun:test";
import { emailSchema, paginationSchema, slugSchema } from "./schemas";

test("emailSchema accepts valid and rejects invalid", () => {
  expect(emailSchema.safeParse("a@b.com").success).toBe(true);
  expect(emailSchema.safeParse("nope").success).toBe(false);
});

test("slugSchema enforces kebab-case", () => {
  expect(slugSchema.safeParse("my-slug-1").success).toBe(true);
  expect(slugSchema.safeParse("Not Slug").success).toBe(false);
});

test("paginationSchema applies defaults and coerces", () => {
  expect(paginationSchema.parse({})).toEqual({ page: 1, pageSize: 20 });
  expect(paginationSchema.parse({ page: "3" }).page).toBe(3);
});
