/**
 * Whether a hover/press shadow is safe to render. Android clips a View's
 * children to its rounded-corner outline once `elevation` is applied,
 * clipping a badge/card's own content - so the decorative shadow is web-only.
 * @param platformOS - Platform.OS, passed in so this stays testable.
 * @returns True on web, false on native.
 */
export const isHoverShadowSupported = (platformOS: string): boolean => platformOS === "web";
