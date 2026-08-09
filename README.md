# joshhenry.info — Personal Portfolio (v3)

Josh Henry's portfolio site, built with React Native, Expo, and Claude Code.
One codebase renders on the web (the live deliverable at joshhenry.info) and
runs natively on iOS/Android via Expo Go. See [CLAUDE.md](./CLAUDE.md) for
the full stack, design system, and conventions this repo follows.

## Requirements

- Node v20.x
- Yarn (this repo uses yarn for all installs and scripts, not npm)

## Setup

```
yarn install
```

## Run

```
yarn expo start --localhost
```

Then press `w` for web, `i` for iOS (Expo Go), or `a` for Android (Expo Go).
Or jump straight to one platform: `yarn web`, `yarn ios`, `yarn android`.

## Test, lint, format

```
yarn test          # Jest — verbose output, HTML coverage report at coverage/
yarn lint          # ESLint (expo lint)
yarn format         # Prettier, writes in place
```

## Build

```
yarn expo export --platform web   # static export to dist/
```

The build target is a static export uploaded to Namecheap public_html — no
server, no SSR.

## Project structure

See [CLAUDE.md](./CLAUDE.md)'s "Project structure" section for a full
breakdown of src/app, src/components, src/theme, src/data, src/types,
src/utils, and src/hooks.

## License

MIT — see [LICENSE.md](./LICENSE.md). Covers source code only, not Josh's
name, resume, likeness, or personal content.
