# 0006. JIT packages by default; tsup only for CLI/public

- Status: Accepted
- Date: 2026-06-30

## Context

Internal packages can either ship compiled output (a build step) or export
TypeScript source directly (JIT), letting the consuming app's bundler compile
them. A build step per package adds latency and config for little gain when
everything is bundled by one app.

## Decision

Internal packages are **JIT by default**: `exports` points at `./src/index.ts`,
no build. Only **CLI and public/published** packages use a bundler (tsup, via
`@repo/tsup-config`), shipping `./dist`. Config packages (typescript-config)
ship JSON only.

## Consequences

- Most packages have no build step — faster, simpler, fewer moving parts.
- Type-check/lint use a virtual `transit` task so they parallelize while still
  busting cache on dependency source changes.
- The `turbo gen` generator scaffolds the JIT shape; tsup is opt-in per package.
