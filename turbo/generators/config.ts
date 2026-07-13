import type { PlopTypes } from "@turbo/gen";

/**
 * Turbo generators. Run with `turbo gen` / `bun run gen` (requires `@turbo/gen`).
 *
 * - `package`   — internal package: library (JIT), react-library (JIT + DOM/JSX),
 *   or publishable (compiled with tsup via `@repo/tsup-config`).
 * - `app`       — a Next.js app or a Hono API. Expo apps use the official CLI
 *   (`bunx create-expo-app`) plus a workspace-aware `metro.config.js`, not a
 *   hand-maintained template (SDK-locked, native config).
 * - `component` — a `@repo/ui` component.
 * - `crate`     — a Rust crate, registered in the `crates/` Cargo workspace.
 */

const PACKAGE_KINDS = [
  { name: "library — JIT, exported from src (no build)", value: "library" },
  { name: "react-library — JIT React library (DOM + JSX)", value: "react-library" },
  { name: "publishable — compiled with tsup (dist output)", value: "publishable" },
];

const PACKAGE_GROUPS = [
  { name: "packages/core — domain/business logic", value: "packages/core" },
  { name: "packages/infra — infrastructure adapters", value: "packages/infra" },
  { name: "packages — flat / cross-cutting", value: "packages" },
  { name: "tooling — shared dev config", value: "tooling" },
];

const APP_KINDS = [
  { name: "next — Next.js app (React + Tailwind + @repo/ui)", value: "next" },
  { name: "hono — Hono API on Bun", value: "hono" },
];

/** Relative path from a generated app's `app/globals.css` up to `packages/ui/src`. */
function uiSourcePath(group: unknown): string {
  const segments = typeof group === "string" && group ? group.split("/").filter(Boolean).length : 0;
  return `${"../".repeat(3 + segments)}packages/ui/src`;
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper("uiSourcePath", uiSourcePath);

  plop.setGenerator("package", {
    description: "Scaffold an internal package (library / react-library / publishable)",
    prompts: [
      { type: "input", name: "name", message: "Package name without scope (e.g. db):" },
      { type: "list", name: "kind", message: "Kind:", choices: PACKAGE_KINDS },
      { type: "list", name: "group", message: "Where should it live?", choices: PACKAGE_GROUPS },
    ],
    actions: (answers) => {
      const kind = String(answers?.kind);
      const base = "{{ group }}/{{ kebabCase name }}";
      const actions: PlopTypes.ActionType[] = [
        {
          type: "add",
          path: `${base}/package.json`,
          templateFile: `templates/package/${kind}.package.json.hbs`,
        },
        {
          type: "add",
          path: `${base}/tsconfig.json`,
          templateFile: `templates/package/${kind}.tsconfig.json.hbs`,
        },
        { type: "add", path: `${base}/README.md`, templateFile: "templates/package/README.md.hbs" },
        {
          type: "add",
          path: `${base}/CHANGELOG.md`,
          templateFile: "templates/package/CHANGELOG.md.hbs",
        },
        {
          type: "add",
          path: `${base}/src/index.ts`,
          templateFile: "templates/package/index.ts.hbs",
        },
        {
          type: "add",
          path: `${base}/src/index.test.ts`,
          templateFile: "templates/package/index.test.ts.hbs",
        },
      ];
      if (kind === "publishable") {
        actions.push({
          type: "add",
          path: `${base}/tsup.config.ts`,
          templateFile: "templates/package/publishable.tsup.config.ts.hbs",
        });
      }
      return actions;
    },
  });

  plop.setGenerator("app", {
    description: "Scaffold an app (next / hono). For Expo: `bunx create-expo-app` + metro wiring.",
    prompts: [
      { type: "input", name: "name", message: "App name without scope (e.g. web):" },
      { type: "list", name: "kind", message: "Kind:", choices: APP_KINDS },
      {
        type: "input",
        name: "group",
        message: "Group dir under apps/ (blank = flat):",
        default: "",
      },
    ],
    actions: (answers) => {
      const kind = String(answers?.kind);
      const group = typeof answers?.group === "string" ? answers.group.trim() : "";
      const dir = group ? `apps/${group}/{{ kebabCase name }}` : "apps/{{ kebabCase name }}";
      const src = `templates/app-${kind}`;
      const add = (path: string, template: string): PlopTypes.ActionType => ({
        type: "add",
        path: `${dir}/${path}`,
        templateFile: `${src}/${template}`,
      });
      if (kind === "hono") {
        return [
          add("package.json", "package.json.hbs"),
          add("tsconfig.json", "tsconfig.json.hbs"),
          add("README.md", "README.md.hbs"),
          add(".env.example", "env.example.hbs"),
          add(".gitignore", "gitignore.hbs"),
          add("src/index.ts", "src/index.ts.hbs"),
        ];
      }
      return [
        add("package.json", "package.json.hbs"),
        add("tsconfig.json", "tsconfig.json.hbs"),
        add("next.config.ts", "next.config.ts.hbs"),
        add("postcss.config.mjs", "postcss.config.mjs.hbs"),
        add("turbo.json", "turbo.json.hbs"),
        add("README.md", "README.md.hbs"),
        add(".env.example", "env.example.hbs"),
        add(".gitignore", "gitignore.hbs"),
        add("app/layout.tsx", "app/layout.tsx.hbs"),
        add("app/page.tsx", "app/page.tsx.hbs"),
        add("app/globals.css", "app/globals.css.hbs"),
      ];
    },
  });

  plop.setGenerator("component", {
    description: "Scaffold a @repo/ui component",
    prompts: [{ type: "input", name: "name", message: "Component name (e.g. spinner):" }],
    actions: [
      {
        type: "add",
        path: "packages/ui/src/components/{{ kebabCase name }}.tsx",
        templateFile: "templates/component/component.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("crate", {
    description: "Scaffold a Rust crate and register it in the Cargo workspace",
    prompts: [{ type: "input", name: "name", message: "Crate name (e.g. crypto):" }],
    actions: [
      {
        type: "add",
        path: "crates/{{ kebabCase name }}/Cargo.toml",
        templateFile: "templates/crate/Cargo.toml.hbs",
      },
      {
        type: "add",
        path: "crates/{{ kebabCase name }}/src/lib.rs",
        templateFile: "templates/crate/lib.rs.hbs",
      },
      {
        type: "modify",
        path: "crates/Cargo.toml",
        pattern: /members = \[/,
        template: 'members = ["{{ kebabCase name }}", ',
      },
    ],
  });
}
