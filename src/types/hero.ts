export type HeroActionBadgeDescriptor = {
    accessibilityLabel: string;
    href: string;
    id: string;
    label: "LinkedIn" | "Resume" | "GitHub";
};

export type HeroTechLogRow = {
    id: string;
    staggerDelayMilliseconds: number;
    techName: string;
    yearsLabel: string;
};

export type HeroStat = {
    finalValue: number;
    id: string;
    label: string;
    suffix: string;
};

export type ActionBadgeProps = {
    badge: HeroActionBadgeDescriptor;
};

export type ActionBadgeRowProps = {
    badges: readonly HeroActionBadgeDescriptor[];
    isCompact: boolean;
};

export type StatusEyebrowProps = {
    eyebrowLabel: string;
    openToWorkLabel: string;
};

export type TerminalCardProps = {
    commandText: string;
    isNarrow: boolean;
    pathLabel: string;
    shellLabel: string;
    stats: readonly HeroStat[];
    techLogRows: readonly HeroTechLogRow[];
};

export type TerminalChromeBarProps = {
    pathLabel: string;
    shellLabel: string;
};

export type TerminalCommandLineProps = {
    commandText: string;
};

export type TerminalLogRowProps = {
    staggerDelayMilliseconds: number;
    techName: string;
    yearsLabel: string;
};

export type TerminalStatGridProps = {
    stats: readonly HeroStat[];
};

export type TerminalStatPanelProps = {
    borderRight: boolean;
    borderTop: boolean;
    finalValue: number;
    label: string;
    suffix: string;
};
