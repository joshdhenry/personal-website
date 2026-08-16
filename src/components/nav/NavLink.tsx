import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { usePressHoverFocus } from "@/hooks/usePressHoverFocus";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { focusRingSpace } from "@/theme/spacing";
import type { NavLinkProps } from "@/types/nav";

export const NavLink = ({
    accessibilityLabel,
    defaultColor,
    label,
    labelStyle,
    onPress,
}: NavLinkProps) => {
    const scale = useSharedValue(1);
    const {
        handleBlur,
        handleFocus,
        handleHoverIn,
        handleHoverOut,
        handlePressIn,
        handlePressOut,
        isActive,
        isFocused,
    } = usePressHoverFocus((active) => {
        scale.value = withSpring(active ? 0.97 : 1, motion.spring.snappy);
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const showFocusRing = Platform.OS === "web" && isFocused;
    const textStyle = [
        labelStyle,
        { color: isActive ? colors.primary : defaultColor },
        showFocusRing && styles.focusRing,
    ];

    return (
        <Animated.View style={animatedStyle}>
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
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    focusRing: {
        // react-native-web-only style props for a visible keyboard focus ring.
        outlineColor: colors.focusRing,
        outlineOffset: focusRingSpace.outlineOffset,
        outlineStyle: "solid",
        outlineWidth: focusRingSpace.outlineWidth,
    } as Record<string, unknown>,
});
