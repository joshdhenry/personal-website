import { Platform, Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { focusRingSpace } from "@/theme/spacing";
import type { NavLinkProps } from "@/types/nav";

// StickyNav's links render inside a horizontal ScrollView, which clips
// anything extending past its own box on the cross axis - theme/focusRing's
// shared outline (drawn outside the element via outlineOffset) loses its
// top/bottom there, leaving only the left/right edges visible. An inset
// boxShadow draws within the element's own box instead, so it can't be
// clipped by an ancestor's overflow regardless of context.
const navLinkFocusRing = {
    boxShadow: `inset 0 0 0 ${focusRingSpace.outlineWidth}px ${colors.focusRing}`,
} as Record<string, unknown>;

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
    // isFocused (not just isActive) drives the color too: isActive alone is
    // hover/press only, which for a keyboard Enter/Space activation is a
    // single-frame flash (usePressHoverFocus's deferred release clears it on
    // the next tick) - imperceptible, so a keyboard user tabbing through
    // links saw no stable indication of which one they'd just activated.
    // Focus persists exactly as long as it's actually focused, correctly
    // moving (and un-highlighting the previous link) as Tab moves it.
    const textStyle = [
        labelStyle,
        { color: isActive || isFocused ? colors.primary : defaultColor },
        showFocusRing && navLinkFocusRing,
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
