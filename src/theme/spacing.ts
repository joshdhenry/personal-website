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

/**
 * Escape hatch for Projects section measurements, same rationale as
 * heroSpace above: exact designs/README.md pixel values, named and commented
 * rather than snapped to the space.* grid.
 */
export const projectsSpace = {
    /** Section top/bottom padding at desktop widths. */
    sectionPaddingVerticalWide: 80,
    /** Section top/bottom padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingVerticalNarrow: 56,
    /** Section horizontal padding at desktop widths. */
    sectionPaddingHorizontalWide: 40,
    /** Section horizontal padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingHorizontalNarrow: 24,
    /** Section horizontal padding at widths <= layoutBreakpoint.compact. */
    sectionPaddingHorizontalCompact: 18,
    /** Section container max-width, matches heroSpace.containerMaxWidth. */
    containerMaxWidth: 1180,
    /** Gap between the "Projects" heading and the "click a card to expand" caption. */
    headingRowGap: 16,
    /** Margin below the heading row, before the featured grid. */
    headingBottomMargin: 12,
    /** Featured grid's own top margin, below the heading row. */
    featuredGridTopMargin: 36,
    /** Featured grid (2-column) gap at desktop/narrow-collapsed widths. */
    featuredGridGap: 20,
    /** Compact grid (3-column) gap at desktop widths. */
    compactGridGap: 16,
    /** Both grids collapse to 1 column at layoutBreakpoint.narrow with this gap. */
    narrowGridGap: 16,
    /** Featured card padding. */
    featuredCardPaddingVertical: 26,
    featuredCardPaddingHorizontal: 28,
    /** Image band bottom margin inside a featured card. */
    imageBandMarginBottom: 22,
    /**
     * Streem-only image band exception: the wordmark asset must never be
     * cropped or oversized, so it gets padding instead of filling the band.
     */
    streemImageBandPaddingVertical: 58,
    streemImageBandPaddingHorizontal: "27%",
    /** Gap between the title/subtitle block and the expand affordance in a featured card's header row. */
    featuredHeaderGap: 20,
    /** Gap between title and subtitle within a featured card's header block. */
    titleBlockGap: 7,
    /** Stack chip row: gap between chips, margin-top above the row. */
    chipRowGap: 7,
    chipRowMarginTop: 16,
    /** Stack chip internal padding. */
    chipPaddingVertical: 5,
    chipPaddingHorizontal: 11,
    /** Expanded detail stack: gap between fields, top margin/padding above the 1px top border. */
    detailGap: 18,
    detailTopMargin: 24,
    detailTopPadding: 24,
    /** Gap between a detail field's mono label and its paragraph. */
    detailFieldGap: 6,
    /** "ALSO SHIPPED" divider: top/bottom margin, gap between label and rule. */
    dividerMarginTop: 44,
    dividerMarginBottom: 20,
    dividerGap: 14,
    /** Compact card body padding. */
    compactBodyPaddingVertical: 18,
    compactBodyPaddingHorizontal: 20,
    /** Compact card body's internal vertical gap (header row -> tech line -> expanded content). */
    compactBodyGap: 6,
    /** Gap between title and expand affordance in a compact card's header row. */
    compactHeaderGap: 12,
    /** Compact card expanded content: top margin/padding above the 1px top border, internal gap. */
    compactDetailMarginTop: 12,
    compactDetailPaddingTop: 12,
    compactDetailGap: 8,
};

/**
 * Escape hatch for Skills section measurements, same rationale as
 * projectsSpace above: exact designs/README.md pixel values, named and
 * commented rather than snapped to the space.* grid.
 */
export const skillsSpace = {
    /** Section top/bottom padding at desktop widths (skills/experience's exception to the general 80px). */
    sectionPaddingVerticalWide: 64,
    /**
     * Section top/bottom padding at widths <= layoutBreakpoint.narrow. Per
     * the prototype's own responsive CSS (designs/joshhenry.info.dc.html's
     * `[data-r="sect"]` rule at max-width: 900px), this general narrow
     * override applies uniformly with no Skills-specific exception.
     */
    sectionPaddingVerticalNarrow: 56,
    /** Section horizontal padding at desktop widths. */
    sectionPaddingHorizontalWide: 40,
    /** Section horizontal padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingHorizontalNarrow: 24,
    /** Section horizontal padding at widths <= layoutBreakpoint.compact. */
    sectionPaddingHorizontalCompact: 18,
    /** Section container max-width, matches projectsSpace.containerMaxWidth. */
    containerMaxWidth: 1180,
    /** Margin below the heading, before the group grid. */
    headingBottomMargin: 28,
    /** Group grid: row gap and column gap between the two columns of groups. */
    gridRowGap: 18,
    gridColumnGap: 48,
    /** Fixed width of a group row's mono label column at wide widths. */
    groupLabelColumnWidth: 132,
    /** Gap between a group row's label and its chip area. */
    groupLabelChipGap: 16,
    /** Bottom padding under each group row, above its 1px bottom border. */
    groupRowBottomPadding: 14,
    /** Gap between chips within a group's chip row. */
    chipRowGap: 6,
    /** Chip internal padding. */
    chipPaddingVertical: 4,
    chipPaddingHorizontal: 9,
    /** Optical alignment of the group label's first line with the chip row. */
    groupLabelPaddingTop: 3,
};

/**
 * Escape hatch for About section measurements, same rationale as
 * projectsSpace above: exact designs/README.md / designs/joshhenry.info.dc.html
 * pixel values, named and commented rather than snapped to the space.* grid.
 */
export const aboutSpace = {
    /** Section top/bottom padding at desktop widths (standard 80px, not the skills/experience exception). */
    sectionPaddingVerticalWide: 80,
    /** Section top/bottom padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingVerticalNarrow: 56,
    /** Section horizontal padding at desktop widths. */
    sectionPaddingHorizontalWide: 40,
    /** Section horizontal padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingHorizontalNarrow: 24,
    /** Section horizontal padding at widths <= layoutBreakpoint.compact. */
    sectionPaddingHorizontalCompact: 18,
    /** Section container max-width, matches projectsSpace.containerMaxWidth. */
    containerMaxWidth: 1180,
    /** Gap between the heading and the two paragraphs in the text column. */
    textColumnGap: 20,
    /** Two-column grid gap between the text column and the portrait, above layoutBreakpoint.narrow. */
    gridGap: 56,
    /** Grid gap at widths <= layoutBreakpoint.narrow, where it stacks to one column. */
    gridGapNarrow: 28,
    /** Fixed portrait column width above layoutBreakpoint.narrow (grid's "260px" track). */
    portraitColumnWidth: 260,
    /** Portrait max-width when stacked at widths <= layoutBreakpoint.narrow. */
    portraitMaxWidthNarrow: 200,
    /**
     * Approximates the paragraphs' 62ch max-width (RN has no ch unit) at
     * Inter 1.0625rem's average glyph width, same conversion
     * heroSpace.introMaxWidth uses (46ch -> 520px; 520/46 ~= 11.3px/ch, so
     * 62ch ~= 700px).
     */
    paragraphMaxWidth: 700,
};

/**
 * Escape hatch for Experience section measurements, same rationale as
 * skillsSpace above: exact designs/README.md / designs/joshhenry.info.dc.html
 * pixel values, named and commented rather than snapped to the space.* grid.
 */
export const experienceSpace = {
    /** Section top/bottom padding at desktop widths (skills/experience's exception to the general 80px). */
    sectionPaddingVerticalWide: 64,
    /** Section top/bottom padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingVerticalNarrow: 56,
    /** Section horizontal padding at desktop widths. */
    sectionPaddingHorizontalWide: 40,
    /** Section horizontal padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingHorizontalNarrow: 24,
    /** Section horizontal padding at widths <= layoutBreakpoint.compact. */
    sectionPaddingHorizontalCompact: 18,
    /** Section container max-width, matches skillsSpace.containerMaxWidth. */
    containerMaxWidth: 1180,
    /** Gap between the "Experience" heading and its "2016 to 2026" mono span. */
    headingRowGap: 16,
    /** Margin below the heading row, before the timeline. */
    headingBottomMargin: 32,
    /** Timeline container max-width. */
    timelineMaxWidth: 820,
    /** Timeline container left padding at desktop widths, where the rail/dots live. */
    timelinePaddingLeftWide: 56,
    /** Timeline container left padding at widths <= layoutBreakpoint.narrow. */
    timelinePaddingLeftNarrow: 26,
    /** Rail track/fill horizontal offset from the timeline container's left edge. */
    railLeft: 6,
    /** Rail track/fill top and bottom inset from the timeline container's edges. */
    railInset: 10,
    /** Gap between timeline rows. */
    rowGap: 8,
    /** Row card padding. */
    rowPaddingVertical: 14,
    rowPaddingHorizontal: 20,
    /** Row's fixed-width date column at desktop widths. */
    rowGridDateColumnWidth: 104,
    /** Gap between a row's date column and its content block at desktop widths. */
    rowGridGap: 22,
    /** Row's date-above-role gap at widths <= layoutBreakpoint.narrow. */
    rowGridGapNarrow: 6,
    /** Gap between role/company line/note within a row's content block. */
    rowContentGap: 3,
    /** Row dot diameter. */
    dotSize: 9,
    /** Row dot's paper ring diameter (dotSize + dotRingInset * 2). */
    dotRingSize: 17,
    /** Row dot's paper ring thickness on each side. */
    dotRingInset: 4,
    /** Dot left/top offset, calibrated to timelinePaddingLeftWide (56px). */
    dotLeftWide: -54,
    dotTopWide: 21,
    /** Dot left/top offset, calibrated to timelinePaddingLeftNarrow (26px). */
    dotLeftNarrow: -24,
    dotTopNarrow: 20,
    /** Connector left/top/width, calibrated to timelinePaddingLeftWide (56px). */
    connectorLeftWide: -49,
    connectorTopWide: 25,
    connectorWidthWide: 49,
    /** Connector left/top/width, calibrated to timelinePaddingLeftNarrow (26px). */
    connectorLeftNarrow: -19,
    connectorTopNarrow: 24,
    connectorWidthNarrow: 19,
};

/**
 * Escape hatch for Contact section measurements, same rationale as
 * aboutSpace above: exact designs/README.md / designs/joshhenry.info.dc.html
 * pixel values, named and commented rather than snapped to the space.* grid.
 */
export const contactSpace = {
    /** Section top/bottom padding at desktop widths, per designs/README.md's "Contact is 80px / 96px". */
    sectionPaddingTopWide: 80,
    sectionPaddingBottomWide: 96,
    /** Section top/bottom padding at widths <= layoutBreakpoint.narrow (the general narrow override). */
    sectionPaddingVerticalNarrow: 56,
    /** Section horizontal padding at desktop widths. */
    sectionPaddingHorizontalWide: 40,
    /** Section horizontal padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingHorizontalNarrow: 24,
    /** Section horizontal padding at widths <= layoutBreakpoint.compact. */
    sectionPaddingHorizontalCompact: 18,
    /** Section container max-width, matches aboutSpace.containerMaxWidth. */
    containerMaxWidth: 1180,
    /** Two-column grid gap between the intro column and the form card, above layoutBreakpoint.narrow. */
    gridGap: 56,
    /** Grid gap at widths <= layoutBreakpoint.narrow, where the form stacks below the badges. */
    gridGapNarrow: 16,
    /** Vertical gap between the left column's heading/paragraph/badge list. */
    introColumnGap: 18,
    /** Left column's availability paragraph max-width (40ch equivalent, same ch->px ratio as heroSpace.introMaxWidth). */
    availabilityParagraphMaxWidth: 452,
    /** Badge list max-width and gap between the three stacked badges. */
    badgeListMaxWidth: 320,
    badgeListGap: 10,
    /** Contact badge internal padding. */
    badgePaddingVertical: 11,
    badgePaddingHorizontal: 16,
    /** Gap between a badge's inline SVG icon and its label. */
    badgeIconGap: 10,
    /** Contact badge inline SVG icon size (square). */
    badgeIconSize: 18,
    /** Form card padding and internal vertical gap between fields. */
    formCardPadding: 26,
    formCardGap: 16,
    /** Gap between a field's label and its input. */
    fieldGap: 7,
    /** Field input padding. */
    inputPaddingVertical: 11,
    inputPaddingHorizontal: 13,
    /** Message field textarea row count. */
    messageFieldRows: 5,
    /** Submit button padding. */
    submitButtonPaddingVertical: 12,
    submitButtonPaddingHorizontal: 22,
    /** Gap between the submit button and the inline status text below it. */
    statusMessageMarginTop: 10,
};

/**
 * Escape hatch for the sticky nav's measurements, same rationale as
 * heroSpace above: exact designs/README.md pixel values, named and commented
 * rather than snapped to the space.* grid.
 */
export const navSpace = {
    /** Inner row container max-width, matches heroSpace.containerMaxWidth. */
    containerMaxWidth: 1180,
    /** Row padding at desktop widths. */
    rowPaddingVertical: 14,
    rowPaddingHorizontal: 40,
    /** Row padding at widths <= layoutBreakpoint.narrow. */
    rowPaddingHorizontalNarrow: 20,
    /** Gap between the wordmark and the links group. */
    rowGap: 24,
    /** Gap between links at desktop widths. */
    linkGap: 26,
    /** Gap between links at widths <= layoutBreakpoint.narrow. */
    linkGapNarrow: 16,
    /** Gap between links at widths <= layoutBreakpoint.compact. */
    linkGapCompact: 12,
    /** Stack order above page content, matches the prototype's z-index: 50. */
    stackOrder: 50,
    /**
     * Hidden-state translateY. The prototype uses translateY(-100%), a
     * percentage of the nav's own height; RN transforms are absolute px, so
     * this approximates that height (row padding + line height) closely
     * enough to read as "slides fully offscreen."
     */
    hiddenTranslateY: -64,
};

/**
 * Escape hatch for the "Run this site as an app" (Demo) section measurements,
 * same rationale as contactSpace above: exact designs/joshhenry.info.dc.html
 * `#app` pixel values, named and commented rather than snapped to the
 * space.* grid.
 */
export const demoSpace = {
    /** Section top/bottom padding at desktop widths (standard 80px). */
    sectionPaddingVerticalWide: 80,
    /** Section top/bottom padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingVerticalNarrow: 56,
    /** Section horizontal padding at desktop widths. */
    sectionPaddingHorizontalWide: 40,
    /** Section horizontal padding at widths <= layoutBreakpoint.narrow. */
    sectionPaddingHorizontalNarrow: 24,
    /** Section horizontal padding at widths <= layoutBreakpoint.compact. */
    sectionPaddingHorizontalCompact: 18,
    /** Section container max-width, matches contactSpace.containerMaxWidth. */
    containerMaxWidth: 1180,
    /** Outer column gap between the intro row and the Snack card. */
    outerColumnGap: 36,
    /** Two-column intro row grid gap, above layoutBreakpoint.narrow. */
    introRowGap: 56,
    /** Left column's internal vertical gap (heading row / paragraph / steps). */
    introTextColumnGap: 20,
    /** Gap between the heading and the "iOS + ANDROID" tag in their baseline row. */
    headingRowGap: 16,
    /**
     * Approximates the intro paragraph's 56ch max-width (RN has no ch unit)
     * at heroSpace.introMaxWidth's ch->px ratio (520/46 ~= 11.3px/ch), same
     * conversion method aboutSpace.paragraphMaxWidth uses.
     */
    introParagraphMaxWidth: 632,
    /** Numbered steps list: top margin above it, gap between steps. */
    stepsListTopMargin: 4,
    stepsGap: 12,
    /** Gap between a step's mono number and its description text. */
    stepItemGap: 14,
    /** Pitch card ("I CAN DO THIS FOR YOU") padding and internal gap. */
    pitchCardPaddingVertical: 22,
    pitchCardPaddingHorizontal: 24,
    pitchCardGap: 12,
    /** Snack card chrome bar padding, matches heroSpace.terminalChromePaddingVertical/Horizontal. */
    chromeBarPaddingVertical: 13,
    chromeBarPaddingHorizontal: 18,
    /** "live editor" status dot diameter and its gap from the label text. */
    liveEditorDotSize: 6,
    liveEditorGap: 7,
    /** Snack iframe / placeholder fixed height. */
    embedHeight: 560,
    /** "NEEDS A WIDER WINDOW" fallback card padding and internal gap. */
    fallbackCardPadding: 26,
    fallbackCardGap: 14,
    /** External-link badge padding (Open the Snack / Open joshhenry.info), matches contactSpace.badgePaddingVertical/Horizontal. */
    externalLinkBadgePaddingVertical: 11,
    externalLinkBadgePaddingHorizontal: 16,
    externalLinkBadgeGap: 8,
    /** No-snack-url placeholder padding and internal gap. */
    placeholderPadding: 32,
    placeholderGap: 10,
    /**
     * Approximates the placeholder hint line's 34ch max-width, same
     * conversion method as introParagraphMaxWidth above.
     */
    placeholderHintMaxWidth: 384,
};

/**
 * Escape hatch for Footer section measurements, same rationale as
 * contactSpace above: exact designs/README.md / designs/joshhenry.info.dc.html
 * pixel values, named and commented rather than snapped to the space.* grid.
 */
export const footerSpace = {
    /**
     * Section vertical/horizontal padding, constant across all widths - the
     * prototype's <footer> isn't tagged data-r="sect", so unlike every other
     * section it does not get the narrow/compact horizontal-padding
     * reduction defined by [data-r="sect"]'s media query.
     */
    sectionPaddingVertical: 28,
    sectionPaddingHorizontal: 40,
    /** Inner row's container max-width, matches contactSpace.containerMaxWidth. */
    containerMaxWidth: 1180,
    /** Gap between the note and the links group when the row wraps/stacks at layoutBreakpoint.narrow. */
    rowGap: 24,
    /** Gap between the "Source" link and the copyright line. */
    linksGap: 22,
    /**
     * Note's 70ch max-width, approximated in px at heroSpace.introMaxWidth's
     * ch->px ratio (520/46 ~= 11.3px/ch), same conversion method
     * aboutSpace.paragraphMaxWidth uses.
     */
    noteMaxWidth: 791,
};
