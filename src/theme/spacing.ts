/**
 * space.unit = 4px. A 4px base grid keeps vertical rhythm consistent and
 * divides cleanly across sizes. Every general-purpose spacing value is a
 * named multiple of this unit.
 */
const unit = 4;

export const space = {
    xs: unit * 1, // 4
    sm: unit * 2, // 8
    md: unit * 4, // 16
    lg: unit * 6, // 24
    xl: unit * 10, // 40
    xxl: unit * 16, // 64
};

/**
 * Escape hatch for measurements that come directly from the high-fidelity
 * designs/README.md spec and do not land cleanly on the 4px grid above.
 * Rounding these to the nearest space.* token would be a visible regression
 * from the "colors, typography, spacing, copy are final" fidelity mandate,
 * so each gets its own named, commented token instead, per CLAUDE.md's own
 * escape-hatch rule ("if a new value is genuinely needed, add a named token
 * with a comment explaining what it represents").
 */
export const heroSpace = {
    /** Vertical gap between hero left-column blocks (eyebrow/h1/intro/badges). */
    columnGap: 26,
    /** Two-column grid gap between the hero copy and the terminal card. */
    gridGap: 64,
    /** Hero section top padding at desktop widths. */
    sectionPaddingTopWide: 104,
    /** Hero section bottom padding at desktop widths. */
    sectionPaddingBottomWide: 96,
    /** Hero section top padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingTopNarrow: 72,
    /** Hero section bottom padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingBottomNarrow: 64,
    /** Section horizontal padding at desktop widths. */
    sectionPaddingHorizontalWide: 40,
    /** Section horizontal padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingHorizontalNarrow: 24,
    /** Section horizontal padding at widths <= layoutBreakpoint.compact. */
    sectionPaddingHorizontalCompact: 18,
    /** Fixed terminal log height so exactly 7 rows show at >= narrow widths. */
    terminalLogHeight: 224,
    /** Terminal chrome bar vertical padding. */
    terminalChromePaddingVertical: 13,
    /** Terminal chrome bar horizontal padding. */
    terminalChromePaddingHorizontal: 18,
    /** Terminal command line top padding. */
    terminalCommandPaddingTop: 20,
    /** Terminal command line bottom padding. */
    terminalCommandPaddingBottom: 8,
    /** Terminal log rows horizontal padding. */
    terminalLogPaddingHorizontal: 20,
    /** Terminal stat panel padding. */
    statPanelPaddingVertical: 15,
    statPanelPaddingHorizontal: 20,
    /** Gap between the three action badges. */
    badgeGap: 10,
    /** Action badge internal padding. */
    badgePaddingVertical: 12,
    badgePaddingHorizontal: 18,
    /** Gap between the badge row and the elements around it. */
    actionsRowGap: 26,
    /**
     * Approximates the intro paragraph's 46ch max-width (RN has no ch unit)
     * at Inter 1.0625rem's average glyph width.
     */
    introMaxWidth: 520,
    /** Hero section container max-width. */
    containerMaxWidth: 1180,
};
