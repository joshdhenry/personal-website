import type { MutableRefObject } from "react";
import type { ScrollView, TextStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

export type SectionId = "top" | "projects" | "skills" | "experience" | "about" | "contact";

/**
 * A section's last-measured scroll offset, or null until its onLayout has
 * fired at least once. useScrollToSection skips scrolling to a null offset
 * rather than falling back to 0 (the top of the page) for a section that
 * simply hasn't measured yet.
 */
export type SectionOffsets = Record<SectionId, number | null>;

export type NavLinkDescriptor = {
    id: string;
    label: string;
    sectionId: SectionId;
};

export type NavLinkProps = {
    accessibilityLabel: string;
    defaultColor: string;
    label: string;
    labelStyle: TextStyle;
    onLinkPress: (sectionId: SectionId) => void;
    sectionId: SectionId;
};

export type StickyNavProps = {
    onHeightChange: (height: number) => void;
    onLinkPress: (sectionId: SectionId) => void;
    scrollY: SharedValue<number>;
};

export type UseScrollToSectionParams = {
    navHeightRef: MutableRefObject<number>;
    scrollViewRef: MutableRefObject<ScrollView | null>;
    sectionOffsets: MutableRefObject<SectionOffsets>;
};
