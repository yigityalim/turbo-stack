import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

/** Email palette — mirrors the product tokens in the root DESIGN.md. */
export const emailColors = {
  ink: "#15171A",
  slate: "#5B616E",
  accent: "#0B5E4E",
  neutral: "#F4F5F3",
  surface: "#FFFFFF",
  hairline: "#E6E7E4",
} as const;

const fontFamily =
  '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export function EmailLayout({ preview, children }: { preview: string; children: ReactNode }) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: emailColors.neutral,
          fontFamily,
          margin: 0,
          padding: "32px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: emailColors.surface,
            borderRadius: 16,
            maxWidth: 480,
            margin: "0 auto",
            padding: 32,
          }}
        >
          {children}
          <Hr style={{ borderColor: emailColors.hairline, margin: "28px 0 16px" }} />
          <Text style={{ fontSize: 12, color: emailColors.slate, margin: 0 }}>Turbo Stack</Text>
        </Container>
      </Body>
    </Html>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: 600,
        color: emailColors.ink,
        margin: "0 0 12px",
      }}
    >
      {children}
    </Text>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 15,
        lineHeight: "24px",
        color: emailColors.ink,
        margin: "0 0 16px",
      }}
    >
      {children}
    </Text>
  );
}

export function CTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Section style={{ margin: "8px 0 4px" }}>
      <Button
        href={href}
        style={{
          backgroundColor: emailColors.accent,
          color: emailColors.surface,
          borderRadius: 9999,
          padding: "12px 22px",
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {children}
      </Button>
    </Section>
  );
}
