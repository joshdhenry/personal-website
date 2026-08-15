import type { MutableRefObject } from "react";
import type { ScrollView, TextStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

export type SectionId = "top" | "projects" | "skills" | "experience" | "about" | "demo" | "contact";

export type SectionOffsets = Record<SectionId, number>;

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
    onPress: () => void;
};

export type StickyNavProps = {
    isCompact: boolean;
    isNarrow: boolean;
    onLinkPress: (sectionId: SectionId) => void;
    scrollY: SharedValue<number>;
};

export type UseScrollToSectionParams = {
    scrollViewRef: MutableRefObject<ScrollView | null>;
    sectionOffsets: MutableRefObject<SectionOffsets>;
};
