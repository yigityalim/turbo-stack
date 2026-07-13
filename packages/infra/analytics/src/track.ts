import { track as vercelTrack } from "@vercel/analytics";
import posthog from "posthog-js";
import { isActive, selectedChannel } from "./channel";

export type AnalyticsProperties = Record<string, string | number | boolean | null>;

/**
 * Track a custom event across the active provider(s) (PostHog + Vercel). Runs on
 * the client only — call it from event handlers, not server components.
 */
export function track(event: string, properties?: AnalyticsProperties): void {
  const channel = selectedChannel();
  if (isActive("posthog", channel)) posthog.capture(event, properties);
  if (isActive("vercel", channel)) vercelTrack(event, properties);
}

/** Associate the current client with a known user id (PostHog). */
export function identify(distinctId: string, properties?: AnalyticsProperties): void {
  if (isActive("posthog", selectedChannel())) posthog.identify(distinctId, properties);
}
