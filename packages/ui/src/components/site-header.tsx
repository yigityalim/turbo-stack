import { cn } from "@repo/ui/lib/utils";
import type * as React from "react";

/**
 * Contained glass header — a sticky bar with margin (not edge-to-edge), a
 * hairline border, soft shadow, and backdrop blur, per DESIGN.md. Put brand /
 * nav / actions inside as children.
 */
function SiteHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="site-header"
      className={cn(
        "sticky top-3 z-40 mx-3 flex h-14 items-center justify-between gap-4 rounded-lg border border-border bg-card/70 px-4 shadow-sm backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}

export { SiteHeader };
