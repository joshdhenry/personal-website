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
yarn test    # Jest — verbose output, HTML coverage report at coverage/
yarn lint    # ESLint (expo lint)
yarn format  # Prettier, writes in place
```

## Build

```
yarn expo export --platform web   # static export to dist/
```

The build target is a static export uploaded to Namecheap public_html — no
server, no SSR.

## Deploy

```
yarn deploy
```

Builds the static export and syncs it straight to Namecheap over SFTP —
replaces only this site's own top-level entries under `public_html` (derived
from whatever `dist/` actually contains at export time, e.g. `index.html`,
`favicon.ico`, `_expo/`, `assets/`), never the whole directory, since
`public_html` on this account is shared with unrelated addon domains. See
`scripts/deploy.sh`.

One-time setup:

1. `brew install lftp`
2. An SSH key generated and **authorized** in cPanel → SSH Access → Manage
   SSH Keys, downloaded to `~/.ssh/` on your Mac (`chmod 600`).
3. `cp .env.deploy.example .env.deploy` and fill in the host/user/port/path
   from cPanel (`.env.deploy` is gitignored — never commit it).
4. This hosting account has no shell access, only SFTP, so the key can't be
   scripted with a password prompt — unlock it once per terminal session
   with `yarn deploy:unlock` before running `yarn deploy`.

Previously, images intermittently went missing and layout reverted to its
mobile default on the live site after a manual drag-and-drop upload through
cPanel File Manager — it silently skipped the `_expo/` and `assets/`
subfolders, so the JS bundle and images 404'd (this repo reads breakpoints
via `useWindowDimensions` in JS, not CSS media queries, so no JS also breaks
layout). `yarn deploy` replaces that manual step entirely.

## Project structure

See [CLAUDE.md](./CLAUDE.md)'s "Project structure" section for a full
breakdown of src/app, src/components, src/theme, src/data, src/types,
src/utils, src/constants, and src/hooks.

## License

MIT — see [LICENSE.md](./LICENSE.md). Covers source code only, not Josh's
name, resume, likeness, or personal content.
