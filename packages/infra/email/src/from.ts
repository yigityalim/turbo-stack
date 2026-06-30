/**
 * Single source for every outgoing sender address. Set `EMAIL_DOMAIN` and
 * verify that one domain in Resend (SPF + DKIM + DMARC) — all senders then work.
 *
 * monitored = replies are read (support, security); noreply = transactional
 * default whose replies are not watched.
 */
const EMAIL_DOMAIN = process.env.EMAIL_DOMAIN || "example.com";

export type EmailFromKind = "noreply" | "support" | "security";

const REGISTRY: Record<EmailFromKind, { prefix: string; display: string }> = {
  noreply: { prefix: "noreply", display: "Turbo Stack" },
  support: { prefix: "support", display: "Turbo Stack Support" },
  security: { prefix: "security", display: "Turbo Stack Security" },
};

export function emailFrom(kind: EmailFromKind): string {
  const { prefix, display } = REGISTRY[kind];
  return `${display} <${prefix}@${EMAIL_DOMAIN}>`;
}
