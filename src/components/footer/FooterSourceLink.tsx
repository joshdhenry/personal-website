import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import { typeScale } from "@/theme/typography";
import type { FooterSourceLinkProps } from "@/types/footer";
import { getExternalLinkAccessibilityRole, openUrl } from "@/utils/openUrl";

export const FooterSourceLink = ({ accessibilityLabel, href, label }: FooterSourceLinkProps) => {
    const {
        animatedStyle,
        isActive,
        onBlur,
        onFocus,
        onHoverIn,
        onHoverOut,
        onPressIn,
        onPressOut,
        showFocusRing,
    } = usePressScale();

    const onPress = () => openUrl(href);

    const labelStyle = [styles.label, isActive && styles.labelActive, showFocusRing && focusRing];

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                accessibilityLabel={accessibilityLabel}
                accessibilityRole={getExternalLinkAccessibilityRole(Platform.OS)}
                onBlur={onBlur}
                onFocus={onFocus}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Text style={labelStyle}>{label}</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    label: {
        ...typeScale.footerText,
        color: colors.primary,
    },
    labelActive: {
        color: colors.primaryHover,
        textDecorationLine: "underline",
    },
});
