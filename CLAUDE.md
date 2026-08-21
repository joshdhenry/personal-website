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
- Jest via jest-expo
- React Native Testing Library (@testing-library/react-native)
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
  restate what. Max 3 lines, most 1 line — delete anything a reader could
  already infer from the code and names. This cap is for inline rationale
  comments; a JSDoc block on an exported function (description + @param /
  @returns, one util-file export per line) is exempt from it, but keep the
  description itself to 1-3 lines.
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
- The meaningful text — headline, intro copy, tech names, stats, project
  copy — has to exist in the static HTML independent of any entrance
  animation. If content only appears after a spring runs, you lose SEO and
  first paint. Shared values initialize at resting/final state; animate
  toward it from there, never the reverse.
- +html.tsx and +not-found.tsx. The root HTML template (lang, viewport, global
  meta) and a 404 route — both are Expo Router static-rendering essentials.
- Never display my email address in a way that web scrapers can pick it up and
  allow spammers to spam me.

## Code style

- No barrel imports. No `index.ts` re-export files in src/theme/, src/types/,
  or elsewhere. Import each symbol from the specific file it's defined in
  (e.g. `@/theme/colors`, not `@/theme`).
- Functional components only, declared as arrow consts, never `function`.
  Export on the same line as the declaration (`export const Thing = () =>
...`), not declared-then-exported on a separate line — except Expo Router
  route files in src/app/, which require an anonymous default export
  (`export default () => ...`) per Expo Router's file-based routing.
- Prefer an expression-body arrow (no `return`) when a component is pure
  JSX; use a block body only when the component needs statements above the
  JSX (hooks, derived consts, early returns).
- No inline styles, style array merges, or handler functions written
  directly in JSX — extract each to a named const above the `return`/JSX
  expression.
- Name event handlers `onX`, never `handleX` (`onPress`, `onProjectsLayout`),
  including hook-returned callbacks. A factory that builds several handlers
  can keep its own descriptive name.
- Alphabetize: JSX props, StyleSheet keys, object-literal type fields, a
  hook's own returned object, and destructured hook-result variables at call
  sites (not a `{...spread, extra}` return — no clean way to interleave a
  spread). Array element order stays whatever is semantically meaningful
  (e.g. the order stats or nav items should display in), never alphabetized.
- Avoid `as const` where the same literal-type narrowing is achievable
  another way (an explicit type annotation, `satisfies`). Prefer it only
  when there's no equivalent alternative.
- Prettier: 4-space indent, double quotes, trailing commas, 100-char print
  width (`.prettierrc`). Run `yarn format` before committing.

## Project structure

- src/app/ Expo Router routes; single-page portfolio, sections as components
- src/components/ presentational components, one per file, kept small
- src/theme/ named design tokens (colors, spacing, typography, radii,
  breakpoints, motion, shadow), one file per token category — the single
  source of truth for every value
- src/data/ typed content: heroContent.ts, and eventually projects.ts,
  skills.ts, experience.ts (content lives here as data, never hardcoded in
  components)
- src/types/ every type/interface in the app, one file per domain (e.g.
  hero.ts, theme.ts, interaction.ts for cross-cutting hook state shapes) —
  never declared inline in the component/hook/theme file that uses it; see
  "No barrel imports" below
- src/utils/ pure helper/utility functions, aliased via `@/utils/*`; grouped
  and named by the domain they deal with (e.g. `scroll.ts` for the page's
  scroll-driven effects), never by an individual function's own name; every
  util file has a colocated `*.test.ts`. Exports functions only — a constant
  a util needs belongs in src/constants/, imported from there instead.
- src/constants/ named non-visual constants (thresholds, timeouts, and the
  like) shared across utils/hooks/components, one file per domain — visual
  design values still belong in theme/, not here.
- src/hooks/ shared React hooks (e.g. reduced-motion, entrance animation)
- assets/images/ project graphics and photos actually shipped by the app
  (copied from designs/assets/, not required at runtime from designs/
  directly); assets/documents/ holds the resume PDF
- designs/ exported Claude Design screens; the visual reference for each
  section, and the authoritative source for exact copy/visual spec when it
  is more specific than this file (match these when building)
- LICENSE.md - MIT, source code only (not name/resume/likeness/content)
- README.md - setup, run, test, lint, and build instructions

## Design system — Direction: Build Room + native motion

A rigorous, technical identity (CI/CD and native-build background made
visible) executed with native-feeling motion. Structural motif: a terminal —
a command runs, a build log streams in, stats tally up — read as tangible
proof of hands-on build time. Spend boldness in ONE place — the hero load
sequence; everything else stays quiet and disciplined. Per-project graphics
from the old site are reused inside this design. Build each section to match
its exported screen in designs/.

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
- color.statusPassing #16A34A success/passing state (e.g. the hero's
  "open to work" indicator)
- color.statusAttention #F59E0B in-progress / highlight
- color.focusRing #4338CA visible keyboard focus

Escape hatch: a section may need a finer-grained shade this list doesn't
cover (e.g. a second muted tier, or literal macOS traffic-light dot colors).
Add it as its own named token in src/theme/colors.ts with a one-line comment
explaining what it's for — never a raw hex value in a component. Name it for
its role or its relationship to an existing token (e.g.
`statusPassingBorder`, a tint of `statusPassing`), never for the one
component that happens to consume it (not `navBackground`) — a real,
unavoidably specific referent (`trafficLightRed`, `brandLinkedIn`) is fine.

### Typography

- font.display Space Grotesk headings
- font.body Inter body copy
- font.mono IBM Plex Mono chips + metadata
  Type scale (named tokens; format = size / line-height / weight; rem so it
  respects the user's font-size setting):
- type.display 3.5rem / 1.05 / 600
- type.h2 2rem / 1.2 / 600
- type.body 1.0625rem / 1.6 / 400
- type.small 0.875rem / 1.5 / 400
- type.mono 0.8125rem / 1.4 / 500

### Spacing, radii, breakpoints

- space.unit = 4px. Rationale: a 4px base grid is a widely used convention that
  keeps vertical rhythm consistent and divides cleanly across sizes. Every
  spacing value is a named multiple of this unit, never a raw number:
  space.xs=1x, space.sm=2x, space.md=4x, space.lg=6x, space.xl=10x, space.xxl=16x
- radius.sm 6px · radius.md 10px · radius.pill 999px (chips)
- breakpoint.narrow 900px · breakpoint.compact 560px (named; mobile is the
  base; read once via useWindowDimensions and threaded through as
  isNarrow/isCompact booleans, not media queries)

### Motion (the merged native-feel layer)

Use Reanimated springs, not linear tweens. Named configs (starting values, tune
in review):

- motion.spring.gentle { damping: 18, stiffness: 140 } reveals, section entry
- motion.spring.snappy { damping: 22, stiffness: 320 } press feedback
- motion.duration.fast 120ms non-spring opacity fades
  Rules:
- Signature moment: on hero load, the terminal card settles in, its command
  line and 7 tech-log rows reveal in a staggered spring, and the stat grid
  counts up — the single orchestrated moment; nothing else competes with it.
- Every Pressable scales down slightly on press (motion.spring.snappy) for a
  tactile, native feel.
- Respect prefers-reduced-motion: replace springs with an instant opacity change.
- No scattered effects — motion serves the build-and-ship story or it is cut.

## Content (section specs)

### Hero (built — src/components/hero/, content in src/data/heroContent.ts)

- Eyebrow (font.mono): "SENIOR MOBILE SOFTWARE ENGINEER" + an "open to work"
  pill (color.statusPassing dot + text).
- Headline (font.display, type.heroHeadline, responsive down to
  heroHeadlineNarrow/heroHeadlineCompact at the narrow/compact breakpoints):
  "Ten years building apps that hold up, on iOS, Android, and the web."
- Intro paragraph (font.body, color.inkMuted, ~46ch max-width): Josh's bio —
  ten years production React Native/iOS/Android, native-module work in
  Swift/Objective-C/Java/Kotlin, quality-first framing. Copy is verbatim per
  designs/README.md; don't rewrite it without updating that spec first.
- Actions: LinkedIn, Resume (local PDF asset), GitHub — three text-label
  action badges with press/hover feedback (motion.spring.snappy).
- Terminal card (the signature moment — see Motion below): a fake terminal —
  chrome bar (traffic-light dots, path, shell name), a progress rail, a
  command line (`ls ~/tech --sort=hands-on-build-time`, caret blinks), 7
  tech log rows (language/framework + years, staggered spring reveal
  1.5s–3.9s in 0.4s steps), and a 6-cell stat grid (years of experience,
  apps shipped by platform) that counts up on mount.
- Reduced motion: every animated piece skips straight to its resting/final
  state — no springs, no repeats, no count-up, no stagger.

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

- Jest via jest-expo + React Native Testing Library. `yarn test` runs verbose
  (suite/test names shown) and writes an HTML coverage report to coverage/.
- Test logic only: data-module content and mapping, layout-mode/breakpoint
  resolution, hooks, and conditional rendering. Do not write tests for pure
  static layout or animation timing.
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
  docs, style, refactor, chore. Example: `feat: hero section with terminal card`.
- Atomic commits: one logical change each. Never mix a feature, a fix, and a
  formatting pass in one commit.
- One short-lived branch per section: `feat/hero`, `feat/projects`, etc.
- For every new feature we add, use a separate branch. Once the feature is complete,
  wait for me to give the go ahead to merge it into main.
- Merge to main by squash so main stays linear and each section is one clean
  commit. Never commit directly to main.
- Commit only working code — tests green before every commit.
- .gitignore must exclude node_modules/, .expo/, dist/, coverage/, and any
  .env file. Never commit secrets.

## Deploy

- Target: static export uploaded to Namecheap public_html. No server, no SSR.
- Build: `yarn expo export --platform web` -> dist/. After every export, verify
  a file in dist/ contains real text content, not just a <script> tag.

## Future enhancements

- Social preview plus favicon
- Improved animations
