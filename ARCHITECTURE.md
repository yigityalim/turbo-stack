# Architecture

A bun + Turborepo monorepo holding the web interfaces for Turbo Stack.

## Layout

Workspaces are organized by **domain groups**, not one flat folder. A group
folder (`marketing`, `core`, `infra`) is a namespace, not a package — it is
registered as a glob in the root `package.json` `workspaces`.

```
turbo-stack/
├── apps/                  # deployable applications
│   ├── <app>/             #   flat: e.g. apps/web
│   └── marketing/<app>/   #   grouped by surface: apps/marketing/{web,auth}
├── packages/              # shared internal packages (@repo/*)
│   ├── <pkg>/             #   flat, cross-cutting: ui, utils, types
│   ├── core/<pkg>/        #   domain/business logic (framework-agnostic)
│   └── infra/<pkg>/       #   infrastructure adapters: db, cache, email
├── tooling/<pkg>/         # shared dev config: typescript-config, biome-config
├── docs/                  # documentation (see environment.md)
├── scripts/               # repo automation (bun/bash)
├── turbo/generators/      # `turbo gen` scaffolders
├── .changeset/            # release management
├── .github/               # CI + templates
├── tsconfig.json          # shared TypeScript base (workspaces extend this)
├── turbo.json             # task pipeline
├── biome.json             # lint + format
└── package.json           # workspace root + catalog
```

Each group's `README.md` documents its purpose. Add a new group by registering
its glob (e.g. `packages/payments/*`) in `workspaces`.

## Conventions

- **Workspaces:** resolved by Bun from the `workspaces` globs (flat + grouped +
  `tooling/*`). Internal packages are referenced as `@repo/<name>` with
  `workspace:*`. Scaffold with `bun run gen`.
- **Tasks:** defined in `turbo.json` (`build`, `dev`, `lint`, `type-check`,
  `test`). `^build` builds dependencies first. `lint`/`type-check` use a
  virtual `transit` node so they run in parallel while still busting cache when
  a dependency's source changes. Caching is on except for `dev`.
- **Boundaries:** apps depend on packages, never the reverse; `core` is
  framework-agnostic and must not import `infra` or app code. Shared logic lives
  in `packages/*` so apps stay thin.
- **TypeScript:** every workspace extends the root `tsconfig.json` (generated
  packages compute the correct relative depth automatically).
- **Environment:** no root `.env`; each app owns its vars and declares them in
  `turbo.json`. See [docs/environment.md](docs/environment.md).

## Stack (intended)

Next.js + React, Supabase (DB/auth), Tailwind + shadcn (on Base UI), deployed on
Vercel. Apps are added incrementally — see ROADMAP.md.
