/**
 * The breakpoints actually used by every section's responsive layout logic,
 * per designs/README.md's "Responsive" spec (900px and 560px, consistently,
 * across every section). Read once via useWindowDimensions() and threaded
 * through as isNarrow/isCompact booleans, not media queries.
 */
export const layoutBreakpoint = {
    narrow: 900,
    compact: 560,
};
