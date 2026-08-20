import { Platform, Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { usePressHoverFocus } from "@/hooks/usePressHoverFocus";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import { motion } from "@/theme/motion";
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
        showFocusRing && focusRing,
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
