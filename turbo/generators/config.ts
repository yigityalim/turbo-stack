import type { PlopTypes } from "@turbo/gen";

/**
 * Turbo generators. Run with `turbo gen` / `bun run gen` (requires `@turbo/gen`).
 * Scaffolds an internal package to the repo's common structure: src export
 * (JIT — no build), shared tsconfig, a sample test, README, and CHANGELOG.
 * CLI/public packages additionally adopt tsup via `@repo/tsup-config`
 * (see that package's README); this generator targets the common JIT case.
 */
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("package", {
    description: "Scaffold a new internal package in a workspace group",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Package name without scope (e.g. db):",
      },
      {
        type: "list",
        name: "group",
        message: "Where should it live?",
        choices: [
          { name: "packages/core — domain/business logic", value: "packages/core" },
          { name: "packages/infra — infrastructure adapters", value: "packages/infra" },
          { name: "tooling — shared dev config", value: "tooling" },
          { name: "packages — flat / cross-cutting", value: "packages" },
        ],
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ group }}/{{ kebabCase name }}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "{{ group }}/{{ kebabCase name }}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "{{ group }}/{{ kebabCase name }}/README.md",
        templateFile: "templates/README.md.hbs",
      },
      {
        type: "add",
        path: "{{ group }}/{{ kebabCase name }}/CHANGELOG.md",
        templateFile: "templates/CHANGELOG.md.hbs",
      },
      {
        type: "add",
        path: "{{ group }}/{{ kebabCase name }}/src/index.ts",
        templateFile: "templates/index.ts.hbs",
      },
      {
        type: "add",
        path: "{{ group }}/{{ kebabCase name }}/src/index.test.ts",
        templateFile: "templates/index.test.ts.hbs",
      },
    ],
  });
}
