import { StyleSheet, View, type ViewStyle } from "react-native";

import { skillsSpace } from "@/theme/spacing";
import type { SkillsGridProps } from "@/types/skills";
import { chunkArray } from "@/utils/chunkArray";

import { SkillGroupRow } from "./SkillGroupRow";

const COLUMN_COUNT = 2;

export const SkillsGrid = ({ groups, isNarrow }: SkillsGridProps) => {
    if (isNarrow) {
        return (
            <View style={styles.columnNarrow}>
                {groups.map((group) => (
                    <SkillGroupRow group={group} isNarrow key={group.label} />
                ))}
            </View>
        );
    }

    const rows = chunkArray(groups, COLUMN_COUNT);

    return (
        <View style={styles.grid}>
            {rows.map((row) => (
                <View key={row[0]?.label} style={styles.row}>
                    {row.map((group) => (
                        <View key={group.label} style={styles.item}>
                            <SkillGroupRow group={group} isNarrow={false} />
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    columnNarrow: {
        gap: skillsSpace.gridRowGap,
    },
    grid: {
        gap: skillsSpace.gridRowGap,
    },
    item: {
        // Caps a lone leftover item in an under-full last row at its normal
        // column width instead of stretching to fill the row (flex: 1 alone
        // would otherwise let it grow to 100% when it's the row's only child).
        flex: 1,
        maxWidth: `${(100 / COLUMN_COUNT).toFixed(4)}%` as ViewStyle["maxWidth"],
    },
    row: {
        flexDirection: "row",
        gap: skillsSpace.gridColumnGap,
    },
});
