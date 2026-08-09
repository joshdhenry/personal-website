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
