import { sendEmail } from "@repo/email";
import { sleep } from "workflow";

/** Send the welcome email — a retryable step with full Node access. */
async function sendWelcome(email: string): Promise<void> {
  "use step";
  await sendEmail({
    to: email,
    subject: "Welcome to Turbo Stack",
    text: "Thanks for signing up — you're all set.",
  });
}

/** Nudge the new user a day later with a getting-started tip. */
async function sendFollowUp(email: string): Promise<void> {
  "use step";
  await sendEmail({
    to: email,
    subject: "Getting started",
    text: "A few things to try next in your new app.",
  });
}

/**
 * Durable onboarding flow: welcome now, a tip a day later. It survives restarts
 * and deploys — the `sleep` doesn't hold a serverless function open. Each step
 * retries independently. Kick it off with `start(welcomeWorkflow, [email])`.
 */
export async function welcomeWorkflow(email: string): Promise<void> {
  "use workflow";
  await sendWelcome(email);
  await sleep("1d");
  await sendFollowUp(email);
}
