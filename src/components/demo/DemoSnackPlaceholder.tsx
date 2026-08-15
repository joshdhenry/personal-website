import { Platform, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { demoSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { DemoSnackPlaceholderProps } from "@/types/demo";

// The diagonal stripe is decorative only, so native just gets a flat fill
// rather than an approximated repeating gradient.
const stripedBackground = Platform.select({
    web: {
        backgroundImage: `repeating-linear-gradient(135deg, ${colors.placeholderStripeLight} 0 10px, ${colors.bg} 10px 20px)`,
    },
    default: {
        backgroundColor: colors.bg,
    },
});

export const DemoSnackPlaceholder = ({ hint, label }: DemoSnackPlaceholderProps) => (
    <View style={[styles.placeholder, stripedBackground]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.hint}>{hint}</Text>
    </View>
);

const styles = StyleSheet.create({
    hint: {
        ...typeScale.demoPlaceholderHint,
        color: colors.inkMutedLight,
        maxWidth: demoSpace.placeholderHintMaxWidth,
        textAlign: "center",
    },
    label: {
        ...typeScale.demoPlaceholderLabel,
        color: colors.inkMuted,
    },
    placeholder: {
        alignItems: "center",
        gap: demoSpace.placeholderGap,
        height: demoSpace.embedHeight,
        justifyContent: "center",
        padding: demoSpace.placeholderPadding,
    },
});
