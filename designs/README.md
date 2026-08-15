# Handoff: joshhenry.info personal site

## Overview
The visual specification for joshhenry.info, a single-page portfolio for Josh Henry aimed at hiring managers, engineers, recruiters, and general visitors. Sections in order: hero, projects, skills, experience, about, run this site as an app, contact, footer.

`joshhenry.info.dc.html` is a **prototype written in HTML**, not production code. Open it in a browser to see the intended look and behavior, then recreate it in React Native using that environment's patterns. Nothing in the HTML should be lifted verbatim.

## Where this folder goes
Unzip it as `designs/` at the root of the React Native project. CLAUDE.md refers to these files by that path (`designs/README.md`, `designs/resume.txt`). Only `assets/` gets copied into the app itself; everything else here is reference.

## Relationship to CLAUDE.md
CLAUDE.md governs engineering: stack, structure, code rules, privacy, testing, git, deploy, and the canonical facts. This file governs visual design. Where the two disagree on anything visual, this file wins. Neither file repeats the other, so follow a pointer rather than assuming.

## Fidelity
**High fidelity.** Colors, typography, spacing, copy, and interactions are final. Recreate the UI faithfully. Two caveats:

1. Hover states are web-only. Native needs press equivalents. See "Hover, and its native equivalent" below.
2. The HTML uses `<form>`, `<a>`, and `<input>` because it is a browser prototype. The build target bans DOM elements, so these become `Pressable`, `TextInput`, and a `fetch` POST. The design intent is the layout and behavior, not the element choice.
3. One block is deliberately web-only rather than ported: the Expo Snack embed in the demo section. See that section for the native replacement.

## Design tokens

### Color
| Token | Hex | Use |
| --- | --- | --- |
| paper | `#F5F6F8` | page background, inset panels |
| surface | `#FFFFFF` | cards, nav bar, footer, form fields on focus |
| border | `#E2E5EA` | all 1px borders and dividers |
| ink | `#14181F` | primary text |
| ink-secondary | `#3A424F` | body copy inside cards |
| muted | `#5B6472` | supporting text, labels |
| muted-light | `#98A1B0` | captions, mono metadata |
| muted-lighter | `#B6BDC7` | tertiary notes on timeline rows |
| indigo | `#4338CA` | primary accent, buttons, links, timeline rail |
| indigo-dark | `#3730A3` | button and link hover |
| green | `#16A34A` | "open to work" badge |
| macOS traffic lights | `#FF5F57` `#FEBC2E` `#28C840` | terminal card chrome |
| LinkedIn mark | `#0A66C2` | contact badge icon |

### Typography
Sizes below are in `rem` because the prototype is HTML, where 1rem = 16px. The
px equivalents are the authoritative tokens and are listed in CLAUDE.md; the two
scales agree exactly (3.5rem = 56, 2rem = 32, 1.0625rem = 17, and so on). Use the
CLAUDE.md tokens when building.

Three families, loaded from Google Fonts:
- **Space Grotesk** 500/600/700: h1, h2, h3, stat numbers.
- **Inter** 400/500/600: all body copy, buttons, nav.
- **IBM Plex Mono** 400/500/600: labels, eyebrows, chips, dates, terminal, footer.

| Role | Family | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| h1 hero | Space Grotesk | 3.5rem | 600 | 1.05 | -0.022em |
| h2 section | Space Grotesk | 2rem | 600 | default | -0.015em |
| h3 featured card | Space Grotesk | 1.25rem | 600 | default | default |
| h3 compact card / timeline role | Space Grotesk | 1rem | 600 | 1.35 | default |
| stat number | Space Grotesk | 1.375rem | 600 | default | default |
| hero intro | Inter | 1.0625rem | 400 | 1.65 | default |
| body paragraph | Inter | 1.0625rem | 400 | 1.7 | default |
| card body | Inter | 0.9375rem | 400 | 1.6 | default |
| nav link | Inter | 0.875rem | 500 | default | default |
| eyebrow | IBM Plex Mono | 0.8125rem | 500 | default | 0.09em |
| field label | IBM Plex Mono | 0.75rem | 500 | default | 0.06em |
| detail label (PROBLEM, STACK) | IBM Plex Mono | 0.6875rem | 400 | default | 0.08em |
| stack chip | IBM Plex Mono | 0.6875rem | 400 | default | default |
| skill chip | IBM Plex Mono | 0.6875rem | 400 | default | default |
| terminal | IBM Plex Mono | 0.8125rem | 400/500/600 | 1.7 | default |

`text-wrap: pretty` on the h1. No equivalent in RN; ignore.

### Spacing, radius, shadow
Spacing sits on a 2px grid, not 4px. CLAUDE.md carries the named token set; the raw values below are what those tokens resolve to.

- Page container: max-width **1180px**, horizontal padding **40px**.
- Section vertical padding: **80px** top and bottom, except skills and experience at **64px**. Hero is **104px** top, **96px** bottom. Contact is **80px / 96px**.
- Every section except the hero has `border-top: 1px solid #E2E5EA`.
- Radius: **10px** cards, **8px** image bands and contact badges, **7px** images, **6px** buttons and secondary badges, **999px** chips and dots.
- Card shadow on hover: `0 1px 2px rgba(20,24,31,.04), 0 16px 34px -16px rgba(20,24,31,.24)`.
- Terminal card resting shadow: `0 1px 2px rgba(20,24,31,.04), 0 18px 44px -18px rgba(20,24,31,.16)`.
- Badge hover shadow: `0 8px 20px -12px rgba(20,24,31,.35)`.

## Screens and views

This is one scrolling page. "Screens" below are sections.

### Sticky nav
Hidden until scroll position exceeds **560px** (`motion.navRevealScrollY`, a scroll distance, not the compact breakpoint of the same number), then fades and slides down (`opacity` 0 to 1, `translateY(-100%)` to 0, 350ms). Fixed, full width, `rgba(245,246,248,.86)` with a 12px backdrop blur, 1px bottom border. Inner row is the 1180px container with 14px/40px padding: wordmark "JOSH HENRY" left (IBM Plex Mono 0.8125rem 600, letter-spacing 0.06em), links right with 26px gap: Projects, Skills, Experience, About, Demo, Contact. Links are muted, indigo on hover. `pointer-events` is none while hidden.

RN note: there is no `position: fixed`. Use an absolutely positioned header over the ScrollView, with a shared scroll value the header's reveal animation reads.

RN note: on iOS and Android the nav's top padding adds the device's safe-area top inset (status bar / notch) via `useSafeAreaInsets`, on top of the 14px prototype value - the row's content clears the status bar while the translucent/blurred background still extends all the way to the true top of the screen. The hidden-state slide-up offset grows by the same inset, so the nav doesn't peek out from under the status bar while scrolled up. Web has no such inset, so this is a no-op there.

### Hero (`#top`)
Two-column grid, `1.05fr / 0.95fr`, 64px gap, vertically centered.

**Left column**, 26px vertical gap:
1. Eyebrow row, `space-between`: "SENIOR MOBILE SOFTWARE ENGINEER" (mono eyebrow style) and an "open to work" pill: green text on `rgba(22,163,74,.06)`, 1px `rgba(22,163,74,.28)` border, 999px radius, 3px/10px padding, with a 6px green dot. The pill is `flex: none` and `white-space: nowrap` so it never wraps.
2. h1: "Ten years building apps that hold up, on iOS, Android, and the web."
3. Intro paragraph, max-width 46ch, muted. Exact copy is in the HTML; do not rewrite it.
4. Three secondary badges in a 10px-gap row: LinkedIn, Resume, GitHub. White, 1px border, 6px radius, 12px/18px padding, mono 0.8125rem. Hover: indigo border and text, lift 2px, badge shadow.

**Right column** is the terminal card: white, 1px border, 10px radius, terminal shadow, `overflow: hidden`. Parts top to bottom:
- Chrome bar, 13px/18px padding, paper background, 1px bottom border: three 11px macOS traffic lights left, "~/josh/tech" centered, "zsh" right, both mono 0.75rem muted.
- A 2px progress rail: paper track with an indigo fill animating `width` 0 to 100% over 4.2s, 0.3s delay, `cubic-bezier(.3,.7,.3,1)`.
- Command line, 20px/20px/8px padding: indigo `$`, then the typed command, then a 7px blinking block caret (1s `step-end` infinite).
- Log area, fixed **224px** height, `overflow: hidden`, 20px horizontal padding. Seven rows ordered longest to shortest, each: muted `·`, tech name in ink 500, a dotted leader that flexes to fill, and the years right-aligned in muted. Rows fade and rise in on staggered delays from 1.5s to 3.9s in 0.4s steps. The technology and year values are canonical facts in CLAUDE.md; render them from `src/data/` rather than retyping.
- Stat grid, 2 columns, paper background, 1px internal borders. Six panels in this order: **10 yrs / software development**, **23 yrs / in IT and software**, **8 / iOS apps shipped**, **4 / Android apps shipped**, **2 / frameworks & SDKs shipped**, **4 / web apps shipped**.

The typed command is `ls ~/tech --sort=hands-on-build-time`. The flag is load-bearing copy: Josh wants it clear these are real hands-on build hours, not years employed near the technology. Do not shorten it.

### Projects (`#projects`)
Heading row: "Projects" plus a mono caption "click a card to expand".

**Featured grid**: 2 columns, 20px gap. Streem spans both columns; Gen Con and Mind Yeti are half-width; the two Second Step cards are half-width. Each featured card: white, 1px border, 10px radius, 26px/28px padding, pointer cursor.

Card anatomy:
- Image band on top: `aspect-ratio: 7/3`, white, 1px border, 8px radius, 22px bottom margin, `overflow: hidden`. Image is `object-fit: contain` (`resizeMode="contain"` in React Native), 7px radius. The band ratio matches the source art (700x300) so `contain` produces no letterbox. **The Streem card is the exception**: its band carries `padding: 58px 27%` because the asset is a wide wordmark that must never be cropped or oversized.
- Header row: title and subtitle left, an expand affordance right, mono 0.75rem indigo, reading `+ details` when collapsed and `− close` when open.
- Stack chips: paper background, 1px border, 999px radius, 5px/11px padding, mono 0.6875rem muted. One chip per technology; never combine several into one chip.
- Expanded detail, revealed on tap: a **single-column** flex stack, 18px gap, 24px top margin and padding, 1px top border. Each field is a mono label (PROBLEM, WHAT I BUILT, STACK, OUTCOME) above a 0.9375rem paragraph. Single column matters: a two-column grid left ragged vertical gaps when field lengths differed.

**"ALSO SHIPPED" divider**: mono label plus a 1px rule filling the remaining width.

**Compact grid**: 3 columns, 16px gap. Cards are white, 1px border, 10px radius, `overflow: hidden`, with the same 7/3 image band (bottom border instead of full border, no radius on the band) and an 18px/20px body. Body is title plus expand affordance, a mono tech line, and on expand a single paragraph.

Order is fixed: Diablo Golf v2 first, then My Fish Pal, Zen Builder, Vista Weather, Skylines Trivia, SpinWheelControl.

No project links to an App Store or repo. Copy only.

### Skills (`#skills`)
Heading, then a 2-column grid, 18px row gap and 48px column gap. Each group is its own row: a 132px mono label column and a wrapping chip area, 6px gap, with a 1px bottom border and 14px bottom padding. Chips are white with a 1px border, 4px/9px padding, mono 0.6875rem.

Ten groups: Languages, React Native, UI / UX, Media, Data & State, Testing, Build & Release, Tools, Methodologies, AI. Full contents are in the prototype, in the `skillGroups` array near the bottom of the file.

### Experience (`#experience`)
A compact timeline, deliberately not a bulleted resume dump. Projects already carry the detail; this section carries the shape of the career.

Container: 56px left padding, max-width 820px, `position: relative`. Two absolutely positioned 1px verticals at `left: 6px`, inset 10px top and bottom: a static `#E2E5EA` track and an indigo rail that animates `scaleY` 0 to 1 over 1.6s from `transform-origin: top`, 0.3s delay.

Five rows, 8px gap. Each row: white card, 1px border, 8px radius, 14px/20px padding, grid `104px 1fr` with 22px gap and baseline alignment. Absolutely positioned inside each row: a 9px indigo dot at `left: -54px, top: 21px` with a 4px paper ring, and a 1px connector at `left: -49px, top: 25px, width: 49px` running from rail to card. **These offsets are calibrated to the 56px container padding.** If you change the padding, recompute them, or the dots detach from the rail.

Row content: mono date range in the left column; then role (Space Grotesk 1rem 600), company line (Inter 0.875rem muted), and a mono 0.6875rem note in `#B6BDC7`. Rows stagger in at 0.09s intervals.

The five roles and their dates are canonical facts in CLAUDE.md. Render them from `src/data/experience.ts`.

### About (`#about`)
Grid `1fr / 260px`, 56px gap, top-aligned. Left is the heading plus two paragraphs at max-width 62ch: one professional, one personal. Right is the headshot at 100% width, 10px radius, 1px border. No chips or tags; the degree is folded into the prose.

### Run this site as an app (`#app`)
Nav label "Demo". Standard section shell: 1180px container, 80px vertical padding, 1px top border. Inside, a 36px-gap column holding an intro row above a full-width Snack card.

**Intro row**: grid `1.05fr / 0.95fr`, 56px gap, top-aligned.

Left, 20px gap: a baseline row of the h2 "Run this site as an app" plus "iOS + ANDROID" in mono 0.75rem `#98A1B0` at 0.09em; the intro paragraph at max-width 56ch in `#3A424F`; then a three-step list, 12px gap, each step a mono 0.75rem 600 indigo number (`01`, `02`, `03`) beside 0.9375rem body at line-height 1.6. The list is a numbered sequence, so use an ordered list semantically even though the numbers are drawn manually.

Right is the pitch card: white, 1px border, 10px radius, 22px/24px padding, 12px gap. A mono 0.75rem `#5B6472` label reading "I CAN DO THIS FOR YOU" at 0.06em, a 0.9375rem paragraph at line-height 1.7, then a mono 0.8125rem indigo link "Talk to me about your app →" anchored to `#contact`. This card is the commercial point of the section and shows on every platform, including native.

**Snack card**, full content width: white, 1px border, 10px radius, terminal shadow, `overflow: hidden`. Chrome bar matches the hero terminal's proportions (13px/18px padding, paper background, 1px bottom border): "expo snack" in mono 0.75rem muted left, a green "live editor" pill with a 6px dot right. Below it the embed at **560px** tall, full width, no border.

Embed rules:
- Show Expo's standard embed in full, code pane and simulator side by side. An earlier pass cropped the iframe to hide the editor; that was reverted. Expo has no parameter for a preview-only embed, its split is responsive, and on this section the visible source is part of the argument.
- The embed is **web only**. On web at `breakpoint.compact` and below, the iframe is replaced by the "NEEDS A WIDER WINDOW" card: mono label, a short paragraph explaining the editor needs a wider window, and an "Open the Snack" badge (styled like the contact badges) that opens the Snack URL via `Linking.openURL` - a new tab on web, the system browser on native, no popup sizing. On iOS and Android the iframe is replaced instead by a "SEE IT ON THE WEB" card pointing at the live joshhenry.info site, since the app is already running natively there. Do not attempt to load the embed in a `WebView`.
- The Snack URL is a single config value, not hardcoded per platform. While it is unset the web build shows a striped placeholder card at the same 560px height reading "Snack embed loads here", and the mobile card shows plain "Snack link goes here once published" text instead of a button. Never ship a placeholder that points at a real-looking URL.

### Contact (`#contact`)
Grid `1fr / 1fr`, 56px gap.

Left column is centered, 18px gap: "Let's build something great", a paragraph stating remote in the U.S. or hybrid in Portland, then three stacked badges at max-width 320px: LinkedIn, GitHub, resume.pdf. The first two both read "joshdhenry" and are told apart by their icons, so each needs a distinct `accessibilityLabel` ("LinkedIn profile", "GitHub profile"). There is deliberately no email badge; see the privacy rules in CLAUDE.md. Each badge is white, 1px border, 8px radius, 11px/16px padding, an 18px inline SVG logo, then mono 0.8125rem text. Hover lifts 2px with indigo border and text.

Right column is the form: white card, 1px border, 10px radius, 26px padding, 16px gap. Three fields (NAME, EMAIL, MESSAGE at 5 rows), each a mono uppercase label above an input with a 1px border, 6px radius, 11px/13px padding, paper background. On focus the border turns indigo and the background turns white. Submit button is indigo, white text, 6px radius, 12px/22px padding, 600 weight, and **must carry `white-space: nowrap`**; without it "Send message" wrapped and spilled outside the button.

### Footer
White, 1px top border, 28px/40px padding inside the 1180px container, `space-between`. Left: a mono note that Josh designed and built the site in React Native and Expo, one codebase across iOS, Android, and web, developed AI-assisted with Claude Code. Right: a "Source" link and a copyright line.

RN note: on iOS and Android the page's ScrollView adds the device's safe-area bottom inset (home indicator / gesture or button bar) as extra padding below the footer, via `useSafeAreaInsets`. Web has no such inset, so this is a no-op there.

## Interactions and behavior

### Project card expand
Each card toggles independently. State is a map of card id to boolean. Tapping anywhere on the card toggles it. The affordance label flips between `+ details` and `− close`. Content expands in place and pushes the page down; there is no modal and no accordion behavior (multiple cards may be open at once).

### Entrance animations
Every revealable element uses a `rise` keyframe: `opacity 0 → 1`, `translateY(16px) → 0`. Durations 0.5s to 0.7s, easing `cubic-bezier(.2,.9,.3,1)`.

Important implementation history: these were originally driven entirely by IntersectionObserver, which left the whole page invisible in any context where the observer never fired. **The visible state must be the default, with motion as enhancement.** Do not author elements at `opacity: 0` and rely on JS to reveal them.

Named animations: `rise` (entrances), `cardIn` (terminal card, adds `scale(.985)`), `drawY` (`scaleY` 0 to 1, timeline rail), `barFill` (`width` 0 to 100%, terminal progress), `caret` (1s `step-end` blink).

### Counters
The six hero stats count up from 0 with a cubic ease-out over **2200ms**, then snap to the exact final value. The real number is what is rendered in markup; the animation only starts once the rAF loop actually runs, so a throttled or backgrounded tab shows the correct number rather than a zero.

### Hover, and its native equivalent
Web hover: project cards and timeline rows lift 4px and gain the card shadow; images inside scale to 1.06; badges lift 2px and turn indigo. Transitions are 250 to 500ms on `cubic-bezier(.2,.9,.3,1)`.

**React Native has no hover.** Josh's decision: use `onHoverIn`/`onHoverOut` on web and `onPressIn`/`onPressOut` on native so the feel matches on every platform. `Pressable` gives you both.

### Scroll-driven effects
Two: the sticky nav appearing past 560px **of vertical scroll** (unrelated to the 560px compact breakpoint, which is a window width; give it its own token, for example `motion.navRevealScrollY`), and a parallax on the terminal card (`translateY` clamped to ±28px at `(scrollY - 120) * -0.055`). One shared scroll value, written from the page ScrollView's own `onScroll`, drives both across every platform - no separate web/native scroll listeners needed.

Section reveals in the HTML fire on scroll position. Josh chose scroll math over animate-on-mount specifically so sections below the fold do not finish animating before you reach them. On native this is `onLayout` plus scroll offset comparison, and it is the fiddliest part of the port.

### Smooth scrolling
Nav links are in-page anchors with `scroll-behavior: smooth`. On native, map each anchor to a measured section offset and `scrollTo({ animated: true })`.

### Form
Endpoint and anti-spam requirements are in CLAUDE.md. Design-side: there is no validation styling in the prototype, and success and error states are not designed. Propose both before building.

## Responsive
**Designed.** Two breakpoints, driven by width, not platform.

On **iOS and Android the narrow layout always applies**, since a phone is never wider than the breakpoint in practice. On **web it applies only when the browser window is narrow**; a normal desktop window gets the full layout described above. In React Native this is `useWindowDimensions()`, read once and threaded through as an `isNarrow` boolean; the HTML uses media queries against the same numbers.

### At 900px and below
- Section horizontal padding drops from 40px to **24px**; vertical padding from 80px to **56px** (hero 72px top, 64px bottom).
- **Hero** stacks to one column, 40px gap. The terminal card sits below the copy. The eyebrow row wraps and left-aligns, so the "open to work" pill drops under the title rather than being squeezed.
- **h1** drops from 3.5rem to **2.5rem**.
- **Terminal log** height goes from a fixed 224px to `auto`, so all seven rows show without clipping at any width.
- **Projects**: both the 2-column featured grid and the 3-column compact grid collapse to **1 column**, 16px gap. The Streem card's `span 2` becomes `span 1`.
- **Skills**: 2 columns to 1, and each group's `132px 1fr` row becomes a stacked label above its chips.
- **Experience**: rail padding drops to 26px and each row goes single-column, with the date above the role. The dot and connector offsets are recalculated for the new padding (`left: -24px` and `left: -19px; width: 19px`).
- **About** stacks, with the headshot capped at 200px so it doesn't dominate.
- **Run this site as an app** stacks to one column, intro row above the Snack card and the pitch card moved below it. The Snack iframe itself keeps showing at this width; it only swaps for the "NEEDS A WIDER WINDOW" card once the window also drops below `breakpoint.compact`.
- **Contact** stacks, form below the badges.
- **Nav** padding tightens to 20px and link gap to 16px at 0.8125rem.

### At 560px and below
- **h1** drops again to **2rem**.
- Section padding tightens to **18px**.
- Nav links go to 0.75rem with a 12px gap.

### Implementation note
In the HTML the rules are injected as a stylesheet at mount and use `!important`, because the base layout is authored in inline styles and inline styles otherwise win. **Do not carry that pattern into React Native.** There, branch the style objects on `isNarrow` instead.

### Still open
Touch targets on native must be at least 44px. The card expand affordance is a small text label; make the whole card the target, as it is on web.

## State
Small. In the HTML it is:
- `typed`: the progressively typed terminal command, advanced by an interval every 52ms.
- `open`: map of project card id to expanded boolean.

Everything else is derived or static. There is no data fetching. Project, skill, and log content is hardcoded and should live in typed constants or a small local data module, not a CMS.

## Assets
All in this bundle's `assets/` folder, named to match what the prototype references. Copy the whole folder into the React Native project's `assets/`, resume PDF included.

| File | Used by |
| --- | --- |
| `portfolio-streem.jpg` | Streem card. A wide wordmark: pad it, never crop or oversize it. |
| `portfolio-gencon.png` | Gen Con card. The tagline was white on transparent and invisible on a white card, so it has been recolored to `#2C2A25`. |
| `portfolio-mindyeti.png` | Mind Yeti card |
| `portfolio-secondstep-k8.png` | Second Step K-8 card |
| `portfolio-secondstep-adults.png` | Second Step SEL for Adults card |
| `portfolio-diablogolf.png` | Diablo Golf card |
| `portfolio-myfishpal.jpg` | My Fish Pal card |
| `portfolio-zenbuilder.jpg` | Zen Builder card |
| `portfolio-vistaweather.jpg` | Vista Weather card |
| `portfolio-skylinestrivia.jpg` | Skylines Trivia card |
| `portfolio-spinwheelcontrol.jpg` | SpinWheelControl card |
| `headshot.png` | About section |
| `resume.pdf` | Resume badges in hero and contact |

Most project graphics are 700x300, which is why image bands use a 7/3 aspect ratio. The Streem wordmark is 480x144 and is padded rather than fitted.

Icons are inline SVG: the GitHub mark in `#14181F`, the LinkedIn mark in `#0A66C2`, and a document outline in indigo strokes for the resume badge. Use `react-native-svg`.

## Build order
Tokens, then static layout top to bottom, then `isNarrow` branching, then interaction, then motion last.

Motion last matters. The prototype went through three rounds of breakage from animating before the layout was settled, each time leaving parts of the page invisible.

## Files
- `joshhenry.info.dc.html`: the complete design. Open it in a browser to see every animation and interaction. `support.js` sits beside it and is required for it to render; neither file belongs in the React Native project.
- `resume.txt`: the shipped `resume.pdf` as plain text with contact details removed. Source for experience and project copy.
- `assets/`: every image and the resume PDF.
