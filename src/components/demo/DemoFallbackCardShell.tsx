import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { demoSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { DemoFallbackCardShellProps } from "@/types/demo";

// Shared layout for the Snack card's non-iframe states: a mono eyebrow
// label, an explanatory paragraph, and a single action (an external-link
// badge or plain text) below. The narrow-web fallback stays sized to match
// where the Snack iframe would otherwise sit (compact omitted); the
// native-app card has no iframe to match at any width, so it passes
// compact to size to its own (much shorter) content instead of leaving a
// tall block of empty space.
export const DemoFallbackCardShell = ({
    body,
    children,
    compact,
    label,
}: DemoFallbackCardShellProps) => (
    <View style={[styles.card, !compact && styles.cardTall]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.body}>{body}</Text>
        {children}
    </View>
);

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
