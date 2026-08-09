import { Platform } from "react-native";

/**
 * React Native's shadow* style props express a single shadow, not CSS's
 * comma-separated multi-layer syntax used by designs/README.md's shadow
 * tokens. On web, pass the exact CSS boxShadow string through (react-native-
 * web resolves the `boxShadow` style property to real CSS); on native,
 * approximate with a single RN shadow tuned to read the same.
 */
export const shadow = {
    terminalCard: Platform.select({
        web: {
            boxShadow: "0 1px 2px rgba(20,24,31,.04), 0 18px 44px -18px rgba(20,24,31,.16)",
        },
        default: {
            shadowColor: "#14181F",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.16,
            shadowRadius: 22,
            elevation: 6,
        },
    }),
    badgeHover: Platform.select({
        web: {
            boxShadow: "0 8px 20px -12px rgba(20,24,31,.35)",
        },
        default: {
            shadowColor: "#14181F",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 10,
            elevation: 4,
        },
    }),
    projectCard: Platform.select({
        web: {
            boxShadow: "0 1px 2px rgba(20,24,31,.04), 0 16px 34px -16px rgba(20,24,31,.24)",
        },
        default: {
            shadowColor: "#14181F",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.24,
            shadowRadius: 17,
            elevation: 5,
        },
    }),
    // Same values as projectCard; named separately for Experience's own
    // "timeline rows lift 4px and gain the card shadow" hover spec.
    experienceRow: Platform.select({
        web: {
            boxShadow: "0 1px 2px rgba(20,24,31,.04), 0 16px 34px -16px rgba(20,24,31,.24)",
        },
        default: {
            shadowColor: "#14181F",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.24,
            shadowRadius: 17,
            elevation: 5,
        },
    }),
};
