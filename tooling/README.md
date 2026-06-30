# tooling

Shared development tooling as internal packages — e.g. `typescript-config`,
`biome-config`, and code generators. Kept separate from runtime `packages/*` so
dev config never leaks into shipped code. A workspace root, registered as
`tooling/*`.
