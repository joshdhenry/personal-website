import { useCallback, useEffect, useRef, useState } from "react";

import type { SectionId, UseScrollSpyParams } from "@/types/nav";
import { hasSectionOrderReachedTarget, resolveCurrentSectionId } from "@/utils/scroll";

// Upper bound on how long a click's pending target is trusted to resolve on
// its own before the safety-net timeout clears it.
const pendingTargetTimeoutMs = 1500;

/**
 * Sticky nav's "current section" scroll-spy. A click sets the section
 * immediately (onLinkPress) rather than waiting on scroll to catch up;
 * pendingTargetRef holds that choice until scroll position actually
 * reaches it, so the imprecise onScroll stream mid-animation can't undo it.
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
        startSectionId: SectionId;
        timeoutId: ReturnType<typeof setTimeout>;
    } | null>(null);
    // Latest onScroll data, so the safety-net timeout below can resolve a
    // real section instead of just abandoning a stuck pending target.
    const latestScrollRef = useRef({ isAtBottom: false, scrollOffset: 0 });

    const clearPendingTarget = useCallback(() => {
        if (pendingTargetRef.current !== null) {
            clearTimeout(pendingTargetRef.current.timeoutId);
        }
        pendingTargetRef.current = null;
    }, []);

    useEffect(() => clearPendingTarget, [clearPendingTarget]);

    const updateFromScroll = useCallback(
        (scrollOffset: number, isAtBottom: boolean) => {
            latestScrollRef.current = { isAtBottom, scrollOffset };
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
                // react-native-web's ScrollView never invokes onScrollBeginDrag
                // (not a real DOM event), so this is web's only signal that the
                // user has taken over manually: scroll position has moved back
                // past where the click started, opposite the animation's own
                // direction of travel.
                const hasReversedPastStart = !hasSectionOrderReachedTarget(
                    nextSectionId,
                    pendingTarget.startSectionId,
                    pendingTarget.direction,
                );
                if (!hasReachedTarget && !hasReversedPastStart) {
                    return;
                }
                clearPendingTarget();
            }

            setCurrentSectionId(nextSectionId);
        },
        [clearPendingTarget, navHeightEstimate, sectionOffsets],
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

            clearPendingTarget();
            pendingTargetRef.current = {
                direction,
                sectionId,
                startSectionId: currentSectionId,
                timeoutId: setTimeout(() => {
                    pendingTargetRef.current = null;
                    const { isAtBottom, scrollOffset } = latestScrollRef.current;
                    setCurrentSectionId(
                        resolveCurrentSectionId(
                            scrollOffset,
                            sectionOffsets.current,
                            navHeightEstimate,
                            isAtBottom,
                        ),
                    );
                }, pendingTargetTimeoutMs),
            };
            setCurrentSectionId(sectionId);
            scrollToSection(sectionId);
        },
        [
            clearPendingTarget,
            currentSectionId,
            navHeightEstimate,
            scrollToSection,
            scrollY,
            sectionOffsets,
        ],
    );

    return {
        currentSectionId,
        onLinkPress,
        onScrollBeginDrag: clearPendingTarget,
        updateFromScroll,
    };
};
