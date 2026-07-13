"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

/** Class-based dark mode with system default; wrap the app root once. */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export { useTheme } from "next-themes";
