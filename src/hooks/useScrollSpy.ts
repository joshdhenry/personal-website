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
        furthestSectionId: SectionId;
        sectionId: SectionId;
        startSectionId: SectionId;
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
            const startSectionId = currentSectionId;
            const timeoutId = setTimeout(() => {
                const pendingTarget = pendingTargetRef.current;
                pendingTargetRef.current = null;
                if (pendingTarget === null) {
                    return;
                }

                // furthestSectionId only ever moves via a genuine section
                // crossing in updateFromScroll (offsets are hundreds of px
                // apart), so it's immune to a stray/rubber-band onScroll that
                // never actually carried the page anywhere. If it's still
                // sitting at the click's starting section, nothing scrolled -
                // keep the clicked target instead of reverting to where the
                // user was before the click.
                setCurrentSectionId(
                    pendingTarget.furthestSectionId === pendingTarget.startSectionId
                        ? pendingTarget.sectionId
                        : pendingTarget.furthestSectionId,
                );
            }, pendingTargetTimeoutMs);

            clearPendingTarget();
            pendingTargetRef.current = {
                direction,
                furthestSectionId: startSectionId,
                sectionId,
                startSectionId,
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
