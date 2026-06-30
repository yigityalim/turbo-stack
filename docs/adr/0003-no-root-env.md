# 0003. No root `.env`; per-app environment

- Status: Accepted
- Date: 2026-06-30

## Context

A root `.env` (or `.env.example`) implicitly couples every package to one set of
variables and makes cache invalidation coarse — a Turborepo anti-pattern, even
for starter templates.

## Decision

No root env file. Each app/package owns its `.env*` and a committed
`.env.example`. `turbo.json` declares variables explicitly (`globalEnv`,
`globalPassThroughEnv`, per-task `env`); strict mode is the default. Validation
and typing happen per app via `@t3-oss/env` + zod (`@repo/env`).

## Consequences

- It's always clear which app needs which variables; cache invalidation is
  scoped.
- The root `.env.example` was removed; `docs/environment.md` documents the
  strategy.
- The broad `globalDependencies: ["**/.env.*local"]` was dropped in favor of
  task-level `inputs`.
