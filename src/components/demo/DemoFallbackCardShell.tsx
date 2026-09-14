import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { demoSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { DemoFallbackCardShellProps } from "@/types/demo";

// Shared layout for the Snack card's non-iframe states. compact skips
// sizing to match the iframe's height - only the native-app card (no
// iframe at any width) wants that.
export const DemoFallbackCardShell = ({
    body,
    children,
    compact,
    label,
}: DemoFallbackCardShellProps) => {
    const cardStyle = [styles.card, !compact && styles.cardTall];

    return (
        <View style={cardStyle}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.body}>{body}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        ...typeScale.demoBody,
        color: colors.inkSecondary,
    },
    card: {
        alignItems: "flex-start",
        gap: demoSpace.fallbackCardGap,
        padding: demoSpace.fallbackCardPadding,
    },
    cardTall: {
        height: demoSpace.embedHeight,
        justifyContent: "center",
    },
    label: {
        ...typeScale.skillGroupLabel,
        color: colors.inkMuted,
    },
});
