import { StyleSheet, View } from "react-native";

import { colors } from "@/theme/colors";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ChromeBarShellProps } from "@/types/shared";

// Shared chrome-bar shell for the hero terminal and the Demo section's Snack
// embed - both are a header strip above a "device" surface. No default for
// hideFromAccessibility: the hero terminal's path/shell labels and
// traffic-light dots are decorative flavor (true), but the Demo Snack chrome
// bar's "live editor" status conveys real state a screen reader shouldn't
// have hidden from it (false) - a future caller has to make this call
// explicitly rather than silently inheriting whichever caller came first.
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
