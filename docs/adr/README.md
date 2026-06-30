# Architecture Decision Records

Short, append-only records of significant decisions — the *why* behind the
repo's shape. New decisions get the next number; supersede rather than rewrite.

Copy [`0000-template.md`](0000-template.md) for a new ADR.

| # | Decision | Status |
| --- | --- | --- |
| [0001](0001-biome-over-eslint-prettier.md) | Biome over ESLint + Prettier | Accepted |
| [0002](0002-grouped-workspaces.md) | Domain-grouped workspaces + `tooling/` | Accepted |
| [0003](0003-no-root-env.md) | No root `.env`; per-app env | Accepted |
| [0004](0004-rust-wasm-first.md) | Rust integration is WASM-first | Accepted |
| [0005](0005-build-email-not-agpl-sdk.md) | Build our own email seam, not the AGPL SDK | Accepted |
| [0006](0006-jit-default-tsup-for-publishables.md) | JIT packages by default; tsup only for CLI/public | Accepted |
