import { Linking, Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { usePressHoverFocus } from "@/hooks/usePressHoverFocus";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { focusRingSpace, heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ActionBadgeProps } from "@/types/hero";

// Android clips a View's children to its background's rounded-corner outline
// once `elevation` is applied (the outline provider used to cast the
// elevation shadow doubles as a clip mask). Toggling elevation on press on
// this badge's own rounded, bordered node was clipping its label text on
// Android. The hover/press shadow is decorative polish, so it's web-only
// (react-native-web's boxShadow doesn't have this clipping behavior).
const isHoverShadowSupported = Platform.OS === "web";

export const ActionBadge = ({ badge }: ActionBadgeProps) => {
    const scale = useSharedValue(1);
    const liftY = useSharedValue(0);
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
        liftY.value = withSpring(active ? -2 : 0, motion.spring.snappy);
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateY: liftY.value }],
    }));

    // The OS may not have a handler for this URL; there's no status UI on a
    // badge to surface that to, so the rejection is swallowed rather than
    // left unhandled.
    const handlePress = () => {
        Linking.openURL(badge.href).catch(() => {});
    };

    const showFocusRing = Platform.OS === "web" && isFocused;
    const badgeAnimatedStyle = [
        styles.badge,
        isActive && styles.badgeActive,
        isActive && isHoverShadowSupported && shadow.badgeHover,
        showFocusRing && styles.focusRing,
        animatedStyle,
    ];
    const labelStyle = [styles.label, isActive && styles.labelActive];

    return (
        <Animated.View style={badgeAnimatedStyle}>
            <Pressable
                accessibilityLabel={badge.accessibilityLabel}
                accessibilityRole="link"
                onBlur={handleBlur}
                onFocus={handleFocus}
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.pressable}
            >
                <Text style={labelStyle}>{badge.label}</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    badge: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        flexShrink: 0,
    },
    badgeActive: {
        borderColor: colors.primary,
    },
    focusRing: {
        // react-native-web-only style props for a visible keyboard focus ring.
        outlineColor: colors.focusRing,
        outlineOffset: focusRingSpace.outlineOffset,
        outlineStyle: "solid",
        outlineWidth: focusRingSpace.outlineWidth,
    } as Record<string, unknown>,
    label: {
        ...typeScale.badgeLabel,
        color: colors.ink,
    },
    labelActive: {
        color: colors.primary,
    },
    pressable: {
        paddingHorizontal: heroSpace.badgePaddingHorizontal,
        paddingVertical: heroSpace.badgePaddingVertical,
    },
});
