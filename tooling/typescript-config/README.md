# @repo/typescript-config

Shared TypeScript configuration bases for the monorepo. A **config package** —
it ships `.json` files only, so (by design) it has no `src/` and no build step.

## Bases

| File | Extend with | For |
| --- | --- | --- |
| `base.json` | `@repo/typescript-config/base.json` | any TS package |
| `library.json` | `@repo/typescript-config/library.json` | internal libraries (JIT, `noEmit`) |
| `react-library.json` | `@repo/typescript-config/react-library.json` | React component libraries |
| `nextjs.json` | `@repo/typescript-config/nextjs.json` | Next.js apps |

## Usage

```jsonc
// packages/<group>/<pkg>/tsconfig.json
{
  "extends": "@repo/typescript-config/library.json",
  "include": ["src"]
}
```

Add it as a dev dependency: `"@repo/typescript-config": "workspace:*"`.
The repo root `tsconfig.json` extends `base.json` directly for IDE/root tooling.
