import type { TextStyleToken } from "@/types/theme";

/**
 * Font family constants. These string values must exactly match the
 * PostScript names registered by the loaded @expo-google-fonts packages
 * (see src/app/_layout.tsx's useFonts call) — they are the single place
 * mapping "semantic weight" to "loaded font constant name."
 */
export const fontFamily = {
    spaceGroteskSemiBold: "SpaceGrotesk_600SemiBold",
    interRegular: "Inter_400Regular",
    interMedium: "Inter_500Medium",
    interSemiBold: "Inter_600SemiBold",
    plexMonoRegular: "IBMPlexMono_400Regular",
    plexMonoMedium: "IBMPlexMono_500Medium",
    plexMonoSemiBold: "IBMPlexMono_600SemiBold",
};

/**
 * Named text styles. Sizes are converted from designs/README.md's rem
 * values at a 16px root (1rem = 16px). Letter-spacing is converted from em
 * to px per entry (RN's letterSpacing is absolute, not relative to font
 * size), so each responsive headline tier gets its own computed value.
 */
export const typeScale = {
    // General scale from CLAUDE.md, kept for use by later sections.
    display: {
        fontFamily: fontFamily.spaceGroteskSemiBold,
        fontSize: 56,
        lineHeight: 58.8,
        fontWeight: "600",
        letterSpacing: -1.23,
    } satisfies TextStyleToken,
    h2: {
        fontFamily: fontFamily.spaceGroteskSemiBold,
        fontSize: 32,
        lineHeight: 38.4,
        fontWeight: "600",
        letterSpacing: -0.48,
    } satisfies TextStyleToken,
    body: {
        fontFamily: fontFamily.interRegular,
        fontSize: 17,
        lineHeight: 27.2,
        fontWeight: "400",
    } satisfies TextStyleToken,
    small: {
        fontFamily: fontFamily.interRegular,
        fontSize: 14,
        lineHeight: 21,
        fontWeight: "400",
    } satisfies TextStyleToken,
    mono: {
        fontFamily: fontFamily.plexMonoMedium,
        fontSize: 13,
        lineHeight: 18.2,
        fontWeight: "500",
    } satisfies TextStyleToken,

    // Hero-specific entries, values taken directly from designs/README.md.
    heroHeadline: {
        fontFamily: fontFamily.spaceGroteskSemiBold,
        fontSize: 56, // 3.5rem
        lineHeight: 58.8, // 1.05
        fontWeight: "600",
        letterSpacing: -1.232, // -.022em * 56
    } satisfies TextStyleToken,
    heroHeadlineNarrow: {
        fontFamily: fontFamily.spaceGroteskSemiBold,
        fontSize: 40, // 2.5rem, <= layoutBreakpoint.narrow
        lineHeight: 42,
        fontWeight: "600",
        letterSpacing: -0.88,
    } satisfies TextStyleToken,
    heroHeadlineCompact: {
        fontFamily: fontFamily.spaceGroteskSemiBold,
        fontSize: 32, // 2rem, <= layoutBreakpoint.compact
        lineHeight: 33.6,
        fontWeight: "600",
        letterSpacing: -0.704,
    } satisfies TextStyleToken,
    heroIntro: {
        fontFamily: fontFamily.interRegular,
        fontSize: 17, // 1.0625rem
        lineHeight: 28.05, // 1.65
        fontWeight: "400",
    } satisfies TextStyleToken,
    eyebrow: {
        fontFamily: fontFamily.plexMonoMedium,
        fontSize: 13, // .8125rem
        lineHeight: 16,
        fontWeight: "500",
        letterSpacing: 1.17, // .09em * 13
    } satisfies TextStyleToken,
    openToWorkLabel: {
        fontFamily: fontFamily.plexMonoMedium,
        fontSize: 12, // .75rem
        lineHeight: 15,
        fontWeight: "500",
    } satisfies TextStyleToken,
    badgeLabel: {
        fontFamily: fontFamily.plexMonoMedium,
        fontSize: 13, // .8125rem
        lineHeight: 16,
        fontWeight: "500",
    } satisfies TextStyleToken,
    chromeLabel: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 12, // .75rem
        lineHeight: 15,
        fontWeight: "400",
    } satisfies TextStyleToken,
    terminalCommand: {
        fontFamily: fontFamily.plexMonoMedium,
        fontSize: 13, // .8125rem
        lineHeight: 22.75, // 1.75
        fontWeight: "500",
    } satisfies TextStyleToken,
    terminalLogRow: {
        fontFamily: fontFamily.plexMonoMedium,
        fontSize: 13, // .8125rem
        lineHeight: 22.1, // 1.7
        fontWeight: "500",
    } satisfies TextStyleToken,
    statNumber: {
        fontFamily: fontFamily.spaceGroteskSemiBold,
        fontSize: 22, // 1.375rem
        lineHeight: 26,
        fontWeight: "600",
    } satisfies TextStyleToken,
    statLabel: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 12, // .75rem
        lineHeight: 15,
        fontWeight: "400",
    } satisfies TextStyleToken,

    /**
     * Floor for the native shrink-to-fit applied to the terminal command
     * line (see TerminalCommandLine.tsx) — how far adjustsFontSizeToFit is
     * allowed to shrink terminalCommand's fontSize on iOS/Android before
     * falling back to ellipsizeMode. Low enough to cover both platforms'
     * font-metric differences at the narrowest verified phone width.
     */
    terminalCommandMinimumFontScale: 0.62,

    // Projects-specific entries, values taken directly from designs/README.md.
    projectsCaption: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 13, // .8125rem, "click a card to expand"
        lineHeight: 18.2,
        fontWeight: "400",
    } satisfies TextStyleToken,
    projectsDividerLabel: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 12, // .75rem, "ALSO SHIPPED"
        lineHeight: 16.8,
        fontWeight: "400",
        letterSpacing: 1.08, // .09em * 12
    } satisfies TextStyleToken,
    projectFeaturedTitle: {
        fontFamily: fontFamily.spaceGroteskSemiBold,
        fontSize: 20, // 1.25rem
        lineHeight: 26,
        fontWeight: "600",
    } satisfies TextStyleToken,
    projectCompactTitle: {
        fontFamily: fontFamily.spaceGroteskSemiBold,
        fontSize: 16, // 1rem
        lineHeight: 21.6, // 1.35
        fontWeight: "600",
    } satisfies TextStyleToken,
    /**
     * Shared by the featured card subtitle and the expanded detail
     * paragraphs (PROBLEM/WHAT I BUILT/STACK/OUTCOME); color differs by
     * context (colors.inkMuted for the subtitle, colors.inkSecondary for
     * detail body copy).
     */
    projectSubtitleAndBody: {
        fontFamily: fontFamily.interRegular,
        fontSize: 15, // .9375rem
        lineHeight: 24, // 1.6
        fontWeight: "400",
    } satisfies TextStyleToken,
    projectExpandAffordance: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 12, // .75rem, featured card "+ details" / "− close"
        lineHeight: 16.8,
        fontWeight: "400",
    } satisfies TextStyleToken,
    projectExpandAffordanceCompact: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 11, // .6875rem, compact card "+ details" / "− close"
        lineHeight: 15.4,
        fontWeight: "400",
    } satisfies TextStyleToken,
    projectStackChip: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 11, // .6875rem
        lineHeight: 15.4,
        fontWeight: "400",
    } satisfies TextStyleToken,
    projectDetailLabel: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 11, // .6875rem, PROBLEM/WHAT I BUILT/STACK/OUTCOME labels
        lineHeight: 15.4,
        fontWeight: "400",
        letterSpacing: 0.88, // .08em * 11
    } satisfies TextStyleToken,
    projectCompactTechLine: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 12, // .75rem, e.g. "Swift" or "Objective-C · Swift · Java"
        lineHeight: 16.8,
        fontWeight: "400",
    } satisfies TextStyleToken,

    // Skills-specific entries, values taken directly from designs/README.md.
    skillGroupLabel: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 12, // .75rem, e.g. "LANGUAGES"
        lineHeight: 15,
        fontWeight: "400",
        letterSpacing: 0.72, // .06em * 12
    } satisfies TextStyleToken,
    skillChip: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 11, // .6875rem
        lineHeight: 15.4,
        fontWeight: "400",
    } satisfies TextStyleToken,

    // Experience-specific entries, values taken directly from designs/README.md
    // and designs/joshhenry.info.dc.html.
    experienceRangeLabel: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 13, // .8125rem, e.g. "2016 to 2026"
        lineHeight: 18.2,
        fontWeight: "400",
    } satisfies TextStyleToken,
    experienceRole: {
        fontFamily: fontFamily.spaceGroteskSemiBold,
        fontSize: 16, // 1rem
        lineHeight: 21.6, // 1.35
        fontWeight: "600",
    } satisfies TextStyleToken,
    experienceCompanyLine: {
        fontFamily: fontFamily.interRegular,
        fontSize: 14, // .875rem
        lineHeight: 21,
        fontWeight: "400",
    } satisfies TextStyleToken,
    experienceNote: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 11, // .6875rem
        lineHeight: 15.4,
        fontWeight: "400",
    } satisfies TextStyleToken,
    experienceDateLabel: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 12, // .75rem
        lineHeight: 15,
        fontWeight: "400",
        letterSpacing: 0.24, // .02em * 12
    } satisfies TextStyleToken,

    // About-specific entry, values taken directly from
    // designs/joshhenry.info.dc.html's literal #about paragraph style.
    aboutParagraph: {
        fontFamily: fontFamily.interRegular,
        fontSize: 17, // 1.0625rem
        lineHeight: 28.9, // 1.7 — differs from heroIntro's 1.65, per the prototype's literal value
        fontWeight: "400",
    } satisfies TextStyleToken,

    // Contact-specific entries, values taken directly from
    // designs/joshhenry.info.dc.html's literal #contact styles.
    contactAvailability: {
        fontFamily: fontFamily.interRegular,
        fontSize: 17, // 1.0625rem
        lineHeight: 28.9, // 1.7, matches aboutParagraph's literal prototype value
        fontWeight: "400",
    } satisfies TextStyleToken,
    contactBadgeLabel: {
        fontFamily: fontFamily.plexMonoMedium,
        fontSize: 13, // .8125rem
        lineHeight: 16,
        fontWeight: "500",
    } satisfies TextStyleToken,
    contactFieldLabel: {
        fontFamily: fontFamily.plexMonoMedium,
        fontSize: 12, // .75rem, e.g. "NAME"
        lineHeight: 15,
        fontWeight: "500",
        letterSpacing: 0.72, // .06em * 12
    } satisfies TextStyleToken,
    contactInputText: {
        fontFamily: fontFamily.interRegular,
        fontSize: 15, // .9375rem
        lineHeight: 22.5, // 1.5
        fontWeight: "400",
    } satisfies TextStyleToken,
    contactSubmitLabel: {
        fontFamily: fontFamily.interSemiBold,
        fontSize: 15, // .9375rem
        lineHeight: 21,
        fontWeight: "600",
    } satisfies TextStyleToken,
    contactStatusMessage: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 12, // .75rem
        lineHeight: 16.8,
        fontWeight: "400",
    } satisfies TextStyleToken,

    // Sticky nav specific entries, values taken directly from
    // designs/joshhenry.info.dc.html's literal nav styles and
    // designs/README.md's narrow/compact responsive notes.
    navWordmark: {
        fontFamily: fontFamily.plexMonoSemiBold,
        fontSize: 13, // .8125rem
        lineHeight: 16,
        fontWeight: "600",
        letterSpacing: 0.78, // .06em * 13
    } satisfies TextStyleToken,
    navLink: {
        fontFamily: fontFamily.interMedium,
        fontSize: 14, // .875rem
        lineHeight: 21,
        fontWeight: "500",
    } satisfies TextStyleToken,
    navLinkNarrow: {
        fontFamily: fontFamily.interMedium,
        fontSize: 13, // .8125rem, <= layoutBreakpoint.narrow
        lineHeight: 19.5,
        fontWeight: "500",
    } satisfies TextStyleToken,
    navLinkCompact: {
        fontFamily: fontFamily.interMedium,
        fontSize: 12, // .75rem, <= layoutBreakpoint.compact
        lineHeight: 18,
        fontWeight: "500",
    } satisfies TextStyleToken,

    // Footer-specific entry, shared by the note, "Source" link, and
    // copyright line. Value taken directly from designs/joshhenry.info.dc.html's
    // literal <footer> styles - none of the three set a font-weight, so
    // (matching this codebase's existing convention for unspecified-weight
    // mono text, e.g. projectExpandAffordance/chromeLabel) it's regular.
    footerText: {
        fontFamily: fontFamily.plexMonoRegular,
        fontSize: 12, // .75rem
        lineHeight: 16.8, // 1.4
        fontWeight: "400",
    } satisfies TextStyleToken,
};
