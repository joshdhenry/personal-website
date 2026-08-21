// Subpixel/rounding tolerance for scroll-offset comparisons: a native
// animated scrollTo() lands on a device-pixel-rounded value, not the exact
// float a target (bottom-of-page, a section's offset) was measured at.
export const scrollEpsilonPx = 2;
