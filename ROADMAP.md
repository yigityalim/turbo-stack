# Roadmap

High-level direction for the Turbo Stack monorepo. This is intentionally light;
detailed work is tracked in issues.

## Now — Foundation

- [x] Monorepo root tooling (Biome, Turbo, Bun, knip, lefthook, changesets).
- [x] Repository governance and CI.
- [x] Grouped workspaces + `tooling/` (`typescript-config`, `tsup-config`).
- [ ] First app under `apps/web` (the primary web interface).
- [ ] Shared `packages/ui`.

## Next — Product surfaces

- [ ] Additional apps as the product requires (admin, docs, …).
- [ ] Supabase integration (schema, auth, RLS) wired through a shared package.
- [ ] Design system tokens and component library.

## Later

- [ ] Observability and analytics.
- [ ] End-to-end test suite.

## Native code (Rust)

- [x] Rust foundation: `crates/` Cargo workspace, **WASM-first** (wasm-bindgen),
      opt-in build (not in `bun run build`) + dedicated `rust.yml` CI. Example
      crate: `hashing`.
- [ ] NAPI-RS path (native server addons) — documented as the alternative; add
      when a native-only, non-edge need appears (entails a prebuilt-binary CI
      matrix).
- [ ] First real wasm consumer wired into an app.

Status legend: `[ ]` planned · `[x]` done.
