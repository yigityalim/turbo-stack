import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Validation is skipped at build/CI time (set `SKIP_ENV_VALIDATION`) and in
 * tests, so importing a schema never throws without real values present.
 */
const skipValidation = !!process.env.SKIP_ENV_VALIDATION || process.env.NODE_ENV === "test";

const shared = { emptyStringAsUndefined: true, skipValidation } as const;

export const baseEnv = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().min(1).optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  ...shared,
});

export const supabaseEnv = createEnv({
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string().min(1),
    /** Optional per-app auth storage key so apps sharing a domain don't collide. */
    NEXT_PUBLIC_SUPABASE_STORAGE_KEY: z.string().min(1).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    NEXT_PUBLIC_SUPABASE_STORAGE_KEY: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_KEY,
  },
  ...shared,
});

export const supabaseAdminEnv = createEnv({
  server: {
    SUPABASE_SECRET_KEY: z.string().min(1),
  },
  runtimeEnv: {
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  },
  ...shared,
});

export const resendEnv = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1).optional(),
    EMAIL_DOMAIN: z.string().min(1).optional(),
  },
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_DOMAIN: process.env.EMAIL_DOMAIN,
  },
  ...shared,
});

export const analyticsEnv = createEnv({
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
    /** Which provider(s) `@repo/analytics` mounts. Defaults to "both". */
    NEXT_PUBLIC_ANALYTICS_PROVIDER: z.enum(["posthog", "vercel", "both", "none"]).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_ANALYTICS_PROVIDER: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
  },
  ...shared,
});

export const upstashEnv = createEnv({
  server: {
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  },
  runtimeEnv: {
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
  ...shared,
});

export const sentryEnv = createEnv({
  server: {
    SENTRY_DSN: z.string().url().optional(),
    SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
    /** Org/project slugs for source-map upload via `withSentryConfig`. */
    SENTRY_ORG: z.string().min(1).optional(),
    SENTRY_PROJECT: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },
  runtimeEnv: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  ...shared,
});
