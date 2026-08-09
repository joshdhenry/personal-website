import { layoutBreakpoint } from "@/theme/breakpoints";
import type { HeroLayoutMode } from "@/types/hero";

/**
 * Pulled out of Hero.tsx so the width -> layout-mode derivation is testable
 * without rendering the full section (which would drag in Reanimated,
 * useWindowDimensions, and every subcomponent just to check two booleans).
 */
export const resolveHeroLayoutMode = (width: number): HeroLayoutMode => ({
    isCompact: width <= layoutBreakpoint.compact,
    isNarrow: width <= layoutBreakpoint.narrow,
});
