import type { ReactNode } from "react";

export type DemoStep = {
    description: string;
    id: string;
    number: string;
};

export type DemoIntroProps = {
    isMobileReader: boolean;
    isNarrow: boolean;
};

export type DemoPitchCardProps = {
    isNarrow: boolean;
    onTalkToMePress: () => void;
};

export type DemoSectionProps = {
    onTalkToMePress: () => void;
};

export type DemoSnackChromeBarProps = {
    label: string;
    liveEditorLabel: string;
};

export type DemoSnackPlaceholderProps = {
    hint: string;
    label: string;
};

export type DemoSnackCardProps = {
    isInsideSnack: boolean;
    isNativeApp: boolean;
    shouldRenderIframe: boolean;
    snackUrl: string;
};

export type DemoSnackFallbackCardProps = {
    snackUrl: string;
};

export type DemoFallbackCardShellProps = {
    body: string;
    children: ReactNode;
    compact?: boolean;
    label: string;
};

export type DemoExternalLinkBadgeProps = {
    accessibilityLabel: string;
    label: string;
    url: string;
};
