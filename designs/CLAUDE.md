# CLAUDE.md: joshhenry.info portfolio

## What this repo is

Personal portfolio site for Josh Henry, mobile software engineer. One React
Native codebase renders on the web (the deliverable at joshhenry.info) and runs
natively on iOS and Android via Expo Go. The repo is itself a code sample, so
readability and correctness are product features. Also a Claude Code learning
project.

## Stack

- Expo 54, Expo Router with `web.output` = "static" in app.json
- TypeScript everywhere, `strict: true`, no untyped JS files
- react-native-reanimated for all animation
- Jest via jest-expo, React Native Testing Library
- Formspree for the contact form
- yarn for all installs and scripts
- ESLint (`npx expo lint`) and Prettier

## Precedence

On anything visual (layout, color, type, spacing, motion, copy, ordering),
**designs/README.md wins** and this file gets corrected. On anything engineering
(stack, structure, testing, git, deploy), this file wins.

## Privacy rules (non-negotiable)

- Never publish the email address, phone number, or street address. Not as text,
  a link, an image, a meta tag, structured data, an asset filename, or a code
  comment. The contact form is the only contact route.
- Never commit or display private keys, API secrets, tokens, credentials,
  environment files, or personal information of any kind. Secrets belong in
  environment variables that are gitignored.
- Never name the university. "BS, Computer Information Systems" is the most that
  appears anywhere: page copy, alt text, meta tags, structured data, comments,
  and commit messages.
- The resume PDF is a deliberate exception to all of the above. It ships in
  `assets/` and is linked from the page, and it is Josh's own document to
  publish. Never lift anything out of it into the site: no contact details, no
  school name. designs/resume.txt is the same document with those already
  redacted, and is the safe source for writing copy.
- Before every commit, check the diff for anything matching the above.

## Code rules

- Write standard, boring React Native. Someone who knows RN should read a file
  and find no surprises: no clever abstractions, no metaprogramming, no custom
  DSLs, no unusual patterns.
- React Native primitives only: View, Text, Image, Pressable, ScrollView,
  FlatList. Never emit DOM elements (div, span, p, a, form, input). A DOM
  element is a bug: it breaks the native target.
- `const` by default, `let` when reassignment is genuinely needed. Never `var`.
- DRY. If the same markup or logic appears twice, extract it. Project cards,
  chips, badges, and section headers are each one component used many times.
- One component per file, small, named for what it renders.
- Descriptive variable names, no abbreviations or single letters.
- Self documenting code over comments. Comment only where a name cannot carry
  the meaning, and explain why rather than restating what.
- No magic numbers. Every spacing, size, radius, duration, breakpoint, and color
  is a named token in `src/theme/`, referenced by name. If a new value is needed,
  add a named token with a comment explaining what it represents.
- Prefer Expo libraries. Reach for a third party package only when Expo has no
  equivalent.
- `react-native-reanimated/plugin` must be the last entry in babel.config.js or
  animations silently do nothing.
- Accessibility: semantic roles, an accessibilityLabel on every interactive and
  image element, keyboard navigation on web, WCAG AA contrast.
- SEO and meta via expo-router/head. Include `+html.tsx` (lang, viewport, global
  meta) and `+not-found.tsx`.
- All meaningful text must exist in the static HTML independent of animation. If
  content only appears once an animation runs, SEO and first paint are lost.

## Copy rules

- Never use em dashes. Use commas, colons, parentheses, or separate sentences.
- Plain and factual tone. First person in the hero intro and About.
- Do not rewrite copy Josh supplied. Much of the hero intro, the About
  paragraphs, and several project descriptions are verbatim. Lift the strings
  from the design into `src/data/` unchanged.

## Canonical facts

Single source of truth. If a number appears on the page, it comes from here.

- Senior Mobile Software Engineer, Portland, OR
- Open to work: remote in the U.S., hybrid in Portland
- github.com/joshdhenry, linkedin.com/in/joshdhenry
- BS, Computer Information Systems
- 23 years in IT and software; 10 years in software development; 13 of those
  years in retail IT before founding Big Smash Software
- Shipped: 8 iOS apps, 4 Android apps, 4 web apps, 2 frameworks/SDKs
- Hands-on build time in years, not years employed near the technology:
  JavaScript/TypeScript 8, React Native 6.25, Swift 5.5, Objective-C 5.5,
  Java 4.5, Kotlin 3.5, React 2
- Roles, newest first, all verifiable against designs/resume.txt:
  Streem (acquired by Frontdoor), Remote, Feb 2023 to Jul 2026;
  Fall Guy Consulting, Seattle, Hybrid, Nov 2021 to Oct 2022;
  Committee for Children, Seattle, Hybrid, Mar 2020 to Nov 2021;
  Fall Guy Consulting, Seattle, Hybrid, Jul 2017 to Mar 2020;
  Big Smash Software LLC, Seattle, Jun 2016 to Jul 2017

## Project structure

- `src/app/` Expo Router routes; single page, sections as components
- `src/components/` presentational components, one per file
- `src/theme/` named tokens (color, spacing, typography, breakpoints, motion)
- `src/data/` typed content: projects.ts, skills.ts, experience.ts. Content
  lives here, never hardcoded in components
- `assets/` images, per-project graphics, and `resume.pdf`. Copy the handoff's
  assets/ folder here wholesale; the filenames already match
- `designs/` the design handoff: README.md (authoritative visual spec),
  joshhenry.info.dc.html plus support.js (the working prototype, open the HTML
  in a browser), resume.txt (the shipped PDF as plain text, contact details
  removed, and the source for experience and project copy), and assets/. Only
  assets/ belongs in the app; everything else in designs/ is reference
- `LICENSE.md`, `README.md` (how to run and understand the project)

## Design system: Build Room

A rigorous, technical identity: the CI/CD and native-build background made
visible, executed with native-feeling motion. Boldness is spent in one place,
the hero terminal card; everything else stays quiet and disciplined.

Encode every value below as a named token in `src/theme/`.

### Color

- `color.bg` #F5F6F8 page background
- `color.surface` #FFFFFF cards
- `color.ink` #14181F primary text
- `color.inkSecondary` #3A424F body copy inside cards
- `color.inkMuted` #5B6472 secondary text
- `color.inkFaint` #98A1B0 captions and mono metadata
- `color.inkFaintest` #B6BDC7 tertiary notes on timeline rows
- `color.border` #E2E5EA hairlines and card edges
- `color.primary` #4338CA links, primary actions, focus ring
- `color.primaryHover` #3730A3
- `color.statusPassing` #16A34A open-to-work pill
- `color.chrome.close` #FF5F57, `color.chrome.min` #FEBC2E,
  `color.chrome.max` #28C840 terminal traffic lights
- `color.brand.linkedin` #0A66C2

### Typography

Families: `font.display` Space Grotesk, `font.body` Inter, `font.mono`
IBM Plex Mono.

Sizes are px. React Native has no rem and react-native-web emits px regardless;
respect the user's font-size preference through `allowFontScaling` on native.
Format is size / line-height / weight.

- `type.display` 56 / 1.05 / 600 hero headline (40 at narrow, 32 at compact)
- `type.h2` 32 / 1.2 / 600 section headings
- `type.h3` 20 / 1.3 / 600 featured project titles
- `type.h4` 16 / 1.35 / 600 compact card titles, timeline roles
- `type.stat` 22 / 1.2 / 600 hero stat numbers
- `type.body` 17 / 1.65 / 400 intro and About paragraphs
- `type.bodySm` 15 / 1.6 / 400 card copy
- `type.small` 14 / 1.5 / 500 nav links, company lines
- `type.mono` 13 / 1.4 / 500 eyebrow, terminal, dates
- `type.monoSm` 12 / 1.4 / 500 field labels, footer
- `type.monoXs` 11 / 1.4 / 400 chips, detail labels

### Spacing, radii, breakpoints

- Spacing is an explicit named set, not a strict multiple of one unit. The
  design settles on a 2px grid and uses these values; name each one and
  reference by name:
  `space.xxs` 6, `space.xs` 8, `space.sm` 10, `space.md` 14, `space.lg` 18,
  `space.xl` 22, `space.xxl` 26, `space.section` 40, `space.sectionY` 64,
  `space.sectionYLarge` 80. A 4px grid was considered and rejected: the design
  relies on 6, 10, 14, 18, 22, and 26, and snapping them would change spacing
  that is already final.
- `radius.sm` 6, `radius.md` 10, `radius.pill` 999
- `breakpoint.narrow` 900, `breakpoint.compact` 560. The design is authored at
  full width and steps down, so desktop is the base and narrow is the override.
  Drive from `useWindowDimensions`, never `Platform.OS`: phones are always
  narrow in practice, and web switches live as the window resizes.

### Motion

Reanimated springs, not linear tweens, except where a fixed cadence is the point.

- `motion.spring.gentle` { damping: 18, stiffness: 140 } reveals and section entry
- `motion.spring.snappy` { damping: 22, stiffness: 320 } press feedback
- `motion.navRevealScrollY` 560, the scroll distance at which the nav appears
- `motion.duration.fast` 120ms, for opacity-only fades where a spring would
  read as sloppy

Rules:

- Signature moment is the hero terminal card: a command types in character by
  character, a progress rail fills, and seven technology rows resolve in a
  staggered cascade. Nothing else competes with it.
- Use `withTiming` for the two timed effects, the typing cadence and the stat
  counters. Springs everywhere else.
- Every Pressable scales down slightly on press for a tactile, native feel.
- Supporting motion, approved and specified in designs/README.md: section
  entrance reveals, stat counters, the timeline rail drawing in, a parallax
  drift on the terminal card, and the nav bar appearing past
  `motion.navRevealScrollY`. That token is a scroll distance; it happens to
  share the number 560 with `breakpoint.compact`, which is a window width. They
  are unrelated.
- Content must never depend on motion to become visible. Author every element in
  its final visible state and treat animation as enhancement. The HTML prototype
  broke three times by doing the reverse.
- No reduced-motion handling for now. Deliberate, revisit later.

## Content

Section order: Hero, Projects, Skills, Experience, About, Contact. Full anatomy
and measurements for each are in designs/README.md; what follows is the intent
and the decisions that are already final.

### Hero

Two columns, stacking at `breakpoint.narrow` with the terminal card below the
copy.

- Eyebrow row: "SENIOR MOBILE SOFTWARE ENGINEER" left, an "open to work" pill
  right. The pill never wraps.
- Headline: "Ten years building apps that hold up, on iOS, Android, and the web."
- Intro paragraph, first person, verbatim from the design.
- Actions: LinkedIn, Resume, GitHub as bordered badges, not bare text links.
- Terminal card: macOS chrome bar, filling progress rail, typed command, seven
  technology rows with dotted leaders, six-panel stat grid.
- The command reads `ls ~/tech --sort=hands-on-build-time`. The flag is
  load-bearing copy: these are real hands-on hours, not years spent employed
  near a technology. Do not shorten it.
- The headline is the thesis and this site is the proof: the page is itself a
  React Native app rendering from one codebase.

### Projects

`src/data/projects.ts` as a typed array. Each project: title, problem,
whatIBuilt, stack, outcome, graphic. Two tiers, order final.

Featured, two-column grid, Streem spans both columns:

1. Streem React Native SDK
2. Gen Con Convention App
3. Mind Yeti
4. Second Step K-8 Lesson Player
5. Second Step SEL for Adults

Then an "ALSO SHIPPED" divider and a three-column compact grid:

6. Diablo Golf v2
7. My Fish Pal
8. Zen Builder
9. Vista Weather
10. Skylines Trivia
11. SpinWheelControl

Cards are collapsed by default and expand in place on press. Several may be open
at once; this is not an accordion. Featured cards show all four fields, compact
cards a single paragraph. No project links to a store or repository: copy only.

### Skills

Ten groups, each a label and a wrapping row of chips: Languages, React Native,
UI / UX, Media, Data & State, Testing, Build & Release, Tools, Methodologies,
AI. Chips are display only, no proficiency bars or ratings.

### Experience

A compact timeline across five roles, deliberately not a bulleted resume dump.
Projects carries the detail; this carries the shape of the career. Each row is a
date range, role, company and location, and one mono line naming the work.
Remote and hybrid status is part of the company line and must be shown.

### About

One professional paragraph and one personal one, headshot beside them at desktop
and above them at narrow widths. The degree is folded into the prose, not shown
as a chip. Copy is verbatim.

### Contact

- Formspree at https://formspree.io/f/xljrgjpe (free plan, 50 submissions a
  month). Verify it accepts posts from the production domain; Formspree filters
  by referrer.
- No DOM form element. POST via fetch from a Pressable handler.
- Must not be spammable: honeypot field plus client-side validation at minimum.
- Left column centered: heading, availability paragraph, three stacked badges
  (LinkedIn, GitHub, resume PDF). Right column is the form.
- Success and error states are not designed. Propose them before building.

## Testing

- Test logic, not static layout: data mapping, the contact form handler and its
  validation, breakpoint logic, and conditional rendering.
- One full-page snapshot test. Render the page at a fixed width with fake timers
  and animations settled, then `toMatchSnapshot()`. It is a regression net for
  unintended structural change, so review every snapshot diff rather than
  updating it reflexively.
- Run `yarn test` after every change. All green before moving on, and before
  every commit.

## Workflow

- Plan mode for any structural or multi-file change. Present the plan and wait
  for approval before editing.
- One section or one concern per commit.
- Keep components small and self-explanatory. An interviewer will read this code
  cold.

## Git

This repo is a public portfolio, so history must read clean.

- Conventional Commits: `type: summary`, type one of feat, fix, test, docs,
  style, refactor, chore. Example: `feat: hero terminal card`.
- Atomic commits. Never mix a feature, a fix, and a formatting pass.
- One short-lived branch per section: `feat/hero`, `feat/projects`. Wait for the
  go ahead before merging.
- Squash merge to main so history stays linear. Never commit directly to main.
- `.gitignore` must exclude node_modules/, .expo/, dist/, and any env files.

## Deploy

- Static export uploaded to Namecheap public_html. No server, no SSR.
- `yarn expo export --platform web` to dist/. After every export, verify a file
  in dist/ contains real text content, not just a script tag.

## Future enhancements

- Social preview image and favicon
- Reduced-motion support
- Richer animation
