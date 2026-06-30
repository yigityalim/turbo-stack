# @repo/ui

Shared UI — Tailwind v4 design tokens + shadcn-style components. JIT (no build):
apps import the source and compile it through their own Tailwind.

## Use in an app

```ts
// app/layout.tsx — pull in the shared tokens
import "@repo/ui/globals.css";
```

Tell Tailwind/Next to compile this package's classes (it ships TS, not built
CSS classes) by adding it to `transpilePackages` in `next.config.ts`:
`transpilePackages: ["@repo/ui"]`.

```tsx
import { Button, Card, CardTitle, cn } from "@repo/ui";

<Card>
  <CardTitle>Hello</CardTitle>
  <Button variant="accent" size="pill">Go</Button>
</Card>;
```

## Tokens

`src/globals.css` is the single source of truth — brand tokens (ink/jade/
neutral) + shadcn-style semantic aliases (`background`, `primary`, `ring`, …),
mirroring the root [DESIGN.md](../../DESIGN.md). Re-theme by editing the hex
values. Compose every className with `cn()`.

Add more components by hand or with the shadcn CLI (point its config at
`src/globals.css` and `@repo/ui`).
