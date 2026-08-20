/**
 * The page's scroll-driven effects (designs/README.md's "Scroll-driven
 * effects"), starting with the sticky nav's reveal threshold. Pure functions
 * of the shared scrollY value, so they're worklets, callable directly from a
 * UI-thread animation.
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
