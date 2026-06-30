# 0005. Build our own email seam, not the AGPL SDK

- Status: Accepted
- Date: 2026-06-30

## Context

`@opencoredev/email-sdk` is a well-designed provider-agnostic email library
(adapters, fallbacks, retries, observability). But it is licensed
**AGPL-3.0-only** and was published days before evaluation (pre-1.0), which the
repo's `minimumReleaseAge` gate would block.

## Decision

Do not depend on it. Build an independent, MIT-clean equivalent in
`@repo/email`: an adapter seam (Resend over `fetch`), a `createMailer`
pipeline with retries + fallback routes, and `defaults`/`observability`/
`capture` plugins — keeping React Email for templates.

## Consequences

- No copyleft (AGPL) obligation on a proprietary product or an MIT template.
- We own and test the send pipeline (zero extra runtime deps; validated with
  `bun test`).
- We forgo that SDK's 20 provider adapters; we add adapters as needed.
