import { useCallback } from "react";

import type { SectionId, UseScrollToSectionParams } from "@/types/nav";

/**
 * Returns a stable scrollToSection(id) callback that scrolls the page's
 * ScrollView to a section's last-measured offset. Shared by every sticky nav
 * link and the Demo section's "Talk to me about your app" CTA, so there is
 * one anchor-scroll mechanism rather than a one-off per caller. A section
 * whose onLayout hasn't fired yet has a null offset - skipped rather than
 * scrolled to, so an early click can't land at the top of the page instead
 * of its intended target.
 */
export const useScrollToSection = ({ scrollViewRef, sectionOffsets }: UseScrollToSectionParams) =>
    useCallback(
        (sectionId: SectionId) => {
            const offset = sectionOffsets.current[sectionId];

            if (offset === null) {
                return;
            }

            scrollViewRef.current?.scrollTo({ animated: true, y: offset });
        },
        [scrollViewRef, sectionOffsets],
    );
