import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { radius } from "@/theme/radii";
import { contactSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ContactSubmitButtonProps } from "@/types/contact";

export const ContactSubmitButton = ({ isDisabled, label, onPress }: ContactSubmitButtonProps) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const setActive = (active: boolean) => {
        scale.value = withSpring(active && !isDisabled ? 0.97 : 1, motion.spring.snappy);
    };

    const handleHoverIn = () => setActive(true);
    const handleHoverOut = () => setActive(false);
    const handlePressIn = () => setActive(true);
    const handlePressOut = () => setActive(false);

    const buttonStyle = [styles.button, isDisabled && styles.buttonDisabled, animatedStyle];

    return (
        <Animated.View style={buttonStyle}>
            <Pressable
                accessibilityLabel={label}
                accessibilityRole="button"
                disabled={isDisabled}
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.pressable}
            >
                <Text style={styles.label}>{label}</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-start",
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    label: {
        ...typeScale.contactSubmitLabel,
        color: colors.surface,
    },
    pressable: {
        paddingHorizontal: contactSpace.submitButtonPaddingHorizontal,
        paddingVertical: contactSpace.submitButtonPaddingVertical,
    },
});
