import { useEffect } from "react";
import { StyleSheet } from "react-native";
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
import { experienceSpace } from "@/theme/spacing";

/**
 * The indigo rail drawn over the static track, top to bottom. Static/no-JS
 * state is the full (scaleY: 1) rail, matching the "visible by default"
 * invariant; the draw-from-zero is a pure enhancement layered on after mount.
 */
export const ExperienceTimelineRail = () => {
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const scaleY = useSharedValue(1);

    useEffect(() => {
        if (isReducedMotionPreferred) {
            scaleY.value = 1;
            return;
        }

        scaleY.value = 0;
        scaleY.value = withDelay(
            motion.delay.experienceRailDraw,
            withTiming(1, {
                duration: motion.duration.experienceRailDraw,
                easing: Easing.bezier(0.25, 0.8, 0.3, 1),
            }),
        );
    }, [isReducedMotionPreferred, scaleY]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: scaleY.value }],
    }));
    const railAnimatedStyle = [styles.rail, animatedStyle];

    return (
        <Animated.View importantForAccessibility="no-hide-descendants" style={railAnimatedStyle} />
    );
};

const styles = StyleSheet.create({
    rail: {
        backgroundColor: colors.primary,
        bottom: experienceSpace.railInset,
        left: experienceSpace.railLeft,
        position: "absolute",
        top: experienceSpace.railInset,
        transformOrigin: "top",
        width: 1,
    },
});
