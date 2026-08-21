import { useCallback } from "react";

import type { SectionId, UseScrollToSectionParams } from "@/types/nav";

// Stable scrollToSection(id) callback, shared by every nav link. Skips a
// section whose offset hasn't measured yet rather than landing at the top,
// and subtracts navHeightEstimate so the target clears the overlaid nav.
export const useScrollToSection = ({
    navHeightEstimate,
    scrollViewRef,
    sectionOffsets,
}: UseScrollToSectionParams) =>
    useCallback(
        (sectionId: SectionId) => {
            const offset = sectionOffsets.current[sectionId];

            if (offset === null) {
                return;
            }

            scrollViewRef.current?.scrollTo({
                animated: true,
                y: Math.max(0, offset - navHeightEstimate),
            });
        },
        [navHeightEstimate, scrollViewRef, sectionOffsets],
    );
