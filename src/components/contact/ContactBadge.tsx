import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { contactSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ContactBadgeProps } from "@/types/contact";
import { openUrl } from "@/utils/openUrl";

// Same Android elevation-clips-rounded-children issue documented in
// hero/ActionBadge.tsx - the hover/press shadow is web-only.
const isHoverShadowSupported = Platform.OS === "web";

export const ContactBadge = ({ badge }: ContactBadgeProps) => {
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
    } = usePressScale(contactSpace.badgeLiftDistance);

    const handlePress = () => openUrl(badge.href);

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
