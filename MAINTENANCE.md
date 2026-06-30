# Maintenance

Operational notes for keeping the monorepo healthy.

## Routine

| Task | Command | When |
| --- | --- | --- |
| Install deps | `bun install` | after pulling, or lockfile change |
| Format + lint | `bun run check` | before every commit (also via hook) |
| Type check | `bun run type-check` | before push (also via hook) |
| Dead code / deps | `bun run knip` | periodically, before releases |
| Dependency audit | `bun audit` | periodically, in CI |
| Missing deps scan | `bun run checkdeps` | after adding imports |

## Dependencies

- Add with `bun add <pkg>` (`-d` for dev). Never npm/npx/pnpm/yarn.
- `bunfig.toml` pins exact versions and enforces a release-age gate + a
  security scanner. Honor those when bumping.
- Use `overrides` in `package.json` to pin transitive deps when needed.
- Keep the catalog (when introduced) as the single source of shared versions.

## Releases

- Record changes with `bun run changeset`.
- `bun run version-packages` consumes changesets and updates CHANGELOG.
- One clean, versioned commit per release.

## CI

GitHub Actions runs format check, type check, lint, and audit on every push
and PR to `main`. Turbo's cache is restored between runs.
