# @repo/email

Transactional email — a small, **provider-agnostic** send pipeline (ours, zero
extra runtime dependencies) with React Email templates. An infrastructure
adapter, so it lives under `packages/infra/`.

## Quick send

```ts
import { sendEmail, WelcomeEmail } from "@repo/email";

await sendEmail({
  to: "user@example.com",
  subject: "Welcome",
  react: <WelcomeEmail name="Jane" />,
});
```

`sendEmail` builds a lazy Resend mailer from `RESEND_API_KEY`; a missing key
returns an error instead of throwing, so builds never crash.

## Full client — defaults, fallback, retries, observability

```ts
import { createMailer } from "@repo/email";
import { resend } from "@repo/email/resend";
import { defaultsPlugin } from "@repo/email/plugins/defaults";
import { observabilityPlugin } from "@repo/email/plugins/observability";

export const mailer = createMailer({
  adapters: [resend({ apiKey: process.env.RESEND_API_KEY! })], // + fallback routes
  retries: 2,
  plugins: [
    defaultsPlugin({ replyTo: "support@acme.com", idempotencyKeyPrefix: "acme:" }),
    observabilityPlugin({ log: (event) => logger.info(event, event.type) }),
  ],
});
```

- **Adapter seam** — `resend` calls the Resend API over `fetch` (no SDK
  dependency). Extra adapters are fallback routes, tried in order; each retries
  with exponential backoff before falling back.
- **Plugins** — `defaultsPlugin` (org-wide headers/tags/reply-to + idempotency,
  per-message overrides win), `observabilityPlugin` (**redacted** events —
  counts and tag names, never recipients or bodies), `capturePlugin` (full
  events for tests).
- **No silent data loss** — the resend adapter throws on `metadata` (Resend has
  no such field) rather than dropping it.

## Testing

```ts
import { createMailer } from "@repo/email";
import { memoryProvider } from "@repo/email/testing";
import { capturePlugin, createEmailCaptureStore } from "@repo/email/plugins/capture";

const store = createEmailCaptureStore();
const mailer = createMailer({
  adapters: [memoryProvider()],
  plugins: [capturePlugin(store)],
});
await mailer.send(message);
expect(store.events.map((e) => e.type)).toEqual(["beforeSend", "afterSend"]);
```

## Templates

React Email templates live in `src/emails/` (shared blocks in `layout.tsx`,
matching the DESIGN.md palette). Preview/author with:

```sh
bun --filter @repo/email dev   # React Email preview on :4444
```

> Design inspired by the Email SDK docs, but this is an independent
> implementation with **no copyleft (AGPL) dependency**.
