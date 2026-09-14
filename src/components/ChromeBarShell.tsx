import { StyleSheet, View } from "react-native";

import { colors } from "@/theme/colors";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ChromeBarShellProps } from "@/types/shared";

// Shared chrome-bar shell for the hero terminal and the Demo Snack card.
// hideFromAccessibility has no default - each caller states explicitly
// whether its content is decorative (hero) or real state (Snack status).
export const ChromeBarShell = ({ children, hideFromAccessibility }: ChromeBarShellProps) => (
    <View
        accessibilityElementsHidden={hideFromAccessibility}
        importantForAccessibility={hideFromAccessibility ? "no-hide-descendants" : "auto"}
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
