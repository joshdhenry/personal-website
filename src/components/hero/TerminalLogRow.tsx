import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { typeScale } from "@/theme/typography";
import type { TerminalLogRowProps } from "@/types/hero";

export const TerminalLogRow = ({
    staggerDelayMilliseconds,
    techName,
    yearsLabel,
}: TerminalLogRowProps) => {
    const riseStyle = useRiseEntrance(staggerDelayMilliseconds);
    const rowAnimatedStyle = [styles.row, riseStyle];
    const rowAccessibilityLabel = `${techName}, ${yearsLabel}`;

    return (
        <Animated.View
            accessibilityLabel={rowAccessibilityLabel}
            accessible
            style={rowAnimatedStyle}
        >
            <Text importantForAccessibility="no-hide-descendants" style={styles.mark}>
                ·
            </Text>
            {/* flexShrink + a single line with a tail ellipsis keeps the row on
          one line and readable at any width, rather than letting the
          longest names (e.g. "JavaScript / TypeScript") push the row wider
          than the terminal card and get clipped by its overflow: hidden. */}
            <Text
                ellipsizeMode="tail"
                importantForAccessibility="no-hide-descendants"
                numberOfLines={1}
                style={styles.techName}
            >
                {techName}
            </Text>
            <View importantForAccessibility="no-hide-descendants" style={styles.leader} />
            <Text importantForAccessibility="no-hide-descendants" style={styles.years}>
                {yearsLabel}
            </Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    leader: {
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        borderStyle: "dotted",
        flex: 1,
        minWidth: 0,
    },
    mark: {
        ...typeScale.terminalLogRow,
        color: colors.inkMutedLight,
        flexShrink: 0,
    },
    row: {
        alignItems: "baseline",
        flexDirection: "row",
        gap: 10,
        paddingVertical: 3,
    },
    techName: {
        ...typeScale.terminalLogRow,
        color: colors.ink,
        flexShrink: 1,
    },
    years: {
        ...typeScale.terminalLogRow,
        color: colors.inkMuted,
        flexShrink: 0,
    },
});
