import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import { shadow } from "@/theme/shadow";
import { typeScale } from "@/theme/typography";
import type { ExternalLinkBadgeProps } from "@/types/shared";
import { getExternalLinkAccessibilityRole, openUrl } from "@/utils/openUrl";
import { isHoverShadowSupported } from "@/utils/shadow";

// Shared skeleton for every Pressable badge that opens an external URL
// (hero's action badges, the Demo section's external link badges) - the
// press/hover/focus/shadow/accessibility wiring, and the active/label
// colors (identical at both current call sites), live here once instead of
// duplicated per caller, so a future fix to any of it can't silently apply
// to one badge and not the other. Each caller supplies only what actually
// varies between them: the badge's own shape (radius, padding, layout) via
// badgeStyle/pressableStyle, and an optional press/hover lift distance.
export const ExternalLinkBadge = ({
    accessibilityLabel,
    badgeStyle,
    label,
    liftDistance,
    pressableStyle,
    url,
}: ExternalLinkBadgeProps) => {
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
    } = usePressScale(liftDistance);

    const onPress = () => openUrl(url);

    const badgeAnimatedStyle = [
        badgeStyle,
        isActive && styles.badgeActive,
        isActive && isHoverShadowSupported(Platform.OS) && shadow.badgeHover,
        showFocusRing && focusRing,
        animatedStyle,
    ];
    const labelStyle = [styles.label, isActive && styles.labelActive];

    return (
        <Animated.View style={badgeAnimatedStyle}>
            <Pressable
                accessibilityLabel={accessibilityLabel}
                accessibilityRole={getExternalLinkAccessibilityRole(Platform.OS)}
                onBlur={onBlur}
                onFocus={onFocus}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={pressableStyle}
            >
                <Text style={labelStyle}>{label}</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
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
});
