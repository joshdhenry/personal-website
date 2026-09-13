import {
    Platform,
    Pressable,
    Text,
    type StyleProp,
    type TextStyle,
    type ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { focusRing } from "@/theme/focusRing";
import { shadow } from "@/theme/shadow";
import { getExternalLinkAccessibilityRole, openUrl } from "@/utils/openUrl";
import { isHoverShadowSupported } from "@/utils/shadow";

type ExternalLinkBadgeProps = {
    accessibilityLabel: string;
    badgeActiveStyle: StyleProp<ViewStyle>;
    badgeStyle: StyleProp<ViewStyle>;
    label: string;
    labelActiveStyle: StyleProp<TextStyle>;
    labelStyle: StyleProp<TextStyle>;
    liftDistance?: number;
    pressableStyle: StyleProp<ViewStyle>;
    url: string;
};

// Shared skeleton for every Pressable badge that opens an external URL
// (hero's action badges, the Demo section's external link badges) - the
// press/hover/focus/shadow/accessibility wiring lives here once instead of
// duplicated per caller, so a future fix to any of it can't silently apply
// to one badge and not the other. Each caller supplies its own visual
// tokens (radius, padding, lift distance) via style props, so this makes no
// assumption about how either badge should actually look.
export const ExternalLinkBadge = ({
    accessibilityLabel,
    badgeActiveStyle,
    badgeStyle,
    label,
    labelActiveStyle,
    labelStyle,
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
        isActive && badgeActiveStyle,
        isActive && isHoverShadowSupported(Platform.OS) && shadow.badgeHover,
        showFocusRing && focusRing,
        animatedStyle,
    ];
    const textStyle = [labelStyle, isActive && labelActiveStyle];

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
                <Text style={textStyle}>{label}</Text>
            </Pressable>
        </Animated.View>
    );
};
