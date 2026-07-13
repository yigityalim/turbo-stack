"use client";

import { analyticsEnv } from "@repo/env";
import { Analytics } from "@vercel/analytics/next";
import posthog from "posthog-js";
import { type ReactNode, useEffect } from "react";
import { type AnalyticsChannel, isActive, selectedChannel } from "./channel";

let posthogReady = false;

/** Init PostHog once on the client, when a key is configured. */
function ensurePostHog(): void {
  if (posthogReady) return;
  const key = analyticsEnv.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  posthog.init(key, { api_host: analyticsEnv.NEXT_PUBLIC_POSTHOG_HOST });
  posthogReady = true;
}

export interface AnalyticsProviderProps {
  children: ReactNode;
  /** Override the `NEXT_PUBLIC_ANALYTICS_PROVIDER` selection. */
  channel?: AnalyticsChannel;
}

/**
 * Mounts the selected analytics provider(s). PostHog (product analytics) inits on
 * the client; Vercel Analytics (web vitals / page views) renders its script.
 * Choose the provider with the `channel` prop or `NEXT_PUBLIC_ANALYTICS_PROVIDER`
 * (default "both"). Wrap the app root once, below `children`.
 */
export function AnalyticsProvider({ children, channel }: AnalyticsProviderProps) {
  const active = channel ?? selectedChannel();
  const usePosthog = isActive("posthog", active);

  useEffect(() => {
    if (usePosthog) ensurePostHog();
  }, [usePosthog]);

  return (
    <>
      {children}
      {isActive("vercel", active) ? <Analytics /> : null}
    </>
  );
}
