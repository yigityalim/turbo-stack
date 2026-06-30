#!/usr/bin/env bash
# Remove build artifacts and caches across the monorepo.
# Keeps node_modules; pass --all to remove node_modules too.
set -euo pipefail

echo "Cleaning build artifacts and caches..."

find . -type d \( \
  -name ".turbo" -o \
  -name ".next" -o \
  -name "dist" -o \
  -name "coverage" -o \
  -name ".cache" \
  \) -not -path "*/node_modules/*" -prune -exec rm -rf {} + 2>/dev/null || true

find . -name "*.tsbuildinfo" -not -path "*/node_modules/*" -delete 2>/dev/null || true

if [ "${1:-}" = "--all" ]; then
  echo "Removing all node_modules..."
  find . -type d -name "node_modules" -prune -exec rm -rf {} + 2>/dev/null || true
fi

echo "Done"
