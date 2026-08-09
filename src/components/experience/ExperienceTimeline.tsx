import { StyleSheet, View } from "react-native";

import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { experienceSpace } from "@/theme/spacing";
import type { ExperienceTimelineProps } from "@/types/experience";

import { ExperienceRow } from "./ExperienceRow";
import { ExperienceTimelineRail } from "./ExperienceTimelineRail";

export const ExperienceTimeline = ({ isNarrow, roles }: ExperienceTimelineProps) => {
    const containerStyle = [
        styles.container,
        {
            paddingLeft: isNarrow
                ? experienceSpace.timelinePaddingLeftNarrow
                : experienceSpace.timelinePaddingLeftWide,
        },
    ];

    return (
        <View style={containerStyle}>
            <View importantForAccessibility="no-hide-descendants" style={styles.track} />
            <ExperienceTimelineRail />

            <View style={styles.rows}>
                {roles.map((role, index) => (
                    <ExperienceRow
                        isNarrow={isNarrow}
                        key={`${role.role}-${role.dateRangeLabel}`}
                        role={role}
                        staggerDelayMilliseconds={
                            motion.delay.experienceRowStaggerStart +
                            index * motion.experienceRowStaggerStep
                        }
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: experienceSpace.timelineMaxWidth,
        position: "relative",
    },
    rows: {
        gap: experienceSpace.rowGap,
    },
    track: {
        backgroundColor: colors.border,
        bottom: experienceSpace.railInset,
        left: experienceSpace.railLeft,
        position: "absolute",
        top: experienceSpace.railInset,
        width: 1,
    },
});
