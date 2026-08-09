import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { motion } from "@/theme/motion";
import { heroSpace } from "@/theme/spacing";
import type { ActionBadgeRowProps } from "@/types/hero";

import { ActionBadge } from "./ActionBadge";

export const ActionBadgeRow = ({ badges, isCompact }: ActionBadgeRowProps) => {
    const riseStyle = useRiseEntrance(motion.delay.riseBadgeRow);
    // At compact phone widths, three badges sharing one row leaves each only
    // ~100px, which is marginal for a word like "LinkedIn" set in a wide
    // monospace face — the badge can end up sized right at the edge of its
    // label's rendered width and clip a pixel or two on some platforms.
    // Stacking removes the squeeze entirely: each badge gets the full row
    // width to itself.
    const rowStyle = [styles.row, isCompact && styles.rowCompact, riseStyle];

    return (
        <Animated.View style={rowStyle}>
            {badges.map((badge) => (
                <ActionBadge badge={badge} key={badge.id} />
            ))}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: heroSpace.badgeGap,
    },
    rowCompact: {
        alignItems: "flex-start",
        flexDirection: "column",
    },
});
