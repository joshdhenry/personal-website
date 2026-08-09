import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { experienceSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ExperienceRowProps } from "@/types/experience";

// Android clips a View's children to its background's rounded-corner outline
// once `elevation` is applied, so the hover/press shadow is web-only. See
// ActionBadge.tsx for the same guard and full rationale.
const isHoverShadowSupported = Platform.OS === "web";

const PRESS_SCALE = 0.97;
const LIFT_DISTANCE = 4;

export const ExperienceRow = ({ isNarrow, role, staggerDelayMilliseconds }: ExperienceRowProps) => {
    const [isActive, setIsActive] = useState(false);
    const riseStyle = useRiseEntrance(staggerDelayMilliseconds);
    const scale = useSharedValue(1);
    const liftY = useSharedValue(0);

    const activeAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateY: liftY.value }],
    }));

    const setActive = (active: boolean) => {
        setIsActive(active);
        scale.value = withSpring(active ? PRESS_SCALE : 1, motion.spring.snappy);
        liftY.value = withSpring(active ? -LIFT_DISTANCE : 0, motion.spring.snappy);
    };

    const handleHoverIn = () => setActive(true);
    const handleHoverOut = () => setActive(false);
    const handlePressIn = () => setActive(true);
    const handlePressOut = () => setActive(false);

    const cardStyle = [
        styles.card,
        isActive && isHoverShadowSupported && shadow.experienceRow,
        riseStyle,
        activeAnimatedStyle,
    ];
    const dotStyle = [styles.dotRing, isNarrow ? styles.dotRingNarrow : styles.dotRingWide];
    const connectorStyle = [
        styles.connector,
        isNarrow ? styles.connectorNarrow : styles.connectorWide,
    ];
    const dateLabelStyle = [styles.dateLabel, !isNarrow && styles.dateLabelWide];
    const contentStyle = [styles.content, !isNarrow && styles.contentWide];
    const accessibilityLabel = `${role.role}, ${role.companyLine}, ${role.dateRangeLabel}, ${role.note}`;

    return (
        <Animated.View style={cardStyle}>
            <Pressable
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="none"
                accessible
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={isNarrow ? styles.rowNarrow : styles.rowWide}
            >
                <View importantForAccessibility="no-hide-descendants" style={dotStyle}>
                    <View style={styles.dot} />
                </View>
                <View importantForAccessibility="no-hide-descendants" style={connectorStyle} />

                <Text importantForAccessibility="no-hide-descendants" style={dateLabelStyle}>
                    {role.dateRangeLabel}
                </Text>

                <View importantForAccessibility="no-hide-descendants" style={contentStyle}>
                    <Text style={styles.role}>{role.role}</Text>
                    <Text style={styles.companyLine}>{role.companyLine}</Text>
                    <Text style={styles.note}>{role.note}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.cardCompact,
        borderWidth: 1,
        paddingHorizontal: experienceSpace.rowPaddingHorizontal,
        paddingVertical: experienceSpace.rowPaddingVertical,
        position: "relative",
    },
    companyLine: {
        ...typeScale.experienceCompanyLine,
        color: colors.inkMuted,
    },
    connector: {
        backgroundColor: colors.border,
        height: 1,
        position: "absolute",
    },
    connectorNarrow: {
        left: experienceSpace.connectorLeftNarrow,
        top: experienceSpace.connectorTopNarrow,
        width: experienceSpace.connectorWidthNarrow,
    },
    connectorWide: {
        left: experienceSpace.connectorLeftWide,
        top: experienceSpace.connectorTopWide,
        width: experienceSpace.connectorWidthWide,
    },
    content: {
        gap: experienceSpace.rowContentGap,
    },
    contentWide: {
        flex: 1,
        minWidth: 0,
    },
    dateLabel: {
        ...typeScale.experienceDateLabel,
        color: colors.inkMutedLight,
    },
    dateLabelWide: {
        flexShrink: 0,
        width: experienceSpace.rowGridDateColumnWidth,
    },
    dot: {
        backgroundColor: colors.primary,
        borderRadius: radius.pill,
        height: experienceSpace.dotSize,
        width: experienceSpace.dotSize,
    },
    dotRing: {
        alignItems: "center",
        backgroundColor: colors.bg,
        borderRadius: radius.pill,
        height: experienceSpace.dotRingSize,
        justifyContent: "center",
        position: "absolute",
        width: experienceSpace.dotRingSize,
    },
    dotRingNarrow: {
        left: experienceSpace.dotLeftNarrow - experienceSpace.dotRingInset,
        top: experienceSpace.dotTopNarrow - experienceSpace.dotRingInset,
    },
    dotRingWide: {
        left: experienceSpace.dotLeftWide - experienceSpace.dotRingInset,
        top: experienceSpace.dotTopWide - experienceSpace.dotRingInset,
    },
    note: {
        ...typeScale.experienceNote,
        color: colors.inkFaint,
        marginTop: experienceSpace.rowContentGap,
    },
    role: {
        ...typeScale.experienceRole,
        color: colors.ink,
    },
    rowNarrow: {
        flexDirection: "column",
        gap: experienceSpace.rowGridGapNarrow,
    },
    rowWide: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: experienceSpace.rowGridGap,
    },
});
