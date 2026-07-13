import { analyticsEnv } from "@repo/env";

/** Which analytics provider(s) are active. */
export type AnalyticsChannel = "posthog" | "vercel" | "both" | "none";

/** Resolve the configured channel from env, defaulting to "both". */
export function selectedChannel(): AnalyticsChannel {
  const value = analyticsEnv.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  if (value === "posthog" || value === "vercel" || value === "none") return value;
  return "both";
}

/** Whether a given provider is active for `channel`. */
export function isActive(provider: "posthog" | "vercel", channel: AnalyticsChannel): boolean {
  if (channel === "none") return false;
  if (channel === "both") return true;
  return channel === provider;
}
