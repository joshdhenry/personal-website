import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/theme/colors";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";

// Shared chrome-bar shell for the hero terminal and the Demo section's Snack
// embed - both are a header strip above a "device" surface, hidden from
// assistive tech since it's decorative chrome, not content.
export const ChromeBarShell = ({ children }: { children: ReactNode }) => (
    <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.bar}
    >
        {children}
    </View>
);

export const chromeBarLabelStyle = {
    ...typeScale.chromeLabel,
    color: colors.inkMuted,
};

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
});
