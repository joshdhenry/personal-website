import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { radius } from "@/theme/radii";
import { typeScale } from "@/theme/typography";
import type { StatusEyebrowProps } from "@/types/hero";

export const StatusEyebrow = ({ eyebrowLabel, openToWorkLabel }: StatusEyebrowProps) => {
    const riseStyle = useRiseEntrance(motion.delay.riseEyebrow);
    const rowAnimatedStyle = [styles.row, riseStyle];

    return (
        <Animated.View style={rowAnimatedStyle}>
            <Text style={styles.eyebrowText}>{eyebrowLabel}</Text>
            <View accessibilityLabel={openToWorkLabel} accessible style={styles.openToWorkPill}>
                <View
                    importantForAccessibility="no-hide-descendants"
                    style={styles.openToWorkDot}
                />
                <Text style={styles.openToWorkText}>{openToWorkLabel}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    eyebrowText: {
        ...typeScale.eyebrow,
        color: colors.inkMuted,
        flexShrink: 1,
    },
    openToWorkDot: {
        backgroundColor: colors.statusPassing,
        borderRadius: radius.pill,
        height: 6,
        width: 6,
    },
    openToWorkPill: {
        alignItems: "center",
        backgroundColor: colors.statusPassingBackground,
        borderColor: colors.statusPassingBorder,
        borderRadius: radius.pill,
        borderWidth: 1,
        flexDirection: "row",
        flexShrink: 0,
        gap: 7,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    openToWorkText: {
        ...typeScale.openToWorkLabel,
        color: colors.statusPassing,
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: "space-between",
    },
});
