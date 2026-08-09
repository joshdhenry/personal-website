import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";

import { motion } from "@/theme/motion";

import { useIsReducedMotionPreferred } from "./useIsReducedMotionPreferred";

const RISE_DISTANCE = 16;

/**
 * Shared "rise" entrance: opacity 0->1, translateY 16->0, spring-driven,
 * optionally staggered by delayMilliseconds. Shared values initialize at
 * the resting state so the first render (including static export, which
 * never runs the mount effect) always shows fully visible content — the
 * pre-entrance state and the animation back to rest only ever happen after
 * a real mount with working JS, per designs/README.md's own incident
 * history with a previous IntersectionObserver-driven approach that left
 * whole pages invisible when the observer never fired.
 */
export const useRiseEntrance = (delayMilliseconds: number) => {
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const opacity = useSharedValue(1);
    const translateY = useSharedValue(0);

    useEffect(() => {
        if (isReducedMotionPreferred) {
            opacity.value = 1;
            translateY.value = 0;
            return;
        }

        opacity.value = 0;
        translateY.value = RISE_DISTANCE;
        opacity.value = withDelay(delayMilliseconds, withSpring(1, motion.spring.gentle));
        translateY.value = withDelay(delayMilliseconds, withSpring(0, motion.spring.gentle));
    }, [isReducedMotionPreferred, delayMilliseconds, opacity, translateY]);

    return useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));
};
