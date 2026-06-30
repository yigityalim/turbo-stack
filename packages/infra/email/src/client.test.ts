import { expect, test } from "bun:test";
import { createMailer } from "./client";
import { capturePlugin, createEmailCaptureStore } from "./plugins/capture";
import { defaultsPlugin } from "./plugins/defaults";
import { failingProvider, memoryProvider } from "./testing";

const base = {
  from: "Acme <hello@acme.com>",
  to: "user@example.com",
  subject: "Hi",
  text: "hello",
};

test("sends through the memory adapter and captures the lifecycle", async () => {
  const memory = memoryProvider();
  const store = createEmailCaptureStore();
  const mailer = createMailer({
    adapters: [memory],
    plugins: [capturePlugin(store)],
  });

  const result = await mailer.send(base);

  expect(result.provider).toBe("memory");
  expect(memory.sent).toHaveLength(1);
  expect(store.events.map((e) => e.type)).toEqual(["beforeSend", "afterSend"]);
});

test("defaults merge tags (defaults first) and apply an idempotency prefix", async () => {
  const memory = memoryProvider();
  const mailer = createMailer({
    adapters: [memory],
    plugins: [
      defaultsPlugin({
        tags: [{ name: "env", value: "test" }],
        idempotencyKeyPrefix: "acme:",
      }),
    ],
  });

  await mailer.send(
    { ...base, tags: [{ name: "type", value: "welcome" }] },
    { idempotencyKey: "user_1" },
  );

  const record = memory.sent[0];
  expect(record?.message.tags).toEqual([
    { name: "env", value: "test" },
    { name: "type", value: "welcome" },
  ]);
  expect(record?.options.idempotencyKey).toBe("acme:user_1");
});

test("retries the primary, then falls back to the next adapter", async () => {
  const primary = failingProvider({ name: "primary" });
  const backup = memoryProvider();
  const store = createEmailCaptureStore();
  const mailer = createMailer({
    adapters: [primary, backup],
    plugins: [capturePlugin(store)],
    retries: 1,
    backoff: () => 0,
  });

  const result = await mailer.send(base);

  expect(result.provider).toBe("memory");
  expect(store.events.map((e) => e.type)).toEqual(["beforeSend", "retry", "error", "afterSend"]);
});

test("validation errors are not retried", async () => {
  const memory = memoryProvider();
  const mailer = createMailer({ adapters: [memory] });

  await expect(mailer.send({ ...base, text: undefined })).rejects.toThrow("provide `html`");
});
