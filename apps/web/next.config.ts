import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Workspace packages ship TypeScript source (JIT, no build) — Next transpiles them.
  transpilePackages: ["@repo/ui", "@repo/auth", "@repo/db", "@repo/env", "@repo/types"],
};

export default nextConfig;
