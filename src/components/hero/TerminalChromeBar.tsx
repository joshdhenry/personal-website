import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { TerminalChromeBarProps } from "@/types/hero";

export const TerminalChromeBar = ({ pathLabel, shellLabel }: TerminalChromeBarProps) => (
    <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.bar}
    >
        <View style={styles.trafficLights}>
            <View style={styles.dotRed} />
            <View style={styles.dotYellow} />
            <View style={styles.dotGreen} />
        </View>
        <Text style={styles.label}>{pathLabel}</Text>
        <Text style={styles.label}>{shellLabel}</Text>
    </View>
);

const styles = StyleSheet.create({
    bar: {
        alignItems: "center",
        backgroundColor: colors.bg,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: heroSpace.terminalChromePaddingHorizontal,
        paddingVertical: heroSpace.terminalChromePaddingVertical,
    },
    dotGreen: {
        backgroundColor: colors.trafficLightGreen,
        borderRadius: radius.pill,
        height: 11,
        width: 11,
    },
    dotRed: {
        backgroundColor: colors.trafficLightRed,
        borderRadius: radius.pill,
        height: 11,
        width: 11,
    },
    dotYellow: {
        backgroundColor: colors.trafficLightYellow,
        borderRadius: radius.pill,
        height: 11,
        width: 11,
    },
    label: {
        ...typeScale.chromeLabel,
        color: colors.inkMuted,
    },
    trafficLights: {
        flexDirection: "row",
        gap: 8,
    },
});
