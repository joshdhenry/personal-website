import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { skillsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { SkillGroupRowProps } from "@/types/skills";

import { SkillChipRow } from "./SkillChipRow";

export const SkillGroupRow = ({ group, isNarrow }: SkillGroupRowProps) => {
    const rowStyle = [styles.row, isNarrow ? styles.rowNarrow : styles.rowWide];
    const labelStyle = [styles.label, isNarrow ? undefined : styles.labelWide];

    return (
        <View style={rowStyle}>
            <Text style={labelStyle}>{group.label}</Text>
            <SkillChipRow items={group.items} />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        ...typeScale.skillGroupLabel,
        color: colors.inkMuted,
        paddingTop: skillsSpace.groupLabelPaddingTop,
    },
    labelWide: {
        width: skillsSpace.groupLabelColumnWidth,
    },
    row: {
        alignItems: "flex-start",
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        gap: skillsSpace.groupLabelChipGap,
        paddingBottom: skillsSpace.groupRowBottomPadding,
    },
    rowNarrow: {
        flexDirection: "column",
    },
    rowWide: {
        flexDirection: "row",
    },
});
