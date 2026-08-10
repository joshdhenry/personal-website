import { useState } from "react";
import { Linking, Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { typeScale } from "@/theme/typography";
import type { FooterSourceLinkProps } from "@/types/footer";

export const FooterSourceLink = ({ accessibilityLabel, href, label }: FooterSourceLinkProps) => {
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const setActive = (active: boolean) => {
        setIsActive(active);
        scale.value = withSpring(active ? 0.97 : 1, motion.spring.snappy);
    };

    const handlePress = () => Linking.openURL(href);
    const handleHoverIn = () => setActive(true);
    const handleHoverOut = () => setActive(false);
    const handlePressIn = () => setActive(true);
    const handlePressOut = () => setActive(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const showFocusRing = Platform.OS === "web" && isFocused;
    const labelStyle = [
        styles.label,
        isActive && styles.labelActive,
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
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Text style={labelStyle}>{label}</Text>
            </Pressable>
        </Animated.View>
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
    label: {
        ...typeScale.footerText,
        color: colors.primary,
    },
    labelActive: {
        color: colors.primaryHover,
        textDecorationLine: "underline",
    },
});
