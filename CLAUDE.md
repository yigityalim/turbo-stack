# CLAUDE.md

Guidance for AI agents (and humans) working in this repository.

## What this is

`turbo-stack` — a bun + Turborepo monorepo for the Turbo Stack company's web
interfaces. `apps/*` hold deployable apps; `packages/*` hold shared code.

## Hard rules

- **Bun only.** Never npm/npx/pnpm/yarn. Add deps with `bun add <pkg>`
  (`-d` for dev); run CLIs with `bunx`.
- **Biome** for lint + format (not ESLint/Prettier). `bun run check` /
  `bun run format`.
- **English identifiers** — routes, functions, vars, files. Turkish appears
  only in user-visible UI strings.
- **Comments:** English TSDoc on declarations where it adds value. No `//` or
  `/* */` inline comments; no decorative separator banners.
- **classNames** are composed with `cn()` — no template-literal/concat.
- **Commits:** Conventional Commits, English, no AI attribution trailers.
  Don't commit or push unless explicitly asked — changes accumulate and are
  squashed by the maintainer.
- **Secrets/deploys** belong to the maintainer. Don't read `.env.local`, don't
  apply migrations or run deploys. Deliver files; the maintainer runs them.
- **Supabase MCP** is off for this project unless explicitly requested — give
  SQL to run instead. Migrations via `supabase migration new <name>` CLI.

## Common commands

```sh
bun install            # install (requires the Socket scanner — see bunfig.toml)
bun run dev            # all apps in dev
bun run build          # build all workspaces
bun run check          # Biome lint + format check
bun run type-check     # TS across workspaces
bun run knip           # dead code / unused deps
```

Target a single workspace with `--filter`, e.g. `bun run dev --filter=web`.

## Conventions reference

See CONTRIBUTING.md (workflow), ARCHITECTURE.md (layout), DESIGN.md (UI bar).
Don't reflexively run `build` after every edit — trust the diff.
