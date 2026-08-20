import { Linking, Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { usePressHoverFocus } from "@/hooks/usePressHoverFocus";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import { motion } from "@/theme/motion";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { contactSpace, demoSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { DemoExternalLinkBadgeProps } from "@/types/demo";

// Same Android elevation-clips-rounded-children issue documented in
// hero/ActionBadge.tsx - the hover/press shadow is web-only.
const isHoverShadowSupported = Platform.OS === "web";

export const DemoExternalLinkBadge = ({
    accessibilityLabel,
    label,
    url,
}: DemoExternalLinkBadgeProps) => {
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

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // The OS may not have a handler for this URL (a broken or unexpected
    // scheme); there's no status UI on a link badge to surface that to, so
    // the rejection is swallowed rather than left unhandled.
    const handlePress = () => {
        Linking.openURL(url).catch(() => {});
    };

    const showFocusRing = Platform.OS === "web" && isFocused;
    const badgeAnimatedStyle = [
        styles.badge,
        isActive && styles.badgeActive,
        isActive && isHoverShadowSupported && shadow.badgeHover,
        showFocusRing && focusRing,
        animatedStyle,
    ];
    const labelStyle = [styles.label, isActive && styles.labelActive];

    return (
        <Animated.View style={badgeAnimatedStyle}>
            <Pressable
                accessibilityLabel={accessibilityLabel}
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
                <Text style={labelStyle}>{label}</Text>
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
    label: {
        ...typeScale.badgeLabel,
        color: colors.ink,
    },
    labelActive: {
        color: colors.primary,
    },
    pressable: {
        alignItems: "center",
        flexDirection: "row",
        gap: demoSpace.externalLinkBadgeGap,
        paddingHorizontal: contactSpace.badgePaddingHorizontal,
        paddingVertical: contactSpace.badgePaddingVertical,
    },
});
