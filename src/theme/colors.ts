/**
 * Named color tokens. Values and use-cases per designs/README.md's "Design
 * tokens" table and CLAUDE.md's color spec (the authoritative sources for
 * this site's palette). Components must reference these by name, never a
 * raw hex/rgba literal.
 */
export const colors = {
    bg: "#F5F6F8",
    surface: "#FFFFFF",
    border: "#E2E5EA",
    ink: "#14181F",
    inkMuted: "#5B6472",
    inkMutedLight: "#98A1B0",
    // Body copy inside Projects cards (PROBLEM/WHAT I BUILT/STACK/OUTCOME
    // paragraphs, compact card paragraph) - darker than inkMuted so long-form
    // reading text stays comfortable, per designs/README.md's "ink-secondary".
    inkSecondary: "#3A424F",
    primary: "#4338CA",
    // Reserved for hover/press states on primary-colored elements in later
    // sections; the hero's own press feedback uses motion (scale/lift), not
    // a color swap, so this isn't consumed yet.
    primaryHover: "#3730A3",
    statusPassing: "#16A34A",
    // Reserved for in-progress/highlight status chips in later sections
    // (Projects, Experience); the hero has no "in progress" state.
    statusAttention: "#F59E0B",
    focusRing: "#4338CA",
    trafficLightRed: "#FF5F57",
    trafficLightYellow: "#FEBC2E",
    trafficLightGreen: "#28C840",
    openToWorkBackground: "rgba(22, 163, 74, 0.06)",
    openToWorkBorder: "rgba(22, 163, 74, 0.28)",
    // Experience row mono note text - lightest tint in the ink scale, per
    // designs/README.md's Experience row spec.
    inkFaint: "#B6BDC7",
    // LinkedIn brand mark fill, Contact section badge icon only.
    brandLinkedIn: "#0A66C2",
    // Contact form submit error inline status text. 5.98:1 contrast on
    // colors.bg, comfortably AA for the mono status line's small size.
    statusError: "#B91C1C",
    // Sticky nav's translucent background over page content, per
    // designs/README.md's "Sticky nav" spec.
    navBackground: "rgba(245, 246, 248, 0.86)",
};
