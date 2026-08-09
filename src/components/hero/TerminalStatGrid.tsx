import { StyleSheet, View } from "react-native";

import { colors } from "@/theme/colors";
import type { TerminalStatGridProps } from "@/types/hero";

import { TerminalStatPanel } from "./TerminalStatPanel";

export const TerminalStatGrid = ({ stats }: TerminalStatGridProps) => (
    <View style={styles.grid}>
        {stats.map((stat, index) => (
            <TerminalStatPanel
                borderRight={index % 2 === 0}
                borderTop={index >= 2}
                finalValue={stat.finalValue}
                key={stat.id}
                label={stat.label}
                suffix={stat.suffix}
            />
        ))}
    </View>
);

const styles = StyleSheet.create({
    grid: {
        backgroundColor: colors.bg,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
