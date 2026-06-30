# crates

The Rust home of the monorepo — a Cargo workspace, separate from the JS/Bun
workspaces. Add a crate here and register it in `Cargo.toml` `members`.

## Default: WebAssembly

WASM is the default way Rust reaches the product: one artifact runs in the
browser, Node, and the edge (Vercel Edge included) — no per-platform binary
matrix. Crates use `wasm-bindgen` and `crate-type = ["cdylib", "rlib"]`.

**Build a crate to an npm-consumable package:**

```sh
bun run build:wasm        # wasm-pack build crates/hashing --target bundler --out-dir pkg
```

This emits `crates/<name>/pkg/` (gitignored). An app consumes it by importing
the generated package, or by pointing wasm-pack's `--out-dir` straight into the
app that needs it. Requires the Rust toolchain (`rust-toolchain.toml` pins it)
and [`wasm-pack`](https://rustwasm.github.io/wasm-pack/).

## Alternative: NAPI-RS (native Node addon)

When you need maximum **server-side** native performance and don't target the
browser/edge, use [NAPI-RS](https://napi.rs) instead: it builds a `.node`
binary. Trade-off — native addons need **per-platform prebuilt binaries**
(a build matrix in CI) and don't run on Vercel Edge. Prefer WASM unless you
specifically need native server perf.

## Opt-in by design

Rust is **not** part of the default `bun run build` — building it needs the
Rust toolchain, which most contributors won't have. Crates build via
`bun run build:wasm` / `cargo` and are verified by their own CI
(`.github/workflows/rust.yml`), which only runs when `crates/**` changes.

## Local checks

```sh
bun run rust:check        # cargo check (whole workspace)
cd crates && cargo test   # run unit tests
cd crates && cargo clippy --all-targets -- -D warnings
```
