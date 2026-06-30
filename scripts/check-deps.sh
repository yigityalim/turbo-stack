#!/usr/bin/env bash
# Find external imports that are not declared in each workspace's package.json.
# Skips path aliases (@/*), relative imports, and node: builtins.
set -euo pipefail

echo "Checking for missing dependencies..."
echo ""

shopt -s nullglob
for dir in packages/*/ apps/*/; do
  [ -f "${dir}package.json" ] || continue
  [ -d "${dir}src" ] || continue

  imports=$(grep -rhoE 'from "[^"]+"' "${dir}src" --include="*.ts" --include="*.tsx" 2>/dev/null \
    | sed 's/from "//;s/"//' \
    | grep -vE '^[./]' \
    | grep -vE '^node:' \
    | grep -vE '^@/' \
    | awk '{ if (substr($0,1,1)=="@") { n=split($0,a,"/"); print (n>=2 ? a[1]"/"a[2] : $0) } else { split($0,a,"/"); print a[1] } }' \
    | sort -u || true)

  missing=""
  for dep in $imports; do
    grep -q "\"$dep\"" "${dir}package.json" 2>/dev/null || missing="$missing $dep"
  done

  if [ -n "$missing" ]; then
    echo "=== $dir ==="
    echo "  bun add$missing --cwd $dir"
    echo ""
  fi
done

echo "Done"
