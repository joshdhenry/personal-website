import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { skillsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { SkillChipRowProps } from "@/types/skills";

export const SkillChipRow = ({ items }: SkillChipRowProps) => (
    <View style={styles.row}>
        {items.map((item) => (
            <View key={item} style={styles.chip}>
                <Text style={styles.chipLabel}>{item}</Text>
            </View>
        ))}
    </View>
);

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
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: skillsSpace.chipRowGap,
    },
});
