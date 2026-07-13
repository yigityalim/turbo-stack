import { sentryEnv } from "@repo/env";
import * as Sentry from "@sentry/nextjs";

type SentryInitOptions = NonNullable<Parameters<typeof Sentry.init>[0]>;

/**
 * Initialise Sentry with the DSN from `@repo/env` and sensible defaults. Call it
 * from each runtime entry (`instrumentation-client.ts`, `sentry.server.config.ts`).
 * A no-op when no DSN is configured, so local dev without Sentry sends nothing.
 * Layer client-only integrations (replay, feedback) via `overrides`.
 */
export function initSentry(overrides: SentryInitOptions = {}): void {
  const dsn = sentryEnv.NEXT_PUBLIC_SENTRY_DSN ?? sentryEnv.SENTRY_DSN;
  if (!dsn) return;
  Sentry.init({
    dsn,
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1 : 0.1,
    enableLogs: true,
    ...overrides,
  });
}

/**
 * Wrap a Next.js config with Sentry. Source-map upload uses the org/project/token
 * from `@repo/env` and is silent locally — a no-op build step when the token is
 * absent, so builds without Sentry never fail.
 */
export function withSentry<T>(nextConfig: T): T {
  return Sentry.withSentryConfig(nextConfig, {
    org: sentryEnv.SENTRY_ORG,
    project: sentryEnv.SENTRY_PROJECT,
    authToken: sentryEnv.SENTRY_AUTH_TOKEN,
    silent: !process.env.CI,
  }) as T;
}

export * from "@sentry/nextjs";
