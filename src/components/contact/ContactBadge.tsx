import { useState } from "react";
import { Linking, Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { contactSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ContactBadgeProps } from "@/types/contact";

// Same Android elevation-clips-rounded-children issue documented in
// hero/ActionBadge.tsx - the hover/press shadow is web-only.
const isHoverShadowSupported = Platform.OS === "web";

export const ContactBadge = ({ badge }: ContactBadgeProps) => {
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const scale = useSharedValue(1);
    const liftY = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateY: liftY.value }],
    }));

    const setActive = (active: boolean) => {
        setIsActive(active);
        scale.value = withSpring(active ? 0.97 : 1, motion.spring.snappy);
        liftY.value = withSpring(active ? -2 : 0, motion.spring.snappy);
    };

    const handlePress = () => Linking.openURL(badge.href);
    const handleHoverIn = () => setActive(true);
    const handleHoverOut = () => setActive(false);
    const handlePressIn = () => setActive(true);
    const handlePressOut = () => setActive(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const showFocusRing = Platform.OS === "web" && isFocused;
    const badgeAnimatedStyle = [
        styles.badge,
        isActive && styles.badgeActive,
        isActive && isHoverShadowSupported && shadow.badgeHover,
        showFocusRing && styles.focusRing,
        animatedStyle,
    ];
    const labelStyle = [styles.label, isActive && styles.labelActive];
    const BadgeIcon = badge.icon;

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
                <BadgeIcon />
                <Text style={labelStyle}>{badge.label}</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    badge: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.imageBand,
        borderWidth: 1,
    },
    badgeActive: {
        borderColor: colors.primary,
    },
    focusRing: {
        // react-native-web-only style props for a visible keyboard focus ring.
        outlineColor: colors.focusRing,
        outlineOffset: 2,
        outlineStyle: "solid",
        outlineWidth: 2,
    } as Record<string, unknown>,
    label: {
        ...typeScale.contactBadgeLabel,
        color: colors.ink,
    },
    labelActive: {
        color: colors.primary,
    },
    pressable: {
        alignItems: "center",
        flexDirection: "row",
        gap: contactSpace.badgeIconGap,
        paddingHorizontal: contactSpace.badgePaddingHorizontal,
        paddingVertical: contactSpace.badgePaddingVertical,
    },
});
