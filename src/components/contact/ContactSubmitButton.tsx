import { Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import { radius } from "@/theme/radii";
import { contactSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ContactSubmitButtonProps } from "@/types/contact";

export const ContactSubmitButton = ({ isDisabled, label, onPress }: ContactSubmitButtonProps) => {
    const {
        animatedStyle,
        onBlur,
        onFocus,
        onHoverIn,
        onHoverOut,
        onPressIn,
        onPressOut,
        showFocusRing,
    } = usePressScale();

    const buttonStyle = [
        styles.button,
        isDisabled && styles.buttonDisabled,
        showFocusRing && focusRing,
        animatedStyle,
    ];

    return (
        <Animated.View style={buttonStyle}>
            <Pressable
                accessibilityLabel={label}
                accessibilityRole="button"
                disabled={isDisabled}
                onBlur={onBlur}
                onFocus={onFocus}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
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
