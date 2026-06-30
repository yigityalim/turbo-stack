# 0002. Domain-grouped workspaces + `tooling/`

- Status: Accepted
- Date: 2026-06-30

## Context

A flat `packages/*` doesn't scale: dozens of packages become an undifferentiated
list. We wanted packages organized by domain, plus a home for shared dev config
separate from runtime code.

## Decision

Organize workspaces by **domain group** using explicit globs (per Turborepo
guidance — not nested `**`): `apps/*` + `apps/<surface>/*`, `packages/*` +
`packages/core/*` (domain) + `packages/infra/*` (adapters), and `tooling/*`
(shared dev config). A group folder is a namespace, not a package; add a group
by registering its glob in `workspaces`.

## Consequences

- Clear separation: `core` is framework-agnostic, `infra` wraps I/O, `tooling`
  holds config (typescript-config, tsup-config).
- Adding a group is an explicit one-line workspace edit (matches the mental
  model "you add it in the workspace").
- The `turbo gen` package generator prompts for the target group.
