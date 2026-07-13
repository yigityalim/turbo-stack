import { expect, test } from "bun:test";
import { createAdminClient, createBrowserClient, createServerClient } from "./index";

test("exposes the Supabase client factories", () => {
  expect(createBrowserClient).toBeInstanceOf(Function);
  expect(createServerClient).toBeInstanceOf(Function);
  expect(createAdminClient).toBeInstanceOf(Function);
});
