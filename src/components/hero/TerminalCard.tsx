import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from "react-native-reanimated";

import { useIsReducedMotionPreferred } from "@/hooks/useIsReducedMotionPreferred";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { heroSpace } from "@/theme/spacing";
import type { TerminalCardProps } from "@/types/hero";
import { clampParallaxOffset } from "@/utils/scroll";

import { TerminalChromeBar } from "./TerminalChromeBar";
import { TerminalCommandLine } from "./TerminalCommandLine";
import { TerminalLogRow } from "./TerminalLogRow";
import { TerminalProgressRail } from "./TerminalProgressRail";
import { TerminalStatGrid } from "./TerminalStatGrid";

export const TerminalCard = ({
    commandText,
    isNarrow,
    pathLabel,
    scrollY,
    shellLabel,
    stats,
    techLogRows,
}: TerminalCardProps) => {
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const opacity = useSharedValue(1);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
        if (isReducedMotionPreferred) {
            opacity.value = 1;
            translateY.value = 0;
            scale.value = 1;
            return;
        }

        opacity.value = 0;
        translateY.value = 26;
        scale.value = 0.985;
        opacity.value = withDelay(motion.delay.cardInEntrance, withSpring(1, motion.spring.gentle));
        translateY.value = withDelay(
            motion.delay.cardInEntrance,
            withSpring(0, motion.spring.gentle),
        );
        scale.value = withDelay(motion.delay.cardInEntrance, withSpring(1, motion.spring.gentle));
    }, [isReducedMotionPreferred, opacity, translateY, scale]);

    const cardInStyle = useAnimatedStyle(() => {
        const parallaxY = isReducedMotionPreferred
            ? 0
            : clampParallaxOffset(
                  scrollY.value,
                  motion.parallax.scrollOffset,
                  motion.parallax.multiplier,
                  motion.parallax.maxOffset,
              );

        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value + parallaxY }, { scale: scale.value }],
        };
    });
    const cardAnimatedStyle = [styles.card, shadow.terminalCard, cardInStyle];
    const logStyle = [styles.log, !isNarrow && styles.logFixedHeight];

    return (
        <Animated.View style={cardAnimatedStyle}>
            <TerminalChromeBar pathLabel={pathLabel} shellLabel={shellLabel} />
            <TerminalProgressRail />
            <TerminalCommandLine commandText={commandText} />
            <View style={logStyle}>
                {techLogRows.map((row) => (
                    <TerminalLogRow
                        key={row.id}
                        staggerDelayMilliseconds={row.staggerDelayMilliseconds}
                        techName={row.techName}
                        yearsLabel={row.yearsLabel}
                    />
                ))}
            </View>
            <TerminalStatGrid stats={stats} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        overflow: "hidden",
    },
    log: {
        overflow: "hidden",
        paddingBottom: 16,
        paddingHorizontal: heroSpace.terminalLogPaddingHorizontal,
    },
    logFixedHeight: {
        height: heroSpace.terminalLogHeight,
    },
});
