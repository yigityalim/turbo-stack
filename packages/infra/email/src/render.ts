import { render } from "@react-email/render";
import type { ReactElement } from "react";

/** Render a React Email template to an HTML string. */
export function renderEmail(template: ReactElement): Promise<string> {
  return render(template);
}
