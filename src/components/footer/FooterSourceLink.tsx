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
        handleBlur,
        handleFocus,
        handleHoverIn,
        handleHoverOut,
        handlePressIn,
        handlePressOut,
        isActive,
        isFocused,
    } = usePressScale();

    const handlePress = () => openUrl(href);

    const showFocusRing = Platform.OS === "web" && isFocused;
    const labelStyle = [styles.label, isActive && styles.labelActive, showFocusRing && focusRing];

    // "button" over the more semantically precise "link": this doesn't
    // render a real <a href>, and react-native-web's Pressable silently
    // drops keyboard Enter/Space activation for role="link" without one -
    // see NavLink.tsx for the full explanation.
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
