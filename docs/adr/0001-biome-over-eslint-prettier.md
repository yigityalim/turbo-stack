# 0001. Biome over ESLint + Prettier

- Status: Accepted
- Date: 2026-06-30

## Context

The create-turbo scaffold shipped Prettier (and implied ESLint via shared
config packages). We needed lint + format across a bun/Turbo monorepo with low
config overhead and fast feedback.

## Decision

Use [Biome](https://biomejs.dev) as the single lint + format tool, configured
once at the repo root (`biome.json`). Drop Prettier and ESLint.

## Consequences

- One fast Rust-based tool instead of two JS toolchains; less config, less
  dependency surface (fits the supply-chain posture).
- A single root `biome.json` is the monorepo-correct setup; we deliberately did
  not create a shared `biome-config` package (resolution fragility, little gain).
- Editor + hooks + CI all run Biome (`bun run check`).
