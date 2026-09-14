import { StyleSheet, Text, View } from "react-native";

import { chromeBarLabelStyle, ChromeBarShell } from "@/components/ChromeBarShell";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import type { TerminalChromeBarProps } from "@/types/hero";

export const TerminalChromeBar = ({ pathLabel, shellLabel }: TerminalChromeBarProps) => (
    <ChromeBarShell hideFromAccessibility>
        <View style={styles.trafficLights}>
            <View style={styles.dotRed} />
            <View style={styles.dotYellow} />
            <View style={styles.dotGreen} />
        </View>
        <Text style={chromeBarLabelStyle}>{pathLabel}</Text>
        <Text style={chromeBarLabelStyle}>{shellLabel}</Text>
    </ChromeBarShell>
);

const styles = StyleSheet.create({
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
    trafficLights: {
        flexDirection: "row",
        gap: 8,
    },
});
