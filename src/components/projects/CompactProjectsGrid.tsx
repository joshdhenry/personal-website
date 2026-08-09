import { StyleSheet, View, type ViewStyle } from "react-native";

import { projectsSpace } from "@/theme/spacing";
import type { CompactProjectsGridProps } from "@/types/projects";
import { chunkArray } from "@/utils/chunkArray";

import { CompactProjectCard } from "./CompactProjectCard";

const COLUMN_COUNT = 3;

export const CompactProjectsGrid = ({ isNarrow, projects }: CompactProjectsGridProps) => {
    if (isNarrow) {
        return (
            <View style={styles.columnNarrow}>
                {projects.map((project) => (
                    <CompactProjectCard key={project.id} project={project} />
                ))}
            </View>
        );
    }

    const rows = chunkArray(projects, COLUMN_COUNT);

    return (
        <View style={styles.grid}>
            {rows.map((row) => (
                <View key={row[0]?.id} style={styles.row}>
                    {row.map((project) => (
                        <View key={project.id} style={styles.item}>
                            <CompactProjectCard project={project} />
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    columnNarrow: {
        gap: projectsSpace.narrowGridGap,
    },
    grid: {
        gap: projectsSpace.compactGridGap,
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
        gap: projectsSpace.compactGridGap,
    },
});
