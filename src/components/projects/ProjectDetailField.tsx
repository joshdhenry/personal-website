import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { projectsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ProjectDetailFieldProps } from "@/types/projects";

export const ProjectDetailField = ({ label, value }: ProjectDetailFieldProps) => (
    <View style={styles.field}>
        <Text importantForAccessibility="no-hide-descendants" style={styles.label}>
            {label}
        </Text>
        <Text importantForAccessibility="no-hide-descendants" style={styles.value}>
            {value}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    field: {
        gap: projectsSpace.detailFieldGap,
    },
    label: {
        ...typeScale.projectDetailLabel,
        color: colors.inkMuted,
    },
    value: {
        ...typeScale.projectSubtitleAndBody,
        color: colors.inkSecondary,
    },
});
