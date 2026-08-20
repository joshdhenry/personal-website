import { useCallback } from "react";

import type { SectionId, UseScrollToSectionParams } from "@/types/nav";

/**
 * Returns a stable scrollToSection(id) callback that scrolls the page's
 * ScrollView to a section's last-measured offset. Passed down to every
 * sticky nav link (StickyNav), so there is one anchor-scroll mechanism
 * rather than a one-off per caller. A section whose onLayout hasn't fired
 * yet has a null offset - skipped rather than scrolled to, so an early
 * click can't land at the top of the page instead of its intended target.
 *
 * StickyNav is a position: absolute overlay, not part of scroll flow, so a
 * raw section offset lands that section's top edge (and so its heading)
 * directly under the nav once it's revealed. navHeightEstimate is subtracted
 * so the target clears the nav instead.
 */
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
