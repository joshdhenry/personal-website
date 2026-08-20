import { Platform, Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import type { NavLinkProps } from "@/types/nav";

export const NavLink = ({
    accessibilityLabel,
    defaultColor,
    label,
    labelStyle,
    onLinkPress,
    sectionId,
}: NavLinkProps) => {
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
    } = usePressScale();

    const handlePress = () => onLinkPress(sectionId);

    const showFocusRing = Platform.OS === "web" && isFocused;
    const textStyle = [
        labelStyle,
        { color: isActive ? colors.primary : defaultColor },
        showFocusRing && focusRing,
    ];

    // accessibilityRole="link" would read more precisely (this jumps to a
    // page section), but react-native-web's Pressable only fires onPress
    // from a keyboard Enter for role="link" if the underlying element is a
    // real <a href> - ours isn't (onLinkPress scrolls imperatively), so the
    // browser never dispatches the native click RNW is waiting for and
    // Enter/Space silently do nothing. "button" renders as a real <button>,
    // which gets genuine native keyboard activation.
    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
                onBlur={handleBlur}
                onFocus={handleFocus}
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Text style={textStyle}>{label}</Text>
            </Pressable>
        </Animated.View>
    );
};
