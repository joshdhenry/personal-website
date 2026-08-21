/** Subpixel/rounding tolerance for "is scroll at the bottom of the page" checks. */
export const scrollBottomEpsilonPx = 2;

// A native animated scrollTo() lands on a device-pixel-rounded value, not the
// exact float a section's offset was measured at - without this, landing a
// fraction of a pixel short of a section's threshold leaves it unreached forever.
export const sectionThresholdEpsilonPx = 2;
