import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { focusRing } from "@/theme/focusRing";
import { typeScale } from "@/theme/typography";
import type { FooterSourceLinkProps } from "@/types/footer";
import { openUrl } from "@/utils/openUrl";

export const FooterSourceLink = ({ accessibilityLabel, href, label }: FooterSourceLinkProps) => {
    const {
        animatedStyle,
        onBlur,
        onFocus,
        onHoverIn,
        onHoverOut,
        onPressIn,
        onPressOut,
        isActive,
        isFocused,
    } = usePressScale();

    const onPress = () => openUrl(href);

    const showFocusRing = Platform.OS === "web" && isFocused;
    const labelStyle = [styles.label, isActive && styles.labelActive, showFocusRing && focusRing];

    // "button", not "link": no real <a href> here - see NavLink.tsx.
    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
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
