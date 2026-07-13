#!/usr/bin/env bun
import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Command } from "commander";

const ROOT = join(import.meta.dir, "..");

interface AppEntry {
  readonly key: string;
  readonly path: string;
  readonly label: string;
  readonly next?: boolean;
}

const APPS: readonly AppEntry[] = [
  {
    key: "web",
    path: "apps/web",
    label: "Next.js web — primary app (Supabase auth + UI)",
    next: true,
  },
  { key: "marketing-web", path: "apps/marketing/web", label: "Next.js marketing site", next: true },
  { key: "marketing-admin", path: "apps/marketing/admin", label: "Next.js admin", next: true },
  { key: "api", path: "apps/api", label: "Hono API (Bun)" },
  { key: "mobile", path: "apps/mobile", label: "Expo mobile" },
];

const ANALYTICS = new Set(["posthog", "vercel", "both", "none"]);

interface InitOptions {
  name?: string;
  apps?: string;
  analytics?: string;
  install?: boolean;
  git?: boolean;
  yes?: boolean;
}

interface PackageJson {
  name?: string;
  [key: string]: unknown;
}

function ask(question: string, fallback = ""): string {
  const answer = prompt(question, fallback);
  return (answer ?? fallback).trim();
}

function splitKeys(raw: string): string[] {
  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function readRootPackage(): PackageJson {
  return JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as PackageJson;
}

function chooseApps(): string[] {
  console.log("\nAvailable apps:");
  for (const app of APPS) console.log(`  ${app.key.padEnd(16)} ${app.label}`);
  const raw = ask("\nApps to keep (comma-separated keys, blank = all):");
  return raw ? splitKeys(raw) : APPS.map((app) => app.key);
}

function removeDir(relative: string): void {
  const absolute = join(ROOT, relative);
  if (!existsSync(absolute)) return;
  rmSync(absolute, { recursive: true, force: true });
  console.log(`  removed ${relative}`);
}

function collapseMarketing(): void {
  const absolute = join(ROOT, "apps/marketing");
  if (existsSync(absolute) && readdirSync(absolute).length === 0) removeDir("apps/marketing");
}

function setRootName(name: string): void {
  const path = join(ROOT, "package.json");
  const pkg = JSON.parse(readFileSync(path, "utf8")) as PackageJson;
  pkg.name = name;
  writeFileSync(path, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log(`  set root name → ${name}`);
}

function applyAnalytics(choice: string, keptKeys: string[]): void {
  if (!ANALYTICS.has(choice)) return;
  for (const app of APPS) {
    if (!app.next || !keptKeys.includes(app.key)) continue;
    const envPath = join(ROOT, app.path, ".env.example");
    if (!existsSync(envPath)) continue;
    const current = readFileSync(envPath, "utf8");
    if (current.includes("NEXT_PUBLIC_ANALYTICS_PROVIDER")) continue;
    const line = `NEXT_PUBLIC_ANALYTICS_PROVIDER="${choice}"\n`;
    writeFileSync(envPath, current.endsWith("\n") ? current + line : `${current}\n${line}`);
    console.log(`  analytics → ${app.path}/.env.example (${choice})`);
  }
}

function run(command: string): void {
  execSync(command, { cwd: ROOT, stdio: "inherit" });
}

function resetGit(): void {
  rmSync(join(ROOT, ".git"), { recursive: true, force: true });
  run("git init -q");
  run("git add -A");
  run('git commit -q -m "chore: initial commit from turbo-stack"');
  console.log("  reset git history");
}

function resolveName(options: InitOptions, interactive: boolean): string {
  if (options.name) return options.name;
  const current = readRootPackage().name ?? "app";
  return interactive ? ask("Project name:", current) : current;
}

function resolveApps(options: InitOptions, interactive: boolean): string[] {
  if (options.apps) return splitKeys(options.apps);
  return interactive ? chooseApps() : APPS.map((app) => app.key);
}

function resolveAnalytics(options: InitOptions, interactive: boolean): string {
  if (options.analytics) return options.analytics;
  if (!interactive) return "skip";
  return ask("\nAnalytics provider (posthog / vercel / both / none, blank = skip):") || "skip";
}

async function runInit(options: InitOptions): Promise<void> {
  const interactive = Boolean(process.stdin.isTTY) && !options.yes;
  const name = resolveName(options, interactive);
  const keep = resolveApps(options, interactive);

  const known = new Set(APPS.map((app) => app.key));
  const unknown = keep.filter((key) => !known.has(key));
  if (unknown.length > 0) throw new Error(`Unknown app key(s): ${unknown.join(", ")}`);

  const analytics = resolveAnalytics(options, interactive);
  const remove = APPS.filter((app) => !keep.includes(app.key));
  const doInstall = options.install ?? true;
  const doGit = options.git ?? true;

  console.log("\nPlan:");
  console.log(`  name       ${name}`);
  console.log(`  keep       ${keep.join(", ") || "(none)"}`);
  console.log(`  remove     ${remove.map((app) => app.path).join(", ") || "(none)"}`);
  console.log(`  analytics  ${ANALYTICS.has(analytics) ? analytics : "skip"}`);
  console.log(`  git        ${doGit ? "re-init fresh history" : "unchanged"}`);
  console.log(`  install    ${doInstall ? "bun install" : "skipped"}`);

  if (interactive) {
    const proceed = ask("\nProceed? (y/N):", "N").toLowerCase();
    if (proceed !== "y" && proceed !== "yes") {
      console.log("Aborted.");
      return;
    }
  }

  for (const app of remove) removeDir(app.path);
  collapseMarketing();
  setRootName(name);
  applyAnalytics(analytics, keep);
  if (doGit) resetGit();
  if (doInstall) run("bun install");

  console.log("\nDone. Fill each kept app's .env.local, then `bun run dev`.");
  console.log("You can delete scripts/cli.ts once the project is set up.");
}

const program = new Command();
program
  .name("turbo-stack")
  .description("Internal CLI for the turbo-stack monorepo")
  .version("0.0.0");

program
  .command("init")
  .description("Bootstrap a fork: pick apps, name the workspace, reset git, install")
  .option("--name <name>", "project name")
  .option("--apps <keys>", "comma-separated app keys to keep (default: all)")
  .option("--analytics <choice>", "analytics provider: posthog | vercel | both | none")
  .option("--no-install", "skip bun install")
  .option("--no-git", "skip the fresh git history")
  .option("-y, --yes", "skip the confirmation prompt")
  .action((options: InitOptions) => runInit(options));

await program.parseAsync(process.argv);
