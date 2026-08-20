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

// Android clips a View's children to its background's rounded-corner outline
// once `elevation` is applied (the outline provider used to cast the
// elevation shadow doubles as a clip mask). Toggling elevation on press on
// this badge's own rounded, bordered node was clipping its label text on
// Android. The hover/press shadow is decorative polish, so it's web-only
// (react-native-web's boxShadow doesn't have this clipping behavior).
const isHoverShadowSupported = Platform.OS === "web";

export const ActionBadge = ({ badge }: ActionBadgeProps) => {
    const {
        animatedStyle,
        handleBlur,
        handleFocus,
        handleHoverIn,
        handleHoverOut,
        handlePressIn,
        handlePressOut,
        isActive,
        isFocused,
    } = usePressScale(heroSpace.badgeLiftDistance);

    const handlePress = () => openUrl(badge.href);

    const showFocusRing = Platform.OS === "web" && isFocused;
    const badgeAnimatedStyle = [
        styles.badge,
        isActive && styles.badgeActive,
        isActive && isHoverShadowSupported && shadow.badgeHover,
        showFocusRing && focusRing,
        animatedStyle,
    ];
    const labelStyle = [styles.label, isActive && styles.labelActive];

    // "button" over the more semantically precise "link": this doesn't
    // render a real <a href>, and react-native-web's Pressable silently
    // drops keyboard Enter/Space activation for role="link" without one -
    // see NavLink.tsx for the full explanation.
    return (
        <Animated.View style={badgeAnimatedStyle}>
            <Pressable
                accessibilityLabel={badge.accessibilityLabel}
                accessibilityRole="button"
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
