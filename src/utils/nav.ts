import { colors } from "@/theme/colors";
import { navSpace } from "@/theme/spacing";
import type { WebOnlyStyle } from "@/types/theme";

/**
 * The sticky nav's translucent background style. position: fixed has no RN
 * equivalent, so the blur is web-only; native gets the same tint without it.
 * @param platformOS - Platform.OS, passed in so this stays testable.
 * @returns A style object for StickyNav's outer Animated.View.
 */
export const getNavBackground = (platformOS: string): WebOnlyStyle => {
    if (platformOS !== "web") {
        return { backgroundColor: colors.bgTranslucent };
    }

    return {
        backdropFilter: `blur(${navSpace.backdropBlurRadius}px)`,
        backgroundColor: colors.bgTranslucent,
    };
};
