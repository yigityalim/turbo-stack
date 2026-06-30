export { type ResendAdapterConfig, resend } from "./adapters/resend";
export { createMailer, type Mailer, type MailerConfig } from "./client";
export * from "./emails";
export { EmailSendError, EmailValidationError } from "./errors";
export { type EmailFromKind, emailFrom } from "./from";
export { renderEmail } from "./render";
export { sendEmail } from "./send";
export * from "./types";

// Adapters, plugins, and the testing helpers are also available as dedicated
// entry points so you import only what you use:
//   @repo/email/resend
//   @repo/email/testing
//   @repo/email/plugins/{defaults,observability,capture}
