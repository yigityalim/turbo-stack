# Package Conventions

Every internal package shares the same shape (the "common language"). Scaffold
with `bun run gen` so you never assemble this by hand.

## Common structure

```
<group>/<name>/
├── package.json      # @repo/<name>, version 0.0.0, private, UNLICENSED
├── README.md         # what it is, how to use it
├── CHANGELOG.md      # managed by changesets
├── tsconfig.json     # extends @repo/typescript-config/*
└── src/
    ├── index.ts      # the entry point
    └── index.test.ts # bun:test
```

- **Naming:** `@repo/<name>`, `"private": true`, `"version": "0.0.0"`.
- **Source lives in `src/`** — always. `tsconfig.json` includes `src`.
- **Versioning:** every package is versioned and carries a `CHANGELOG.md`,
  managed by [changesets](https://github.com/changesets/changesets) — run
  `bun run changeset` to record a change.
- **Scripts:** `lint` (`biome check .`), `type-check` (`tsc --noEmit`), `test`
  (`bun test`). Turbo runs them across the workspace.

## Build strategy: JIT by default, tsup only when shipping

- **Internal packages (default) — JIT.** No build step. `exports` points at
  `./src/index.ts`; consumers compile the TypeScript through their own bundler.
  This is the vast majority of packages.
- **CLI and public/published packages — tsup.** These ship compiled output.
  `exports` points at `./dist`, `build` runs `tsup`, and the config comes from
  [`@repo/tsup-config`](../tooling/tsup-config/README.md). Use tsup **only**
  here — never for internal packages.

## Config packages are the exception

`tooling/typescript-config` (and any future `biome-config`) ship `.json` files
only — no `src/`, no build. They still get a README, version, and CHANGELOG.

## TypeScript

Extend the shared base by name (depth-independent):

```jsonc
{ "extends": "@repo/typescript-config/library.json", "include": ["src"] }
```

Variants: `library` (internal), `react-library` (components), `nextjs` (apps).

## Native code (Rust → WASM / NAPI)

Rust lives in [`crates/`](../crates/README.md) as a Cargo workspace, built
**opt-in** (not part of `bun run build`). The default integration is **WASM**
(one artifact for browser/Node/edge); **NAPI-RS** is the native-server
alternative. It has its own CI (`rust.yml`). See
[crates/README.md](../crates/README.md).
