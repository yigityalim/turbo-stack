import { expect, test } from "bun:test";
import { AppError, isAppError, toAppError } from "./app-error";
import { err, ok, retry, tryCatch, withTimeout } from "./result";
import { REDACTED, sanitize } from "./sanitizer";

test("AppError carries catalog fields and hides detail from clients", () => {
  const error = AppError.notFound("id=42", { userId: "u1" });
  expect(error.status).toBe(404);
  expect(error.retryable).toBe(false);
  expect(error.toClient()).toEqual({
    code: "E-404",
    key: "NOT_FOUND",
    title: "Not found",
    retryable: false,
  });
  expect(error.toLog().detail).toBe("id=42");
  expect(isAppError(error)).toBe(true);
});

test("toAppError normalizes unknown throwables", () => {
  expect(toAppError(new Error("boom")).key).toBe("INTERNAL");
  expect(toAppError("oops").message).toBe("Something went wrong");
  expect(toAppError(AppError.forbidden()).key).toBe("FORBIDDEN");
});

test("sanitize masks sensitive keys and secrets in strings", () => {
  const clean = sanitize({
    apiKey: "secret-value",
    nested: { password: "p", note: "ping user@example.com now" },
    list: [{ token: "t" }],
  }) as Record<string, unknown>;
  expect(clean.apiKey).toBe(REDACTED);
  expect((clean.nested as Record<string, unknown>).password).toBe(REDACTED);
  expect((clean.nested as Record<string, unknown>).note).toBe(`ping ${REDACTED} now`);
});

test("sanitize is circular-safe", () => {
  const obj: Record<string, unknown> = { a: 1 };
  obj.self = obj;
  expect(() => sanitize(obj)).not.toThrow();
});

test("tryCatch wraps success and failure", async () => {
  expect(await tryCatch(() => 5)).toEqual(ok(5));
  const failed = await tryCatch(() => {
    throw AppError.validation("bad");
  });
  expect(failed.ok).toBe(false);
});

test("retry retries a retryable error then succeeds", async () => {
  let calls = 0;
  const result = await retry(
    () => {
      calls += 1;
      if (calls < 3) throw AppError.unavailable();
      return "done";
    },
    { sleep: () => Promise.resolve(), random: () => 0.5 },
  );
  expect(result).toEqual(ok("done"));
  expect(calls).toBe(3);
});

test("retry does not retry a non-retryable error", async () => {
  let calls = 0;
  const result = await retry(
    () => {
      calls += 1;
      throw AppError.forbidden();
    },
    { sleep: () => Promise.resolve() },
  );
  expect(result.ok).toBe(false);
  expect(calls).toBe(1);
});

test("withTimeout rejects when the deadline passes", async () => {
  const slow = new Promise((resolve) => setTimeout(resolve, 50));
  await expect(withTimeout(slow, 5)).rejects.toThrow("timed out");
});

test("err helper builds a failure result", () => {
  expect(err("nope")).toEqual({ ok: false, error: "nope" });
});
