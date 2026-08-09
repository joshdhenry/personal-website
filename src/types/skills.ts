export type SkillGroup = {
    items: readonly string[];
    label: string;
};

export type SkillsGridProps = {
    groups: readonly SkillGroup[];
    isNarrow: boolean;
};

export type SkillGroupRowProps = {
    group: SkillGroup;
    isNarrow: boolean;
};

export type SkillChipRowProps = {
    items: readonly string[];
};
