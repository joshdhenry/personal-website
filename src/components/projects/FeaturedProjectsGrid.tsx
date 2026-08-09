import { StyleSheet, View, type ViewStyle } from "react-native";

import { projectsSpace } from "@/theme/spacing";
import type { FeaturedProjectsGridProps } from "@/types/projects";
import { chunkArray } from "@/utils/chunkArray";

import { FeaturedProjectCard } from "./FeaturedProjectCard";

const COLUMN_COUNT = 2;

export const FeaturedProjectsGrid = ({ isNarrow, projects }: FeaturedProjectsGridProps) => {
    if (isNarrow) {
        return (
            <View style={styles.columnNarrow}>
                {projects.map((project) => (
                    <FeaturedProjectCard key={project.id} project={project} />
                ))}
            </View>
        );
    }

    const spanningProjects = projects.filter((project) => project.spansBothColumns);
    const regularRows = chunkArray(
        projects.filter((project) => !project.spansBothColumns),
        COLUMN_COUNT,
    );

    return (
        <View style={styles.grid}>
            {spanningProjects.map((project) => (
                <FeaturedProjectCard key={project.id} project={project} />
            ))}
            {regularRows.map((row) => (
                <View key={row[0]?.id} style={styles.row}>
                    {row.map((project) => (
                        <View key={project.id} style={styles.item}>
                            <FeaturedProjectCard project={project} />
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
        gap: projectsSpace.featuredGridGap,
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
        gap: projectsSpace.featuredGridGap,
    },
});
