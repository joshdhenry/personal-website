import { memo } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";

import { skillGroups } from "@/data/skills";
import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { skillsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";

import { SkillsGrid } from "./SkillsGrid";

const SKILLS_HEADING = "Skills";

// Zero props, so this memo always bails out on the parent's scroll-spy
// re-renders - only its own hooks (useWindowDimensions, useRiseEntrance) can
// still trigger a real re-render.
export const SkillsSection = memo(() => {
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);
    const headingRiseStyle = useRiseEntrance(motion.delay.riseSkillsHeading);

    const paddingHorizontal = isCompact
        ? skillsSpace.sectionPaddingHorizontalCompact
        : isNarrow
          ? skillsSpace.sectionPaddingHorizontalNarrow
          : skillsSpace.sectionPaddingHorizontalWide;
    const paddingVertical = isNarrow
        ? skillsSpace.sectionPaddingVerticalNarrow
        : skillsSpace.sectionPaddingVerticalWide;

    const sectionStyle = [
        styles.section,
        { paddingBottom: paddingVertical, paddingHorizontal, paddingTop: paddingVertical },
    ];
    const headingRowStyle = [styles.headingRow, headingRiseStyle];

    return (
        <View style={sectionStyle}>
            <Animated.View style={headingRowStyle}>
                <Text accessibilityRole="header" style={styles.heading}>
                    {SKILLS_HEADING}
                </Text>
            </Animated.View>

            <SkillsGrid groups={skillGroups} isNarrow={isNarrow} />
        </View>
    );
});
SkillsSection.displayName = "SkillsSection";

const styles = StyleSheet.create({
    heading: {
        ...typeScale.h2,
        color: colors.ink,
    },
    headingRow: {
        marginBottom: skillsSpace.headingBottomMargin,
    },
    section: {
        alignSelf: "center",
        backgroundColor: colors.bg,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        maxWidth: skillsSpace.containerMaxWidth,
        width: "100%",
    },
});
