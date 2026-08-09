# CLAUDE.md — joshhenry.info portfolio

## What this repo is

Personal portfolio site for Josh Henry, mobile software engineer. Built in
React Native Web so one codebase renders on the web (the live deliverable at
joshhenry.info) and runs natively on iOS/Android via Expo Go. The repo is
itself a code sample — treat readability and correctness as product features.
Also serves as a Claude Code learning project.

## Stack

- Expo 54 (which includes React Native)
- Expo Router (for static rendering on web which enables SEO, social
  media previews, and faster loading)
- react-native-reanimated ONLY for all animations
- TypeScript everywhere; no untyped JS files
- React Native Web via Expo; `web.output` = "static" in app.json
- Package manager: yarn (use yarn for all installs and scripts)
- Jest
- React Native testing library
- Formspree (for Contact Form)

## Hard rules

- React Native primitives only: View, Text, Image, Pressable, ScrollView,
  FlatList. Never emit DOM elements (div, span, p, a). A DOM element is a bug —
  it breaks the native target.
- Default to Expo libraries first except for what is specified. Only use 3rd party
  libraries when the Expo library won't cut it.
- For a "super clean code" repo, add ESLint (npx expo lint) + Prettier, and set
  "strict": true in tsconfig.
- Be as verbose as you need with variable names. No one-letter or abbreviated
  variable names.
- Self documenting code is the best kind of code. Use comments in places only
  where variable naming is not explanatory enough. Comments explain why, never
  restate what.
- No magic numbers. Every spacing, size, radius, duration, breakpoint, and
  color must be a named token defined in theme/ and referenced by name in
  components. If a new value is genuinely needed, add a named token with a
  comment explaining what it represents.
- Accessibility is required: semantic roles, an accessibilityLabel on every
  interactive and image element, full keyboard navigation on web, and WCAG AA
  contrast for all text.
- SEO and meta via expo-router/head, rendered into the static HTML.
- react-native-reanimated/plugin must be the last entry in babel.config.js or
  animations silently do nothing.
- The no-DOM rule bans <form> and <a>. So the Formspree submit has to POST via
  fetch to the endpoint from a Pressable handler.
- The meaningful text — headline, platform names, project copy — has to exist
  in the static HTML independent of the "building… → shipped" animation. If
  content only appears after the spring runs, you lose SEO and first paint.
- +html.tsx and +not-found.tsx. The root HTML template (lang, viewport, global
  meta) and a 404 route — both are Expo Router static-rendering essentials.
- Never display my email address in a way that web scrapers can pick it up and
  allow spammers to spam me.

## Project structure

- src/app/ Expo Router routes; single-page portfolio, sections as components
- src/components/ presentational components, one per file, kept small
- src/theme/ named design tokens (colors, spacing, typography, breakpoints,
  motion) — the single source of truth for every value
- src/data/ typed content: projects.ts, skills.ts, experience.ts
  (content lives here as data, never hardcoded in components)
- assets/ images and graphics (per-project graphics reused from old site),
  resume will be stored as a PDF.
- designs/ exported Claude Design screens; the visual reference for each
  section (match these when building)
- LICENSE.md - add a license to use for this project.
- README.md - update the readme with any and all information necessary to
  run or understand the project.

## Design system — Direction: Build Room + native motion

A rigorous, technical identity (CI/CD and native-build background made visible)
executed with native-feeling motion. Structural motif: build-pipeline status
chips, where a passing check reads as "shipped to store." Spend boldness in ONE
place — the hero load sequence; everything else stays quiet and disciplined.
Per-project graphics from the old site are reused inside this design. Build each
section to match its exported screen in designs/.

Encode every value below as a named token in src/theme/. Components reference tokens
by name only — never a raw value.

### Color (semantic tokens)

- color.bg #F5F6F8 page background (paper)
- color.surface #FFFFFF cards
- color.ink #14181F primary text
- color.inkMuted #5B6472 secondary text
- color.border #E2E5EA hairlines, card edges
- color.primary #4338CA links, primary actions (indigo)
- color.primaryHover #3730A3
- color.statusPassing #16A34A "shipped" chip check
- color.statusAttention #F59E0B in-progress / highlight
- color.focusRing #4338CA visible keyboard focus

### Typography

- font.display Space Grotesk headings
- font.body Inter body copy
- font.mono IBM Plex Mono chips + metadata
  Type scale (named tokens; format = size / line-height / weight; rem so it
  respects the user's font-size setting):
- type.display 3.5rem / 1.05 / 600
- type.h2 1.75rem / 1.2 / 600
- type.body 1.0625rem / 1.6 / 400
- type.small 0.875rem / 1.5 / 400
- type.mono 0.8125rem / 1.4 / 500

### Spacing, radii, breakpoints

- space.unit = 4px. Rationale: a 4px base grid is a widely used convention that
  keeps vertical rhythm consistent and divides cleanly across sizes. Every
  spacing value is a named multiple of this unit, never a raw number:
  space.xs=1x, space.sm=2x, space.md=4x, space.lg=6x, space.xl=10x, space.xxl=16x
- radius.sm 6px · radius.md 10px · radius.pill 999px (chips)
- breakpoint.tablet 768px · breakpoint.desktop 1024px (named; mobile is the base)

### Motion (the merged native-feel layer)

Use Reanimated springs, not linear tweens. Named configs (starting values, tune
in review):

- motion.spring.gentle { damping: 18, stiffness: 140 } reveals, section entry
- motion.spring.snappy { damping: 22, stiffness: 320 } press feedback
- motion.duration.fast 120ms non-spring opacity fades
  Rules:
- Signature moment: on hero load, the status chips resolve from "building..." to
  "shipped" with a staggered spring — the single orchestrated moment; nothing
  else competes with it.
- Every Pressable scales down slightly on press (motion.spring.snappy) for a
  tactile, native feel.
- Respect prefers-reduced-motion: replace springs with an instant opacity change.
- No scattered effects — motion serves the build-and-ship story or it is cut.

## Content (section specs)

### Hero

- Eyebrow (font.mono): JOSH HENRY / MOBILE ENGINEER
- Headline (font.display, type.display): "Cross-platform apps that ship to iOS
  and Android from one codebase."
- Subline (font.body, color.inkMuted): "React Native - native iOS/Android -
  Portland, OR"
- Status chips (font.mono, radius.pill): iOS - Android - React Native - CI/CD.
  On load each resolves from "building..." to a passing check
  (color.statusPassing) in a staggered spring. This is the signature moment
  defined under Motion; nothing else on the page competes with it.
- Actions: LinkedIn, Resume, GitHub as text links.
- The headline is the thesis and this site is the proof: the page is itself a
  React Native Web app rendering from one codebase.

### Projects

Projects live in src/data/projects.ts as a typed array. Each project: title,
problem, whatIBuilt, stack, outcome, graphic (asset reference), links.
Feature these projects, ordered for emphasis (RN / mobile first):

- React Native Streem SDK (newest — lead)
- GenCon
- Mind Yeti
- Diablo Golf
- My Fish Pal
- Zen Builder
- Vista Weather
- Skylines Trivia
- Spin Wheel Control (CocoaPod, open source)
- Secondstep SEL Lesson Player — K-8
- Secondstep SEL Lesson Player — Adults

### Skills

### Experience

- This section carries signals the site cannot demonstrate (shipped store apps, native depth)

### About

- All about me, both personally and professionally.

### Contact

- The contact form uses Formspree.
- Ensure it cannot be spammed by a bot in any way.

## Testing

- Jest via jest-expo + React Native Testing Library.
- Test logic only: the projects/skills/experience data mapping, the contact
  form handler and its validation, responsive breakpoint logic, and conditional
  rendering. Do not write tests for pure static layout.
- Run `yarn test` after every change; all tests green before moving on. Tests
  are the guardrail — run them yourself and fix regressions before returning
  control.

## Workflow (supervised-agentic)

- Use plan mode for any structural or multi-file change. Present the plan and
  wait for my approval before editing.
- One section or one concern per commit; write clear commit messages.
- Keep components small and self-explanatory — an interviewer will read this
  code cold.

## Git workflow (this repo is a public portfolio — history must read clean)

- Conventional Commits: `type: summary` where type is one of feat, fix, test,
  docs, style, refactor, chore. Example: `feat: hero section with status chips`.
- Atomic commits: one logical change each. Never mix a feature, a fix, and a
  formatting pass in one commit.
- One short-lived branch per section: `feat/hero`, `feat/projects`, etc.
- For every new feature we add, use a separate branch. Once the feature is complete,
  wait for me to give the go ahead to merge it into main.
- Merge to main by squash so main stays linear and each section is one clean
  commit. Never commit directly to main.
- Commit only working code — tests green before every commit.
- .gitignore must exclude node_modules/, .expo/, dist/. Never commit secrets.

## Deploy

- Target: static export uploaded to Namecheap public_html. No server, no SSR.
- Build: `yarn expo export --platform web` -> dist/. After every export, verify
  a file in dist/ contains real text content, not just a <script> tag.

## Future enhancements

- Social preview plus favicon
- Improved animations
