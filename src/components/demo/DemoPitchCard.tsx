import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { demoPitchBody, demoPitchCtaLabel, demoPitchLabel } from "@/data/demo";
import { usePressHoverFocus } from "@/hooks/usePressHoverFocus";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { radius } from "@/theme/radii";
import { demoSpace, focusRingSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { DemoPitchCardProps } from "@/types/demo";

export const DemoPitchCard = ({ isNarrow, onTalkToMePress }: DemoPitchCardProps) => {
    const scale = useSharedValue(1);
    const {
        handleBlur,
        handleFocus,
        handleHoverIn,
        handleHoverOut,
        handlePressIn,
        handlePressOut,
        isActive,
        isFocused,
    } = usePressHoverFocus((active) => {
        scale.value = withSpring(active ? 0.97 : 1, motion.spring.snappy);
    });

    const ctaAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const showFocusRing = Platform.OS === "web" && isFocused;
    const ctaLabelStyle = [
        styles.ctaLabel,
        isActive && styles.ctaLabelActive,
        showFocusRing && styles.focusRing,
    ];
    const cardStyle = [styles.card, !isNarrow && styles.cardWide];

    return (
        <View style={cardStyle}>
            <Text style={styles.label}>{demoPitchLabel}</Text>
            <Text style={styles.body}>{demoPitchBody}</Text>
            <Animated.View style={ctaAnimatedStyle}>
                <Pressable
                    accessibilityLabel={demoPitchCtaLabel}
                    accessibilityRole="link"
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onHoverIn={handleHoverIn}
                    onHoverOut={handleHoverOut}
                    onPress={onTalkToMePress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <Text style={ctaLabelStyle}>{demoPitchCtaLabel}</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        ...typeScale.demoBody,
        color: colors.inkSecondary,
    },
    card: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: demoSpace.pitchCardGap,
        paddingHorizontal: demoSpace.pitchCardPaddingHorizontal,
        paddingVertical: demoSpace.pitchCardPaddingVertical,
    },
    cardWide: {
        alignSelf: "flex-start",
        flex: 0.95,
        minWidth: 0,
    },
    ctaLabel: {
        ...typeScale.badgeLabel,
        color: colors.primary,
    },
    ctaLabelActive: {
        color: colors.primaryHover,
        textDecorationLine: "underline",
    },
    focusRing: {
        // react-native-web-only style props for a visible keyboard focus ring.
        outlineColor: colors.focusRing,
        outlineOffset: focusRingSpace.outlineOffset,
        outlineStyle: "solid",
        outlineWidth: focusRingSpace.outlineWidth,
    } as Record<string, unknown>,
    label: {
        ...typeScale.skillGroupLabel,
        color: colors.inkMuted,
    },
});
