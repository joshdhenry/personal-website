import { useCallback, useEffect, useRef, useState } from "react";

import type { SectionId, UseScrollSpyParams } from "@/types/nav";
import { hasSectionOrderReachedTarget, resolveCurrentSectionId } from "@/utils/scroll";

// Safety-net upper bound on how long a click-triggered scroll's pending
// target (see pendingTargetRef below) is trusted to eventually resolve on
// its own. Comfortably longer than any real scroll animation on any
// platform/distance, so it only ever fires for the edge case the position-
// based clearing can't handle on its own.
const pendingTargetTimeoutMs = 1500;

/**
 * The sticky nav's "current section" scroll-spy: tracks which section is in
 * view (updateFromScroll, fed by index.tsx's onScroll and its mount-sync
 * effect) while also handling the optimistic, click-driven case
 * (handleLinkPress) - a click already tells us exactly which section the
 * user means, so it sets that immediately rather than waiting on scroll
 * position to catch up.
 *
 * pendingTargetRef records that immediate choice, alongside the scroll
 * direction needed to reach it and a safety-net timeout, and updateFromScroll
 * defers to it until scrolling has actually caught up (via
 * hasSectionOrderReachedTarget) - otherwise the animated scrollTo() a click
 * starts fires a stream of imprecise intermediate onScroll events that would
 * repeatedly resolve to whatever section is currently passing by, undoing
 * the click's own selection. handleScrollBeginDrag clears it as soon as a
 * real touch/drag gesture starts, the most direct signal that the user has
 * taken over from the click.
 */
export const useScrollSpy = ({
    navHeightEstimate,
    scrollToSection,
    scrollY,
    sectionOffsets,
}: UseScrollSpyParams) => {
    const [currentSectionId, setCurrentSectionId] = useState<SectionId>("top");
    const pendingTargetRef = useRef<{
        direction: 1 | -1;
        sectionId: SectionId;
        timeoutId: ReturnType<typeof setTimeout>;
    } | null>(null);

    const clearPendingTarget = useCallback(() => {
        if (pendingTargetRef.current !== null) {
            clearTimeout(pendingTargetRef.current.timeoutId);
        }
        pendingTargetRef.current = null;
    }, []);

    useEffect(() => clearPendingTarget, [clearPendingTarget]);

    const updateFromScroll = useCallback(
        (scrollOffset: number, isAtBottom: boolean) => {
            const nextSectionId = resolveCurrentSectionId(
                scrollOffset,
                sectionOffsets.current,
                navHeightEstimate,
                isAtBottom,
            );

            const pendingTarget = pendingTargetRef.current;
            if (pendingTarget !== null) {
                const hasReachedTarget = hasSectionOrderReachedTarget(
                    nextSectionId,
                    pendingTarget.sectionId,
                    pendingTarget.direction,
                );
                if (!hasReachedTarget) {
                    return;
                }
                clearPendingTarget();
            }

            setCurrentSectionId(nextSectionId);
        },
        [clearPendingTarget, navHeightEstimate, sectionOffsets],
    );

    const handleLinkPress = useCallback(
        (sectionId: SectionId) => {
            const targetOffset = sectionOffsets.current[sectionId];
            const direction: 1 | -1 =
                targetOffset !== null && targetOffset < scrollY.value ? -1 : 1;

            clearPendingTarget();
            pendingTargetRef.current = {
                direction,
                sectionId,
                timeoutId: setTimeout(() => {
                    pendingTargetRef.current = null;
                }, pendingTargetTimeoutMs),
            };
            setCurrentSectionId(sectionId);
            scrollToSection(sectionId);
        },
        [clearPendingTarget, scrollToSection, scrollY, sectionOffsets],
    );

    return {
        currentSectionId,
        handleLinkPress,
        handleScrollBeginDrag: clearPendingTarget,
        updateFromScroll,
    };
};
