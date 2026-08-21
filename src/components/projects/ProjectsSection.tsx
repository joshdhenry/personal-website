import { memo } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";

import { compactProjects, featuredProjects } from "@/data/projects";
import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { projectsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";

import { CompactProjectsGrid } from "./CompactProjectsGrid";
import { FeaturedProjectsGrid } from "./FeaturedProjectsGrid";

const PROJECTS_HEADING = "Projects";
const PROJECTS_CAPTION = "click a card to expand";
const ALSO_SHIPPED_LABEL = "ALSO SHIPPED";

// Zero props, so this memo always bails out on the parent's scroll-spy
// re-renders - only its own hooks (useWindowDimensions, useRiseEntrance) can
// still trigger a real re-render.
export const ProjectsSection = memo(() => {
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);
    const headingRiseStyle = useRiseEntrance(motion.delay.riseProjectsHeading);

    const paddingHorizontal = isCompact
        ? projectsSpace.sectionPaddingHorizontalCompact
        : isNarrow
          ? projectsSpace.sectionPaddingHorizontalNarrow
          : projectsSpace.sectionPaddingHorizontalWide;
    const paddingVertical = isNarrow
        ? projectsSpace.sectionPaddingVerticalNarrow
        : projectsSpace.sectionPaddingVerticalWide;

    const sectionStyle = [
        styles.section,
        { paddingBottom: paddingVertical, paddingHorizontal, paddingTop: paddingVertical },
    ];
    const headingRowStyle = [styles.headingRow, headingRiseStyle];

    return (
        <View style={sectionStyle}>
            <Animated.View style={headingRowStyle}>
                <Text accessibilityRole="header" style={styles.heading}>
                    {PROJECTS_HEADING}
                </Text>
                <Text style={styles.caption}>{PROJECTS_CAPTION}</Text>
            </Animated.View>

            <View style={styles.featuredGridWrapper}>
                <FeaturedProjectsGrid isNarrow={isNarrow} projects={featuredProjects} />
            </View>

            <View style={styles.divider}>
                <Text style={styles.dividerLabel}>{ALSO_SHIPPED_LABEL}</Text>
                <View style={styles.dividerRule} />
            </View>

            <CompactProjectsGrid isNarrow={isNarrow} projects={compactProjects} />
        </View>
    );
});
ProjectsSection.displayName = "ProjectsSection";

const styles = StyleSheet.create({
    caption: {
        ...typeScale.projectsCaption,
        color: colors.inkMuted,
    },
    divider: {
        alignItems: "center",
        flexDirection: "row",
        gap: projectsSpace.dividerGap,
        marginBottom: projectsSpace.dividerMarginBottom,
        marginTop: projectsSpace.dividerMarginTop,
    },
    dividerLabel: {
        ...typeScale.projectsDividerLabel,
        color: colors.inkMuted,
    },
    dividerRule: {
        backgroundColor: colors.border,
        flex: 1,
        height: 1,
    },
    featuredGridWrapper: {
        marginTop: projectsSpace.featuredGridTopMargin,
    },
    heading: {
        ...typeScale.h2,
        color: colors.ink,
    },
    headingRow: {
        alignItems: "baseline",
        flexDirection: "row",
        gap: projectsSpace.headingRowGap,
        marginBottom: projectsSpace.headingBottomMargin,
    },
    section: {
        alignSelf: "center",
        backgroundColor: colors.bg,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        maxWidth: projectsSpace.containerMaxWidth,
        width: "100%",
    },
});
