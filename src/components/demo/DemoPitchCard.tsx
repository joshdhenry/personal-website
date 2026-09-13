import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { demoPitchBody, demoPitchCtaLabel, demoPitchLabel } from "@/data/demo";
import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import { radius } from "@/theme/radii";
import { demoSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { DemoPitchCardProps } from "@/types/demo";

export const DemoPitchCard = ({ isNarrow, onTalkToMePress }: DemoPitchCardProps) => {
    const {
        animatedStyle: ctaAnimatedStyle,
        isActive,
        onBlur,
        onFocus,
        onHoverIn,
        onHoverOut,
        onPressIn,
        onPressOut,
        showFocusRing,
    } = usePressScale();

    const ctaLabelStyle = [
        styles.ctaLabel,
        isActive && styles.ctaLabelActive,
        showFocusRing && focusRing,
    ];
    const cardStyle = [styles.card, !isNarrow && styles.cardWide];

    // accessibilityRole="button" (not "link"): react-native-web only fires
    // a real <a>'s native keyboard Enter/Space activation for role="link",
    // and this isn't a real <a> (onTalkToMePress scrolls imperatively).
    return (
        <View style={cardStyle}>
            <Text style={styles.label}>{demoPitchLabel}</Text>
            <Text style={styles.body}>{demoPitchBody}</Text>
            <Animated.View style={ctaAnimatedStyle}>
                <Pressable
                    accessibilityLabel={demoPitchCtaLabel}
                    accessibilityRole="button"
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onHoverIn={onHoverIn}
                    onHoverOut={onHoverOut}
                    onPress={onTalkToMePress}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
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
    label: {
        ...typeScale.skillGroupLabel,
        color: colors.inkMuted,
    },
});
