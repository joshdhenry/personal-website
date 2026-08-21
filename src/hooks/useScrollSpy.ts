import { useCallback, useEffect, useRef, useState } from "react";

import { pendingTargetTimeoutMs } from "@/constants/nav";
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
                // scroll moved back past where the click started.
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
        [clearPendingTarget, navHeight, sectionOffsets],
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
            const timeoutId = setTimeout(() => {
                pendingTargetRef.current = null;
                const { isAtBottom, scrollOffset } = latestScrollRef.current;
                setCurrentSectionId(
                    resolveCurrentSectionId(
                        scrollOffset,
                        sectionOffsets.current,
                        navHeight,
                        isAtBottom,
                    ),
                );
            }, pendingTargetTimeoutMs);

            clearPendingTarget();
            pendingTargetRef.current = {
                direction,
                sectionId,
                startSectionId: currentSectionId,
                timeoutId,
            };
            setCurrentSectionId(sectionId);
            scrollToSection(sectionId);
        },
        [clearPendingTarget, currentSectionId, navHeight, scrollToSection, scrollY, sectionOffsets],
    );

    return {
        currentSectionId,
        onLinkPress,
        onScrollBeginDrag: clearPendingTarget,
        updateFromScroll,
    };
};
