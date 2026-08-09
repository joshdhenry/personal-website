import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { projectsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ProjectStackChipsProps } from "@/types/projects";

export const ProjectStackChips = ({ chips }: ProjectStackChipsProps) => (
    <View style={styles.row}>
        {chips.map((chip) => (
            <View key={chip} style={styles.chip}>
                <Text importantForAccessibility="no-hide-descendants" style={styles.chipLabel}>
                    {chip}
                </Text>
            </View>
        ))}
    </View>
);

const styles = StyleSheet.create({
    chip: {
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        paddingHorizontal: projectsSpace.chipPaddingHorizontal,
        paddingVertical: projectsSpace.chipPaddingVertical,
    },
    chipLabel: {
        ...typeScale.projectStackChip,
        color: colors.inkMuted,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: projectsSpace.chipRowGap,
        marginTop: projectsSpace.chipRowMarginTop,
    },
});
