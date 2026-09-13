import { StyleSheet } from "react-native";

import { ExternalLinkBadge } from "@/components/shared/ExternalLinkBadge";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ActionBadgeProps } from "@/types/hero";

export const ActionBadge = ({ badge }: ActionBadgeProps) => (
    <ExternalLinkBadge
        accessibilityLabel={badge.accessibilityLabel}
        badgeActiveStyle={styles.badgeActive}
        badgeStyle={styles.badge}
        label={badge.label}
        labelActiveStyle={styles.labelActive}
        labelStyle={styles.label}
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
    badgeActive: {
        borderColor: colors.primary,
    },
    label: {
        ...typeScale.badgeLabel,
        color: colors.ink,
    },
    labelActive: {
        color: colors.primary,
    },
    pressable: {
        paddingHorizontal: heroSpace.badgePaddingHorizontal,
        paddingVertical: heroSpace.badgePaddingVertical,
    },
});
