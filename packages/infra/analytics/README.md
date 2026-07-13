# @repo/analytics

Product + web analytics behind one API with two providers — PostHog (events,
identify, feature flags) and Vercel Analytics (web vitals, page views). Both
ship; choose which run via `NEXT_PUBLIC_ANALYTICS_PROVIDER`
(`posthog` | `vercel` | `both` | `none`, default `both`) or the `channel` prop.

Apps consuming this package add it to `transpilePackages` in `next.config.ts`.

## Wire it up

`app/layout.tsx` — wrap the app once (client boundary handled internally):

```tsx
import { AnalyticsProvider } from "@repo/analytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
```

Pin a provider explicitly to override the env default:

```tsx
<AnalyticsProvider channel="posthog">{children}</AnalyticsProvider>
```

## Track events

```ts
"use client";
import { identify, track } from "@repo/analytics";

track("signup_completed", { plan: "pro" });
identify(user.id, { email: user.email });
```

`track` / `identify` fan out to whichever provider(s) are active.

## Env

`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` (PostHog) and
`NEXT_PUBLIC_ANALYTICS_PROVIDER` (selection) — all optional, validated in
`@repo/env`. Vercel Analytics needs no env when deployed on Vercel.
