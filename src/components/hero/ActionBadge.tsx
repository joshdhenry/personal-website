import { StyleSheet } from "react-native";

import { ExternalLinkBadge } from "@/components/ExternalLinkBadge";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { heroSpace } from "@/theme/spacing";
import type { ActionBadgeProps } from "@/types/hero";

export const ActionBadge = ({ badge }: ActionBadgeProps) => (
    <ExternalLinkBadge
        accessibilityLabel={badge.accessibilityLabel}
        badgeStyle={styles.badge}
        label={badge.label}
        liftDistance={heroSpace.badgeLiftDistance}
        pressableStyle={styles.pressable}
        url={badge.href}
    />
);

const styles = StyleSheet.create({
    badge: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        flexShrink: 0,
    },
    pressable: {
        paddingHorizontal: heroSpace.badgePaddingHorizontal,
        paddingVertical: heroSpace.badgePaddingVertical,
    },
});
