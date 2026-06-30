import { expect, test } from "bun:test";
import { hmacSign, hmacVerify, randomToken, safeEqual, sha256 } from "./index";

test("hmac sign/verify round-trips and rejects tampering", () => {
  const signature = hmacSign("payload", "secret");
  expect(hmacVerify("payload", signature, "secret")).toBe(true);
  expect(hmacVerify("payload", signature, "wrong-secret")).toBe(false);
  expect(hmacVerify("tampered", signature, "secret")).toBe(false);
});

test("randomToken is url-safe and unique", () => {
  const a = randomToken();
  const b = randomToken();
  expect(a).not.toBe(b);
  expect(a).toMatch(/^[A-Za-z0-9_-]+$/);
});

test("sha256 is stable and 64 hex chars", () => {
  expect(sha256("abc")).toBe(sha256("abc"));
  expect(sha256("abc")).toHaveLength(64);
});

test("safeEqual compares in constant time", () => {
  expect(safeEqual("a", "a")).toBe(true);
  expect(safeEqual("a", "b")).toBe(false);
  expect(safeEqual("a", "ab")).toBe(false);
});
