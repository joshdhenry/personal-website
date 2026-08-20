import { colors } from "@/theme/colors";
import { focusRingSpace } from "@/theme/spacing";

/**
 * The visible keyboard focus ring shown on web, shared by every interactive
 * badge and link in this app. react-native-web-only style props, so this is
 * a plain style object rather than a StyleSheet.create() entry.
 */
export const focusRing = {
    outlineColor: colors.focusRing,
    outlineOffset: focusRingSpace.outlineOffset,
    outlineStyle: "solid",
    outlineWidth: focusRingSpace.outlineWidth,
} as Record<string, unknown>;
