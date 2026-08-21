import { layoutBreakpoint } from "@/theme/breakpoints";
import type { ResponsiveLayoutMode } from "@/types/theme";

/**
 * Single width -> layout-mode derivation shared by every section (Hero,
 * Projects, ...) so each isNarrow/isCompact boundary is defined once and
 * stays testable without rendering a full section.
 */
export const resolveResponsiveLayoutMode = (width: number): ResponsiveLayoutMode => ({
    isCompact: width <= layoutBreakpoint.compact,
    isNarrow: width <= layoutBreakpoint.narrow,
});

/**
 * Picks one of three values by layout mode, for the (rarer) components with
 * a distinct compact/narrow/wide tier rather than just narrow/wide.
 * @param layoutMode - isCompact/isNarrow, from resolveResponsiveLayoutMode.
 * @param compact - Value at or below breakpoint.compact.
 * @param narrow - Value at or below breakpoint.narrow, above breakpoint.compact.
 * @param wide - Value above breakpoint.narrow.
 * @returns Whichever of the three values matches the current layout mode.
 */
export const resolveByLayoutMode = <Value>(
    layoutMode: ResponsiveLayoutMode,
    compact: Value,
    narrow: Value,
    wide: Value,
): Value => {
    if (layoutMode.isCompact) {
        return compact;
    }

    return layoutMode.isNarrow ? narrow : wide;
};
