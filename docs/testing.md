# Testing

This is a bun-only repo, so tests use the **native `bun test`** runner — no
vitest/jest.

## Unit tests

- Colocate tests as `*.test.ts` next to the source they cover.
- Import from `bun:test`:

  ```ts
  import { expect, test } from "bun:test";

  test("adds", () => {
    expect(1 + 1).toBe(2);
  });
  ```

- Each package exposes a `"test": "bun test"` script. `turbo run test`
  (root `bun run test`) runs them across all workspaces; CI runs it on every
  push/PR. New packages scaffolded with `turbo gen` come with the test script
  and a sample test already wired.

## Coverage

Coverage is opt-in:

```sh
bun test --coverage
```

Reporters and output dir are configured in `bunfig.toml` under `[test]`
(`text` + `lcov`, written to `coverage/`).

## End-to-end (later)

E2E tests need a running app, so they land with the first app under `apps/*`.
The intended tool is **Playwright** (`playwright.config.ts` at the repo root,
`bun add -d @playwright/test`). Not set up yet — see ROADMAP.md.
