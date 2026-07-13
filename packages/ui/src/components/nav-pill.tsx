import { cn } from "@repo/ui/lib/utils";
import { Slot } from "radix-ui";
import type * as React from "react";

/**
 * Floating bottom navigation — a centered, auto-width rounded pill with a soft
 * shadow and backdrop blur, per DESIGN.md ("Quiet Precision"). Compose with
 * `NavPillItem`; the chrome floats rather than spanning edge to edge.
 */
function NavPill({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="nav-pill"
      className={cn(
        "-translate-x-1/2 fixed bottom-5 left-1/2 z-50 flex items-center gap-1 rounded-full border border-border bg-card/80 p-1 shadow-lg backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}

interface NavPillItemProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  active?: boolean;
}

/** A single pill item. Pass `asChild` to render a router `<Link>`; set `active` for the current route. */
function NavPillItem({ className, asChild = false, active = false, ...props }: NavPillItemProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="nav-pill-item"
      data-active={active}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export { NavPill, NavPillItem };
