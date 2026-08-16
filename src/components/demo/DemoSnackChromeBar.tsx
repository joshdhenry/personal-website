import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { demoSpace, heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { DemoSnackChromeBarProps } from "@/types/demo";

export const DemoSnackChromeBar = ({ label, liveEditorLabel }: DemoSnackChromeBarProps) => (
    <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.bar}
    >
        <Text style={styles.label}>{label}</Text>
        <View style={styles.liveEditor}>
            <View style={styles.liveEditorDot} />
            <Text style={styles.liveEditorLabel}>{liveEditorLabel}</Text>
        </View>
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
    label: {
        ...typeScale.chromeLabel,
        color: colors.inkMuted,
    },
    liveEditor: {
        alignItems: "center",
        flexDirection: "row",
        gap: demoSpace.liveEditorGap,
    },
    liveEditorDot: {
        backgroundColor: colors.statusPassing,
        borderRadius: radius.pill,
        height: demoSpace.liveEditorDotSize,
        width: demoSpace.liveEditorDotSize,
    },
    liveEditorLabel: {
        ...typeScale.chromeLabel,
        color: colors.statusPassing,
    },
});
