# @repo/observability

Error and performance monitoring — a thin wrapper over
[`@sentry/nextjs`](https://docs.sentry.io/platforms/javascript/guides/nextjs/).
`initSentry()` and `withSentry()` read config from `@repo/env`; the package also
re-exports everything from `@sentry/nextjs` (`captureException`, `replayIntegration`, …).

Both helpers are safe no-ops when the DSN / auth token are absent, so local dev
and builds without Sentry never send events or fail.

## App wiring (Next.js App Router, SDK v10)

**`next.config.ts`**

```ts
import { withSentry } from "@repo/observability";
import type { NextConfig } from "next";

const nextConfig: NextConfig = { reactCompiler: true };

export default withSentry(nextConfig);
```

**`instrumentation-client.ts`** (browser)

```ts
import { captureRouterTransitionStart, initSentry, replayIntegration } from "@repo/observability";

initSentry({
  integrations: [replayIntegration()],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
});

export const onRouterTransitionStart = captureRouterTransitionStart;
```

**`sentry.server.config.ts`** and **`sentry.edge.config.ts`**

```ts
import { initSentry } from "@repo/observability";

initSentry();
```

**`instrumentation.ts`** (server/edge registration + error hook)

```ts
import { captureRequestError } from "@repo/observability";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") await import("./sentry.server.config");
  if (process.env.NEXT_RUNTIME === "edge") await import("./sentry.edge.config");
}

export const onRequestError = captureRequestError;
```

## Env

`NEXT_PUBLIC_SENTRY_DSN` (client), `SENTRY_DSN` (server), and for source-map
upload `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` — all optional,
validated in `@repo/env`.
