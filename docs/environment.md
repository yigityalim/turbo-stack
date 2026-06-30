# Environment Variables

This repo follows Turborepo's environment best practices. **There is no root
`.env`** — a root env file implicitly couples every package and invalidates the
whole cache on any change. Each app/package owns the variables it needs.

## Where env lives

- Each app/package that reads env keeps its own `.env*` files and a committed
  `.env.example` listing every variable it consumes. Real values go in
  `.env.local` (gitignored).
- Turbo does **not** load `.env` files — your framework (e.g. Next.js) does.
  Turbo only needs to *know about* them for caching (see `inputs`).

## Declaring vars in `turbo.json`

Strict mode is the default: a task only sees the variables it declares.

- **`globalEnv`** — variables that affect *every* task's output hash
  (e.g. `NODE_ENV`). Keep this small.
- **`globalPassThroughEnv`** — variables available at runtime but *not* hashed
  (e.g. `CI`, `VERCEL`, `VERCEL_ENV`). They don't change build output.
- **Task-level `env`** — build-affecting variables for a specific task. Declare
  these in the app's own `turbo.json` (Package Configuration), not the root,
  so it's clear which app needs what.
- **`inputs`** — the `build` task includes `.env` / `.env.*` so a value change
  busts the cache.
- Framework public vars (`NEXT_PUBLIC_*`) are auto-inferred by Turbo.

## Validation

Validate and type env per app with [`@t3-oss/env-nextjs`](https://env.t3.gg) +
`zod` (in the catalog). Parse `process.env` once at the app boundary and import
the typed object everywhere else — never read `process.env` directly in app
code.

## Example (added when the first app lands)

```jsonc
// apps/web/turbo.json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "env": ["DATABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"]
    }
  }
}
```
