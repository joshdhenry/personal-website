export type ExperienceRole = {
    companyLine: string;
    dateRangeLabel: string;
    note: string;
    role: string;
};

export type ExperienceRowProps = {
    isNarrow: boolean;
    role: ExperienceRole;
    staggerDelayMilliseconds: number;
};

export type ExperienceTimelineProps = {
    isNarrow: boolean;
    roles: readonly ExperienceRole[];
};
