/**
 * The page's two scroll-driven effects (designs/README.md's "Scroll-driven
 * effects"): the sticky nav's reveal threshold and the hero terminal card's
 * parallax drift. Both are pure functions of the shared scrollY value, so
 * both are worklets, callable directly from a UI-thread animation.
 */

/**
 * Whether the sticky nav should be visible at the given scroll position.
 * Marked as a worklet so StickyNav's useAnimatedReaction can call it
 * directly on the UI thread.
 */
export const shouldRevealNav = (scrollY: number, navRevealScrollY: number): boolean => {
    "worklet";

    return scrollY > navRevealScrollY;
};

/**
 * Hero terminal card scroll parallax: translateY = clamp((scrollY -
 * scrollOffset) * multiplier, -maxOffset, maxOffset). Marked as a worklet so
 * TerminalCard's useAnimatedStyle can call it directly on the UI thread.
 */
export const clampParallaxOffset = (
    scrollY: number,
    scrollOffset: number,
    multiplier: number,
    maxOffset: number,
): number => {
    "worklet";

    const rawOffset = (scrollY - scrollOffset) * multiplier;

    return Math.min(maxOffset, Math.max(-maxOffset, rawOffset));
};
