import { CTA, EmailLayout, Heading, Paragraph } from "./layout";

interface WelcomeEmailProps {
  name: string;
  appUrl?: string;
}

export default function WelcomeEmail({ name, appUrl = "https://example.com" }: WelcomeEmailProps) {
  return (
    <EmailLayout preview="Welcome to Turbo Stack">
      <Heading>Welcome, {name}</Heading>
      <Paragraph>
        Your account is ready. Jump back in whenever you like — everything is set up and waiting.
      </Paragraph>
      <CTA href={appUrl}>Open Turbo Stack</CTA>
    </EmailLayout>
  );
}

WelcomeEmail.PreviewProps = { name: "Jane Doe" } satisfies WelcomeEmailProps;
