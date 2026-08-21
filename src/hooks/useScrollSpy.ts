import { useCallback, useEffect, useRef, useState } from "react";

import { pendingTargetTimeoutMs } from "@/constants/nav";
import { scrollEpsilonPx } from "@/constants/scroll";
import type { SectionId, UseScrollSpyParams } from "@/types/nav";
import { hasSectionOrderReachedTarget, resolveCurrentSectionId } from "@/utils/scroll";

// Sticky nav's "current section" scroll-spy. A click sets the section
// immediately (onLinkPress); pendingTargetRef holds that choice until
// scroll actually reaches it, so mid-animation onScroll noise can't undo it.
export const useScrollSpy = ({
    navHeight,
    scrollToSection,
    scrollY,
    sectionOffsets,
}: UseScrollSpyParams) => {
    const [currentSectionId, setCurrentSectionId] = useState<SectionId>("top");
    const pendingTargetRef = useRef<{
        direction: 1 | -1;
        furthestSectionId: SectionId;
        sectionId: SectionId;
        timeoutId: ReturnType<typeof setTimeout>;
    } | null>(null);
    // Latest onScroll data, so the safety-net timeout below can resolve a
    // real section instead of just abandoning a stuck pending target.
    const latestScrollRef = useRef({ isAtBottom: false, scrollOffset: 0 });
    // navHeight can change (a resize, StickyNav re-measuring) while a
    // pending-target timeout is already scheduled; read the latest value at
    // fire time instead of the one closed over when it was scheduled.
    const navHeightRef = useRef(navHeight);
    navHeightRef.current = navHeight;

    const clearPendingTarget = useCallback(() => {
        if (pendingTargetRef.current !== null) {
            clearTimeout(pendingTargetRef.current.timeoutId);
        }
        pendingTargetRef.current = null;
    }, []);

    useEffect(() => clearPendingTarget, [clearPendingTarget]);

    const updateFromScroll = useCallback(
        (scrollOffset: number, isAtBottom: boolean) => {
            // Single writer for scrollY, so it can never desync from
            // latestScrollRef below - every sync path (onScroll, bfcache
            // restore, layout resync) reads the same real position here.
            scrollY.value = scrollOffset;
            latestScrollRef.current = { isAtBottom, scrollOffset };
            const nextSectionId = resolveCurrentSectionId(
                scrollOffset,
                sectionOffsets.current,
                navHeight,
                isAtBottom,
            );

            const pendingTarget = pendingTargetRef.current;
            if (pendingTarget !== null) {
                const hasReachedTarget = hasSectionOrderReachedTarget(
                    nextSectionId,
                    pendingTarget.sectionId,
                    pendingTarget.direction,
                );
                // react-native-web never fires onScrollBeginDrag (not a real
                // DOM event) - this is web's only "user took over" signal:
                // scroll fell back behind the furthest point reached so far.
                const hasReversedPastFurthest = !hasSectionOrderReachedTarget(
                    nextSectionId,
                    pendingTarget.furthestSectionId,
                    pendingTarget.direction,
                );
                if (!hasReachedTarget && !hasReversedPastFurthest) {
                    pendingTarget.furthestSectionId = nextSectionId;
                    return;
                }
                clearPendingTarget();
            }

            setCurrentSectionId(nextSectionId);
        },
        [clearPendingTarget, navHeight, scrollY, sectionOffsets],
    );

    const onLinkPress = useCallback(
        (sectionId: SectionId) => {
            const targetOffset = sectionOffsets.current[sectionId];
            // Matches scrollToSection's own no-op for an unmeasured offset,
            // so the nav doesn't relabel to a section the page never reached.
            if (targetOffset === null) {
                return;
            }

            const direction: 1 | -1 = targetOffset < scrollY.value ? -1 : 1;
            const scrollOffsetAtClick = scrollY.value;
            const timeoutId = setTimeout(() => {
                pendingTargetRef.current = null;
                const { isAtBottom, scrollOffset } = latestScrollRef.current;
                // Epsilon-tolerant: a stray/rubber-band onScroll can differ from
                // the click-time offset by a subpixel amount with no real movement.
                // Any larger movement resolves from where scroll actually stalled,
                // not the clicked target - an honest highlight over an optimistic one.
                const hasScrolledSinceClick =
                    Math.abs(scrollOffset - scrollOffsetAtClick) > scrollEpsilonPx;
                setCurrentSectionId(
                    hasScrolledSinceClick
                        ? resolveCurrentSectionId(
                              scrollOffset,
                              sectionOffsets.current,
                              navHeightRef.current,
                              isAtBottom,
                          )
                        : sectionId,
                );
            }, pendingTargetTimeoutMs);

            clearPendingTarget();
            pendingTargetRef.current = {
                direction,
                furthestSectionId: currentSectionId,
                sectionId,
                timeoutId,
            };
            setCurrentSectionId(sectionId);
            scrollToSection(sectionId);
        },
        [clearPendingTarget, currentSectionId, scrollToSection, scrollY, sectionOffsets],
    );

    return {
        currentSectionId,
        onLinkPress,
        onScrollBeginDrag: clearPendingTarget,
        updateFromScroll,
    };
};
