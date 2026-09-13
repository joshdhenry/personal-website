import { StyleSheet, Text, View } from "react-native";

import { chromeBarLabelStyle, ChromeBarShell } from "@/components/shared/ChromeBarShell";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { demoSpace } from "@/theme/spacing";
import type { DemoSnackChromeBarProps } from "@/types/demo";

export const DemoSnackChromeBar = ({ label, liveEditorLabel }: DemoSnackChromeBarProps) => (
    <ChromeBarShell>
        <Text style={chromeBarLabelStyle}>{label}</Text>
        <View style={styles.liveEditor}>
            <View style={styles.liveEditorDot} />
            <Text style={[chromeBarLabelStyle, styles.liveEditorLabel]}>{liveEditorLabel}</Text>
        </View>
    </ChromeBarShell>
);

const styles = StyleSheet.create({
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
        color: colors.statusPassing,
    },
});
