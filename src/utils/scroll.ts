import type { ScrollView } from "react-native";

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

/**
 * The real current scroll offset of a ScrollView's underlying node, read
 * directly rather than through an onScroll event. Used once on mount to
 * sync scrollY.value to a starting position React never dispatched a scroll
 * event for (e.g. a bfcache-restored page already scrolled past the reveal
 * threshold). getScrollableNode() returns the DOM node itself on web
 * (react-native-web) but a native tag on iOS/Android, so this is web-only -
 * callers gate on Platform.OS themselves.
 */
export const readScrollableNodeScrollTop = (scrollView: ScrollView | null): number => {
    const scrollableNode = scrollView?.getScrollableNode() as HTMLElement | null;
    return scrollableNode?.scrollTop ?? 0;
};
