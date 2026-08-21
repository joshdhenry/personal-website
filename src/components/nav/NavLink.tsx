import { Platform, Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { insetFocusRing, suppressNativeFocusOutline } from "@/theme/focusRing";
import type { NavLinkProps } from "@/types/nav";

export const NavLink = ({
    accessibilityLabel,
    defaultColor,
    isSelected,
    label,
    labelStyle,
    onLinkPress,
    sectionId,
}: NavLinkProps) => {
    const {
        animatedStyle,
        onBlur,
        onFocus,
        onHoverIn,
        onHoverOut,
        onPressIn,
        onPressOut,
        isActive,
        isFocused,
    } = usePressScale();

    const onPress = () => onLinkPress(sectionId);

    const showFocusRing = Platform.OS === "web" && isFocused;
    // isSelected (not isFocused) drives color: isFocused fires for every
    // link tabbed through, not just the one selected. isSelected reflects
    // the actual in-view section, so color tracks manual scrolling too.
    const textStyle = [
        labelStyle,
        { color: isActive || isSelected ? colors.primary : defaultColor },
        showFocusRing && insetFocusRing,
    ];

    // accessibilityRole="button" (not "link"): react-native-web only fires
    // a real <a>'s native keyboard Enter/Space activation for role="link",
    // and this isn't a real <a> (onLinkPress scrolls imperatively).
    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
                onBlur={onBlur}
                onFocus={onFocus}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={suppressNativeFocusOutline}
            >
                <Text style={textStyle}>{label}</Text>
            </Pressable>
        </Animated.View>
    );
};
