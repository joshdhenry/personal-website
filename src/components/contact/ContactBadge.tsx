import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { contactSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ContactBadgeProps } from "@/types/contact";
import { getExternalLinkAccessibilityRole, openUrl } from "@/utils/openUrl";
import { isHoverShadowSupported } from "@/utils/shadow";

export const ContactBadge = ({ badge }: ContactBadgeProps) => {
    const {
        animatedStyle,
        isActive,
        onBlur,
        onFocus,
        onHoverIn,
        onHoverOut,
        onPressIn,
        onPressOut,
        showFocusRing,
    } = usePressScale(contactSpace.badgeLiftDistance);

    const onPress = () => openUrl(badge.href);

    const badgeAnimatedStyle = [
        styles.badge,
        isActive && styles.badgeActive,
        isActive && isHoverShadowSupported(Platform.OS) && shadow.badgeHover,
        showFocusRing && focusRing,
        animatedStyle,
    ];
    const labelStyle = [styles.label, isActive && styles.labelActive];
    const BadgeIcon = badge.icon;

    return (
        <Animated.View style={badgeAnimatedStyle}>
            <Pressable
                accessibilityLabel={badge.accessibilityLabel}
                accessibilityRole={getExternalLinkAccessibilityRole(Platform.OS)}
                onBlur={onBlur}
                onFocus={onFocus}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
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
