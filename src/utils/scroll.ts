import type { ScrollView } from "react-native";

import type { SectionId, SectionOffsets } from "@/types/nav";

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

/**
 * Subpixel/rounding tolerance for "has scrolling reached the bottom of the
 * page" checks - shared by isScrolledToBottom below and index.tsx's own
 * onScroll-event equivalent, so both agree on the same threshold.
 */
export const scrollBottomEpsilonPx = 2;

/**
 * Whether a ScrollView's underlying node is scrolled (within
 * scrollBottomEpsilonPx) to its maximum extent. Web-only (DOM read), like
 * readScrollableNodeScrollTop above - callers gate on Platform.OS
 * themselves. Used for the same "at the bottom" check resolveCurrentSectionId
 * needs, in the one place (the mount-sync effect) that isn't already
 * handling a real onScroll event with contentSize/layoutMeasurement
 * available on it.
 */
export const isScrolledToBottom = (scrollView: ScrollView | null): boolean => {
    const scrollableNode = scrollView?.getScrollableNode() as HTMLElement | null;
    if (!scrollableNode) {
        return false;
    }

    return (
        scrollableNode.scrollTop + scrollableNode.clientHeight >=
        scrollableNode.scrollHeight - scrollBottomEpsilonPx
    );
};

// Top-to-bottom page order - the section furthest down this list whose
// offset has been reached wins, so this must match the order sections
// actually render in (src/app/index.tsx), never alphabetized.
const sectionOrder: readonly SectionId[] = [
    "top",
    "projects",
    "skills",
    "experience",
    "about",
    "contact",
];

/**
 * Which section is currently in view, for the sticky nav's "current
 * section" highlight. A section counts as "reached" once scrolling has
 * carried its heading up to (or past) where it clears the nav - the same
 * navHeightEstimate useScrollToSection uses to land a target below the nav,
 * reused here so "the nav says you're in Skills" and "clicking Skills lands
 * you here" agree on the same boundary. Sections without a measured offset
 * yet (onLayout hasn't fired) are skipped rather than treated as reached.
 *
 * isAtBottom forces the last measured section to win regardless of that
 * math: the last section (Contact) can have less remaining page height
 * below its own top than the viewport is tall (its own content plus the
 * footer might not fill a screen), so scrollY + navHeightEstimate can never
 * reach its offset even at the very bottom of the page - without this,
 * the nav would get stuck highlighting the second-to-last section forever
 * once there's nowhere further to scroll.
 */
export const resolveCurrentSectionId = (
    scrollY: number,
    sectionOffsets: SectionOffsets,
    navHeightEstimate: number,
    isAtBottom: boolean,
): SectionId => {
    if (isAtBottom) {
        for (let index = sectionOrder.length - 1; index >= 0; index -= 1) {
            const sectionId = sectionOrder[index];
            if (sectionOffsets[sectionId] !== null) {
                return sectionId;
            }
        }
    }

    let currentSectionId: SectionId = "top";

    for (const sectionId of sectionOrder) {
        const offset = sectionOffsets[sectionId];
        if (offset !== null && scrollY + navHeightEstimate >= offset) {
            currentSectionId = sectionId;
        }
    }

    return currentSectionId;
};
