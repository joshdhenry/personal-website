import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    Easing,
    runOnJS,
    useAnimatedReaction,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import { useIsReducedMotionPreferred } from "@/hooks/useIsReducedMotionPreferred";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { TerminalStatPanelProps } from "@/types/hero";

export const TerminalStatPanel = ({
    borderRight,
    borderTop,
    finalValue,
    label,
    suffix,
}: TerminalStatPanelProps) => {
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const animatedValue = useSharedValue(finalValue);
    const [displayedValue, setDisplayedValue] = useState(finalValue);

    useEffect(() => {
        if (isReducedMotionPreferred) {
            animatedValue.value = finalValue;
            setDisplayedValue(finalValue);
            return;
        }

        animatedValue.value = 0;
        setDisplayedValue(0);
        animatedValue.value = withTiming(finalValue, {
            duration: motion.duration.statCounter,
            easing: Easing.out(Easing.cubic),
        });
    }, [isReducedMotionPreferred, finalValue, animatedValue]);

    useAnimatedReaction(
        () => Math.round(animatedValue.value),
        (current, previous) => {
            if (current !== previous) {
                runOnJS(setDisplayedValue)(current);
            }
        },
    );

    // The accessibility label always reads the static final value, never the
    // animating display value, so a screen reader never announces a mid-count
    // transient number.
    const accessibilityLabel = `${finalValue}${suffix}, ${label}`;
    const panelStyle = [
        styles.panel,
        borderRight && styles.borderRight,
        borderTop && styles.borderTop,
    ];
    const valueText = `${displayedValue}${suffix}`;

    return (
        <View accessibilityLabel={accessibilityLabel} accessible style={panelStyle}>
            <Text importantForAccessibility="no-hide-descendants" style={styles.value}>
                {valueText}
            </Text>
            <Text importantForAccessibility="no-hide-descendants" style={styles.label}>
                {label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    borderRight: {
        borderRightColor: colors.border,
        borderRightWidth: 1,
    },
    borderTop: {
        borderTopColor: colors.border,
        borderTopWidth: 1,
    },
    label: {
        ...typeScale.statLabel,
        color: colors.inkMuted,
    },
    panel: {
        flexBasis: "50%",
        flexGrow: 1,
        gap: 2,
        paddingHorizontal: heroSpace.statPanelPaddingHorizontal,
        paddingVertical: heroSpace.statPanelPaddingVertical,
    },
    value: {
        ...typeScale.statNumber,
        color: colors.ink,
    },
});
