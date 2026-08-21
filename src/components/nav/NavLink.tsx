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
    // isSelected (not isFocused) drives the persistent color: isFocused is
    // "you're currently tabbed onto this," which fires for every link you
    // pass through, not just the one you activate - using it for color made
    // merely tabbing over a link look identical to having selected it.
    // isSelected instead reflects which section is actually in view right
    // now (index.tsx's scroll-spy, passed down through StickyNav), so the
    // ring shows where keyboard focus currently is while the color tracks
    // what you're actually looking at - including as you scroll manually,
    // not just right after a click/Enter/Space activation.
    const textStyle = [
        labelStyle,
        { color: isActive || isSelected ? colors.primary : defaultColor },
        showFocusRing && insetFocusRing,
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
                style={suppressNativeFocusOutline}
            >
                <Text style={textStyle}>{label}</Text>
            </Pressable>
        </Animated.View>
    );
};
