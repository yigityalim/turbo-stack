# @repo/mobile

The mobile app — [Expo](https://expo.dev) (React Native) + TypeScript,
scaffolded with `create-expo-app` and wired into the monorepo via
`metro.config.js` (watches the workspace root, resolves hoisted deps).

```sh
bun run start --filter=@repo/mobile   # Expo dev server
```

Expo manages its own dependency versions (SDK-locked) — keep `expo` /
`react-native` out of the shared catalog. Run `bunx expo install --check` and
`bunx expo-doctor` after dependency changes.
