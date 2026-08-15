import { useCallback } from "react";

import type { SectionId, UseScrollToSectionParams } from "@/types/nav";

/**
 * Returns a stable scrollToSection(id) callback that scrolls the page's
 * ScrollView to a section's last-measured offset. Shared by every sticky nav
 * link and the Demo section's "Talk to me about your app" CTA, so there is
 * one anchor-scroll mechanism rather than a one-off per caller.
 */
export const useScrollToSection = ({ scrollViewRef, sectionOffsets }: UseScrollToSectionParams) =>
    useCallback(
        (sectionId: SectionId) => {
            scrollViewRef.current?.scrollTo({
                animated: true,
                y: sectionOffsets.current[sectionId],
            });
        },
        [scrollViewRef, sectionOffsets],
    );
