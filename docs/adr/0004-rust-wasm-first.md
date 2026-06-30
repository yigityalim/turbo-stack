# 0004. Rust integration is WASM-first

- Status: Accepted
- Date: 2026-06-30

## Context

Rust is increasingly useful in web projects (hot paths, parsers, crypto). Two
integration styles exist: WASM (browser/Node/edge) and NAPI-RS (native Node
addon). The stack targets Vercel/Next/edge.

## Decision

Rust lives in a `crates/` Cargo workspace, integrated **WASM-first** via
`wasm-bindgen` + `wasm-pack`. NAPI-RS is documented as the alternative for
native-only server perf. Rust is **opt-in**: not part of `bun run build`
(root `build:wasm`/`rust:check` scripts + a dedicated `rust.yml` CI that only
runs on `crates/**` changes).

## Consequences

- One wasm artifact runs everywhere (browser, Node, edge) — no per-platform
  binary matrix; NAPI would require one and excludes edge.
- Contributors without the Rust toolchain are unaffected by default builds.
- CI must use `actions-rust-lang/setup-rust-toolchain` (pinnable);
  `dtolnay/rust-toolchain@stable` is a moving ref and cannot be SHA-pinned.
