import { memo } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";

import { experienceRangeLabel, experienceRoles } from "@/data/experience";
import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { experienceSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";

import { ExperienceTimeline } from "./ExperienceTimeline";

const EXPERIENCE_HEADING = "Experience";

// Zero props, so this memo always bails out on the parent's scroll-spy
// re-renders - only its own hooks (useWindowDimensions, useRiseEntrance) can
// still trigger a real re-render.
export const ExperienceSection = memo(() => {
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);
    const headingRiseStyle = useRiseEntrance(motion.delay.riseExperienceHeading);

    const paddingHorizontal = isCompact
        ? experienceSpace.sectionPaddingHorizontalCompact
        : isNarrow
          ? experienceSpace.sectionPaddingHorizontalNarrow
          : experienceSpace.sectionPaddingHorizontalWide;
    const paddingVertical = isNarrow
        ? experienceSpace.sectionPaddingVerticalNarrow
        : experienceSpace.sectionPaddingVerticalWide;

    const sectionStyle = [
        styles.section,
        { paddingBottom: paddingVertical, paddingHorizontal, paddingTop: paddingVertical },
    ];
    const headingRowStyle = [styles.headingRow, headingRiseStyle];

    return (
        <View style={sectionStyle}>
            <Animated.View style={headingRowStyle}>
                <Text accessibilityRole="header" style={styles.heading}>
                    {EXPERIENCE_HEADING}
                </Text>
                <Text style={styles.rangeLabel}>{experienceRangeLabel}</Text>
            </Animated.View>

            <ExperienceTimeline isNarrow={isNarrow} roles={experienceRoles} />
        </View>
    );
});
ExperienceSection.displayName = "ExperienceSection";

const styles = StyleSheet.create({
    heading: {
        ...typeScale.h2,
        color: colors.ink,
    },
    headingRow: {
        alignItems: "baseline",
        flexDirection: "row",
        gap: experienceSpace.headingRowGap,
        marginBottom: experienceSpace.headingBottomMargin,
    },
    rangeLabel: {
        ...typeScale.experienceRangeLabel,
        color: colors.inkMuted,
    },
    section: {
        alignSelf: "center",
        backgroundColor: colors.bg,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        maxWidth: experienceSpace.containerMaxWidth,
        width: "100%",
    },
});
