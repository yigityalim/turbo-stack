# @repo/ui

Shared UI — Tailwind v4 design tokens + a shadcn-style component library
(~49 components: form, dialog, dropdown, command, table, sonner, charts, …).
JIT (no build): apps import the source and compile it through their own Tailwind.

## Use in an app

```ts
// app/layout.tsx — pull in the shared tokens
import "@repo/ui/globals.css";
```

Tell Next to compile this package's classes (it ships TS, not built CSS) by
adding it to `transpilePackages` in `next.config.ts`:
`transpilePackages: ["@repo/ui"]`.

Components are exported per-file (no barrel) — import the exact path:

```tsx
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";

<Card>
  <CardHeader>
    <CardTitle>Hello</CardTitle>
  </CardHeader>
  <CardContent>
    {/* `brand` is the single jade accent action; sizes: xs/sm/default/lg/xl */}
    <Button variant="brand" size="lg">
      Go
    </Button>
  </CardContent>
</Card>;
```

Dark mode ships via `next-themes` — wrap the app in `ThemeProvider`
(`@repo/ui/components/theme-provider`); tokens flip under the `.dark` class.

The DESIGN.md floating chrome lives in `nav-pill` (centered bottom pill —
`NavPill` + `NavPillItem`) and `site-header` (contained glass `SiteHeader`).

## Tokens

`src/globals.css` is the single source of truth — brand tokens (ink/jade/
neutral) + shadcn-style semantic aliases (`background`, `primary`, `ring`,
`brand`, `sidebar`, `chart-*`, …), mirroring the root
[DESIGN.md](../../DESIGN.md). The jade accent maps to `--brand`; shadcn
`--accent` stays a quiet neutral. Re-theme by editing the hex values in
`:root`/`.dark`. Compose every className with `cn()`.

Add more components by hand or with the shadcn CLI (point its config at
`src/globals.css` and `@repo/ui`).
