import { StyleSheet, View } from "react-native";

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
        flex: 1,
    },
    row: {
        flexDirection: "row",
        gap: projectsSpace.compactGridGap,
    },
});
