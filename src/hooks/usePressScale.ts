import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { usePressHoverFocus } from "@/hooks/usePressHoverFocus";
import { motion } from "@/theme/motion";
import type { PressScaleState } from "@/types/interaction";

// Press/hover scale (+ optional lift) feedback for every Pressable badge/link.
// liftDistance stays 0 for scale-only; ActionBadge passes a negative value.
export const usePressScale = (liftDistance = 0): PressScaleState => {
    const scale = useSharedValue(1);
    const liftY = useSharedValue(0);

    const pressHoverFocus = usePressHoverFocus((active) => {
        scale.value = withSpring(active ? motion.pressScale : 1, motion.spring.snappy);
        if (liftDistance !== 0) {
            liftY.value = withSpring(active ? liftDistance : 0, motion.spring.snappy);
        }
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform:
            liftDistance !== 0
                ? [{ scale: scale.value }, { translateY: liftY.value }]
                : [{ scale: scale.value }],
    }));

    return { ...pressHoverFocus, animatedStyle };
};
