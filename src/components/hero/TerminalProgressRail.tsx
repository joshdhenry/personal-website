import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

import { useIsReducedMotionPreferred } from "@/hooks/useIsReducedMotionPreferred";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";

/**
 * The 2px progress rail above the terminal command line. Static/no-JS state
 * is a full (100%) fill, matching the "visible by default" invariant; the
 * fill-from-zero is a pure enhancement layered on top after mount.
 */
export const TerminalProgressRail = () => {
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const fillPercent = useSharedValue(100);

    useEffect(() => {
        if (isReducedMotionPreferred) {
            fillPercent.value = 100;
            return;
        }

        fillPercent.value = 0;
        fillPercent.value = withDelay(
            motion.delay.progressBarFill,
            withTiming(100, {
                duration: motion.duration.progressBarFill,
                easing: Easing.bezier(0.3, 0.7, 0.3, 1),
            }),
        );
    }, [isReducedMotionPreferred, fillPercent]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${fillPercent.value}%`,
    }));
    const fillAnimatedStyle = [styles.fill, animatedStyle];

    return (
        <View importantForAccessibility="no-hide-descendants" style={styles.track}>
            <Animated.View style={fillAnimatedStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    fill: {
        backgroundColor: colors.primary,
        height: 2,
    },
    track: {
        backgroundColor: colors.border,
        height: 2,
    },
});
