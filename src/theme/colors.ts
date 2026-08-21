// Named color tokens, per designs/README.md's "Design tokens" table.
// Components reference these by name, never a raw hex/rgba literal.
export const colors = {
    bg: "#F5F6F8",
    surface: "#FFFFFF",
    border: "#E2E5EA",
    ink: "#14181F",
    inkMuted: "#5B6472",
    inkMutedLight: "#98A1B0",
    // Darker than inkMuted, for long-form reading text (Projects card body copy).
    inkSecondary: "#3A424F",
    primary: "#4338CA",
    primaryHover: "#3730A3",
    statusPassing: "#16A34A",
    // Reserved for in-progress/highlight status chips; unused so far.
    statusAttention: "#F59E0B",
    focusRing: "#4338CA",
    trafficLightRed: "#FF5F57",
    trafficLightYellow: "#FEBC2E",
    trafficLightGreen: "#28C840",
    // Low-alpha tints of statusPassing, for a pill's background/border.
    statusPassingBackground: "rgba(22, 163, 74, 0.06)",
    statusPassingBorder: "rgba(22, 163, 74, 0.28)",
    // Lightest tint in the ink scale (Experience row note text).
    inkFaint: "#B6BDC7",
    // LinkedIn's own brand blue (Contact badge icon only).
    brandLinkedIn: "#0A66C2",
    // 5.98:1 contrast on bg - AA for the mono status line's small size.
    statusError: "#B91C1C",
    // bg at reduced opacity, for a translucent overlay over page content.
    bgTranslucent: "rgba(245, 246, 248, 0.86)",
};
