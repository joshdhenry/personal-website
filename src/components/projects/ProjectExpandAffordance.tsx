import { StyleSheet, Text } from "react-native";

import { colors } from "@/theme/colors";
import { typeScale } from "@/theme/typography";
import type { ProjectExpandAffordanceProps } from "@/types/projects";

const COLLAPSED_LABEL = "+ details";
const OPEN_LABEL = "− close";

export const ProjectExpandAffordance = ({ isOpen, variant }: ProjectExpandAffordanceProps) => {
    const affordanceTypeStyle =
        variant === "compact"
            ? typeScale.projectExpandAffordanceCompact
            : typeScale.projectExpandAffordance;

    return (
        <Text
            importantForAccessibility="no-hide-descendants"
            style={[styles.label, affordanceTypeStyle]}
        >
            {isOpen ? OPEN_LABEL : COLLAPSED_LABEL}
        </Text>
    );
};

const styles = StyleSheet.create({
    label: {
        color: colors.primary,
        flexShrink: 0,
    },
});
