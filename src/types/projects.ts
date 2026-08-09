import type { ImageSourcePropType } from "react-native";

export type FeaturedProject = {
    id: string;
    image: ImageSourcePropType;
    imageAlt: string;
    isWordmarkImage: boolean;
    outcome?: string;
    problem: string;
    spansBothColumns: boolean;
    stackChips: readonly string[];
    stackSentence: string;
    subtitle: string;
    tier: "featured";
    title: string;
    whatIBuilt: string;
};

export type CompactProject = {
    id: string;
    image: ImageSourcePropType;
    imageAlt: string;
    paragraph: string;
    techLine: string;
    tier: "compact";
    title: string;
};

export type Project = CompactProject | FeaturedProject;

export type FeaturedProjectsGridProps = {
    isNarrow: boolean;
    projects: readonly FeaturedProject[];
};

export type CompactProjectsGridProps = {
    isNarrow: boolean;
    projects: readonly CompactProject[];
};

export type FeaturedProjectCardProps = {
    project: FeaturedProject;
};

export type CompactProjectCardProps = {
    project: CompactProject;
};

export type ProjectImageBandProps = {
    alt: string;
    hasFullBorder: boolean;
    isWordmark: boolean;
    source: ImageSourcePropType;
};

export type ProjectStackChipsProps = {
    chips: readonly string[];
};

export type ProjectExpandAffordanceProps = {
    isOpen: boolean;
    variant: "compact" | "featured";
};

export type ProjectDetailFieldProps = {
    label: string;
    value: string;
};
