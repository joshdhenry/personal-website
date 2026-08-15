import { Platform, Pressable, StyleSheet, Text } from "react-native";

import { usePressHoverFocus } from "@/hooks/usePressHoverFocus";
import { colors } from "@/theme/colors";
import type { NavLinkProps } from "@/types/nav";

export const NavLink = ({
    accessibilityLabel,
    defaultColor,
    label,
    labelStyle,
    onPress,
}: NavLinkProps) => {
    const {
        handleBlur,
        handleFocus,
        handleHoverIn,
        handleHoverOut,
        handlePressIn,
        handlePressOut,
        isActive,
        isFocused,
    } = usePressHoverFocus();

    const showFocusRing = Platform.OS === "web" && isFocused;
    const textStyle = [
        labelStyle,
        { color: isActive ? colors.primary : defaultColor },
        showFocusRing && styles.focusRing,
    ];

    return (
        <Pressable
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="link"
            onBlur={handleBlur}
            onFocus={handleFocus}
            onHoverIn={handleHoverIn}
            onHoverOut={handleHoverOut}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Text style={textStyle}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    focusRing: {
        // react-native-web-only style props for a visible keyboard focus ring.
        outlineColor: colors.focusRing,
        outlineOffset: 2,
        outlineStyle: "solid",
        outlineWidth: 2,
    } as Record<string, unknown>,
});
