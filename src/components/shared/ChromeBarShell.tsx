import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/theme/colors";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";

// Shared chrome-bar shell for the hero terminal and the Demo section's Snack
// embed - both are a header strip above a "device" surface. hideFromAccessibility
// defaults to true (the hero terminal's path/shell labels and traffic-light
// dots are decorative flavor, not content) but the Demo Snack chrome bar
// passes false, since its "live editor" status conveys real state that a
// screen reader shouldn't have hidden from it the same way.
export const ChromeBarShell = ({
    children,
    hideFromAccessibility = true,
}: {
    children: ReactNode;
    hideFromAccessibility?: boolean;
}) => (
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
