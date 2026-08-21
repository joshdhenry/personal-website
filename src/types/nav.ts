import type { MutableRefObject } from "react";
import type { ScrollView, TextStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

export type SectionId = "top" | "projects" | "skills" | "experience" | "about" | "contact";

// A section's last-measured scroll offset, or null until its onLayout has
// fired - useScrollToSection skips a null offset rather than falling back to 0.
export type SectionOffsets = Record<SectionId, number | null>;

export type NavLinkDescriptor = {
    label: string;
    sectionId: SectionId;
};

export type NavLinkProps = {
    accessibilityLabel: string;
    defaultColor: string;
    isSelected: boolean;
    label: string;
    labelStyle: TextStyle;
    onLinkPress: (sectionId: SectionId) => void;
    sectionId: SectionId;
};

export type StickyNavProps = {
    currentSectionId: SectionId;
    onHeightChange: (height: number) => void;
    onLinkPress: (sectionId: SectionId) => void;
    scrollY: SharedValue<number>;
};

export type UseScrollToSectionParams = {
    navHeight: number;
    scrollViewRef: MutableRefObject<ScrollView | null>;
    sectionOffsets: MutableRefObject<SectionOffsets>;
};

export type UseScrollSpyParams = {
    navHeight: number;
    scrollToSection: (sectionId: SectionId) => void;
    scrollY: SharedValue<number>;
    sectionOffsets: MutableRefObject<SectionOffsets>;
};
