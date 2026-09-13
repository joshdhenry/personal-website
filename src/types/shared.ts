import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type ChromeBarShellProps = {
    children: ReactNode;
    hideFromAccessibility: boolean;
};

export type ExternalLinkBadgeProps = {
    accessibilityLabel: string;
    badgeStyle: StyleProp<ViewStyle>;
    label: string;
    liftDistance?: number;
    pressableStyle: StyleProp<ViewStyle>;
    url: string;
};
