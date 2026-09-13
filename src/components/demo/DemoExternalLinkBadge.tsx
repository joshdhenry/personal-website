import { StyleSheet } from "react-native";

import { ExternalLinkBadge } from "@/components/shared/ExternalLinkBadge";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { contactSpace, demoSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { DemoExternalLinkBadgeProps } from "@/types/demo";

export const DemoExternalLinkBadge = ({
    accessibilityLabel,
    label,
    url,
}: DemoExternalLinkBadgeProps) => (
    <ExternalLinkBadge
        accessibilityLabel={accessibilityLabel}
        badgeActiveStyle={styles.badgeActive}
        badgeStyle={styles.badge}
        label={label}
        labelActiveStyle={styles.labelActive}
        labelStyle={styles.label}
        pressableStyle={styles.pressable}
        url={url}
    />
);

const styles = StyleSheet.create({
    badge: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.imageBand,
        borderWidth: 1,
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
        alignItems: "center",
        flexDirection: "row",
        gap: demoSpace.externalLinkBadgeGap,
        paddingHorizontal: contactSpace.badgePaddingHorizontal,
        paddingVertical: contactSpace.badgePaddingVertical,
    },
});
