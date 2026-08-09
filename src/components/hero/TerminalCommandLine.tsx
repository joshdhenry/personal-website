import { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

import { useIsReducedMotionPreferred } from "@/hooks/useIsReducedMotionPreferred";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { TerminalCommandLineProps } from "@/types/hero";

// Both iOS and Android can render IBM Plex Mono wide enough that the full
// --sort flag no longer fits the terminal card's width on one line at
// narrow phone widths (web fits as-is via the flexShrink wrap path below,
// and doesn't respect these native-only props anyway). Rather than let it
// wrap (the command is one logical line of load-bearing copy), shrink-to-fit
// on every native platform; ellipsizeMode is a last-resort guarantee it
// never runs off the card if some device is narrower than anything verified.
const isSingleLineCommandRequired = Platform.OS !== "web";
const singleLineCommandTextProps = isSingleLineCommandRequired
    ? {
          adjustsFontSizeToFit: true,
          ellipsizeMode: "tail" as const,
          minimumFontScale: typeScale.terminalCommandMinimumFontScale,
          numberOfLines: 1,
      }
    : {};

export const TerminalCommandLine = ({ commandText }: TerminalCommandLineProps) => {
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const caretOpacity = useSharedValue(1);

    useEffect(() => {
        if (isReducedMotionPreferred) {
            caretOpacity.value = 1;
            return;
        }

        const halfCycle = motion.duration.caretBlinkCycle / 2;
        const stepEasing = Easing.steps(1, true);
        caretOpacity.value = withRepeat(
            withSequence(
                withTiming(0, { duration: halfCycle, easing: stepEasing }),
                withTiming(1, { duration: halfCycle, easing: stepEasing }),
            ),
            -1,
        );
    }, [isReducedMotionPreferred, caretOpacity]);

    const caretStyle = useAnimatedStyle(() => ({
        opacity: caretOpacity.value,
    }));
    const caretAnimatedStyle = [styles.caret, caretStyle];

    return (
        <View style={styles.row}>
            <Text importantForAccessibility="no-hide-descendants" style={styles.prompt}>
                $
            </Text>
            {/* flexShrink lets this wrap on narrow Android/web widths instead of
          overflowing and getting clipped by the terminal card's overflow:
          hidden — this exact command string is load-bearing copy that must
          never be truncated. iOS instead shrink-to-fits onto one line via
          singleLineCommandTextProps above. */}
            <Text style={styles.command} {...singleLineCommandTextProps}>
                {commandText}
            </Text>
            <Animated.View
                importantForAccessibility="no-hide-descendants"
                style={caretAnimatedStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    caret: {
        backgroundColor: colors.ink,
        height: 13,
        marginLeft: 2,
        width: 7,
    },
    command: {
        ...typeScale.terminalCommand,
        color: colors.ink,
        flexShrink: 1,
    },
    prompt: {
        ...typeScale.terminalCommand,
        color: colors.primary,
        fontFamily: typeScale.terminalCommand.fontFamily,
        fontWeight: "600",
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        gap: 9,
        paddingBottom: heroSpace.terminalCommandPaddingBottom,
        paddingHorizontal: heroSpace.terminalLogPaddingHorizontal,
        paddingTop: heroSpace.terminalCommandPaddingTop,
    },
});
