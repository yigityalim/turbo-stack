import { expect, test } from "bun:test";
import { createLogger, type LogRecord } from "./index";

function capture() {
  const records: LogRecord[] = [];
  return { records, transport: (record: LogRecord) => records.push(record) };
}

test("respects the minimum level", () => {
  const { records, transport } = capture();
  const log = createLogger({ level: "warn", transport });
  log.info("skip");
  log.warn("keep");
  expect(records.map((r) => r.message)).toEqual(["keep"]);
});

test("merges base + child context and applies redact", () => {
  const { records, transport } = capture();
  const log = createLogger({
    transport,
    base: { app: "x" },
    redact: (context) => ({ ...context, password: "[REDACTED]" }),
  }).child({ req: "1" });

  log.info("hi", { password: "secret", user: "u" });

  expect(records[0]?.context).toEqual({
    app: "x",
    req: "1",
    password: "[REDACTED]",
    user: "u",
  });
});
