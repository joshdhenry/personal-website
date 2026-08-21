import type { ScrollView } from "react-native";

import { scrollEpsilonPx } from "@/constants/scroll";
import { navLinks } from "@/data/nav";
import type { SectionId, SectionOffsets } from "@/types/nav";

/**
 * Whether the sticky nav should be visible at the given scroll position.
 * Worklet so StickyNav's useAnimatedReaction can call it on the UI thread.
 * @param scrollY - Current vertical scroll offset in px.
 * @param navRevealScrollY - Threshold past which the nav reveals.
 * @returns True once scrollY has passed the reveal threshold.
 */
export const shouldRevealNav = (scrollY: number, navRevealScrollY: number): boolean => {
    "worklet";

    return scrollY > navRevealScrollY;
};

/**
 * Whether scroll has reached the maximum extent of its container.
 * @param currentOffset - Current scroll offset in px.
 * @param viewportSize - Height of the visible scrolling viewport in px.
 * @param contentSize - Total scrollable content height in px.
 * @returns True once currentOffset + viewportSize reaches contentSize.
 */
export const isAtScrollBottom = (
    currentOffset: number,
    viewportSize: number,
    contentSize: number,
): boolean => currentOffset + viewportSize >= contentSize - scrollEpsilonPx;

/**
 * Reads a ScrollView's real current scroll position directly from its DOM
 * node, for syncing state to a starting position no onScroll event fired
 * for (e.g. a bfcache-restored page). Web-only - callers gate on Platform.OS.
 * @param scrollView - The ScrollView ref to read, or null if not attached yet.
 * @returns The current scrollTop and whether it's at the max scroll extent.
 */
export const readInitialScrollState = (
    scrollView: ScrollView | null,
): { isAtBottom: boolean; scrollTop: number } => {
    const scrollableNode = scrollView?.getScrollableNode() as HTMLElement | null;
    if (!scrollableNode) {
        return { isAtBottom: false, scrollTop: 0 };
    }

    const isAtBottom = isAtScrollBottom(
        scrollableNode.scrollTop,
        scrollableNode.clientHeight,
        scrollableNode.scrollHeight,
    );

    return { isAtBottom, scrollTop: scrollableNode.scrollTop };
};

// Top-to-bottom page order, derived from navLinks (pinned by data/nav.test.ts)
// so the two can't drift apart.
const sectionOrder: readonly SectionId[] = ["top", ...navLinks.map((navLink) => navLink.sectionId)];

/**
 * Whether scrolling has carried a click's target section into view, for the
 * sticky nav's pending-target guard against an animated scrollTo()'s
 * imprecise intermediate onScroll events.
 * @param candidateSectionId - The section scroll position currently resolves to.
 * @param targetSectionId - The section a click is waiting to arrive at.
 * @param direction - 1 if scrolling down to reach the target, -1 if scrolling up.
 * @returns True once candidateSectionId has reached or passed targetSectionId.
 */
export const hasSectionOrderReachedTarget = (
    candidateSectionId: SectionId,
    targetSectionId: SectionId,
    direction: 1 | -1,
): boolean => {
    const candidateIndex = sectionOrder.indexOf(candidateSectionId);
    const targetIndex = sectionOrder.indexOf(targetSectionId);

    return direction === 1 ? candidateIndex >= targetIndex : candidateIndex <= targetIndex;
};

/**
 * Which section is currently in view, for the sticky nav's highlight.
 * isAtBottom forces the last measured section to win short of the normal
 * check (scrollY > 0 guards an unscrolled page from pre-highlighting).
 * @param scrollY - Current vertical scroll offset in px.
 * @param sectionOffsets - Each section's last-measured top offset, or null if unmeasured.
 * @param navHeight - Nav height to clear before a section counts as reached.
 * @param isAtBottom - Whether scroll is at the page's maximum extent.
 * @returns The section id the nav should currently highlight.
 */
export const resolveCurrentSectionId = (
    scrollY: number,
    sectionOffsets: SectionOffsets,
    navHeight: number,
    isAtBottom: boolean,
): SectionId => {
    if (isAtBottom && scrollY > 0) {
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
        if (offset !== null && scrollY + navHeight >= offset - scrollEpsilonPx) {
            currentSectionId = sectionId;
        }
    }

    return currentSectionId;
};
