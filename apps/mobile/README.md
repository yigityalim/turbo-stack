# @repo/mobile

The mobile app — [Expo](https://expo.dev) (SDK 57, expo-router) + React Native,
scaffolded with `create-expo-app`. Read `AGENTS.md` before touching Expo code.

```sh
bun run start --filter=@repo/mobile   # Expo dev server
```

Expo is SDK-locked: it manages its own dependency versions (kept out of the
shared catalog) and its own toolchain. Metro auto-configures for the monorepo on
SDK 52+, so there is no `metro.config.js`. Because the repo is Biome-only (no
ESLint), the app is excluded from the root `bun run check` / `bun run lint`; lint
it with Expo's own tooling if you want. After dependency changes, run
`bunx expo install --check` and `bunx expo-doctor`.
