import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { skillsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { SkillChipRowProps } from "@/types/skills";

export const SkillChipRow = ({ isNarrow, items }: SkillChipRowProps) => {
    const rowStyle = [styles.row, isNarrow ? undefined : styles.rowWide];

    return (
        <View importantForAccessibility="no-hide-descendants" style={rowStyle}>
            {items.map((item) => (
                <View key={item} style={styles.chip}>
                    <Text style={styles.chipLabel}>{item}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    chip: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.pill,
        borderWidth: 1,
        paddingHorizontal: skillsSpace.chipPaddingHorizontal,
        paddingVertical: skillsSpace.chipPaddingVertical,
    },
    chipLabel: {
        ...typeScale.skillChip,
        color: colors.inkSecondary,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: skillsSpace.chipRowGap,
    },
    rowWide: {
        // Fills the remaining width next to SkillGroupRow's fixed-width label
        // column; the narrow/stacked layout has no sibling to share space
        // with, so this is skipped there rather than left as a no-op.
        flex: 1,
    },
});
