import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ActionBadgeProps } from "@/types/hero";
import { openUrl } from "@/utils/openUrl";

// Android clips a View's children to its rounded-corner outline once
// `elevation` is applied, clipping this badge's label text on press. The
// hover/press shadow is decorative polish, so it's web-only.
const isHoverShadowSupported = Platform.OS === "web";

export const ActionBadge = ({ badge }: ActionBadgeProps) => {
    const {
        animatedStyle,
        isActive,
        isFocused,
        onBlur,
        onFocus,
        onHoverIn,
        onHoverOut,
        onPressIn,
        onPressOut,
    } = usePressScale(heroSpace.badgeLiftDistance);

    const onPress = () => openUrl(badge.href);

    const showFocusRing = Platform.OS === "web" && isFocused;
    const badgeAnimatedStyle = [
        styles.badge,
        isActive && styles.badgeActive,
        isActive && isHoverShadowSupported && shadow.badgeHover,
        showFocusRing && focusRing,
        animatedStyle,
    ];
    const labelStyle = [styles.label, isActive && styles.labelActive];

    // "button", not "link": no real <a href> here - see NavLink.tsx.
    return (
        <Animated.View style={badgeAnimatedStyle}>
            <Pressable
                accessibilityLabel={badge.accessibilityLabel}
                accessibilityRole="button"
                onBlur={onBlur}
                onFocus={onFocus}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
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
