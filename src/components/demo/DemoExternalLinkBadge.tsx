import { StyleSheet } from "react-native";

import { ExternalLinkBadge } from "@/components/ExternalLinkBadge";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { contactSpace, demoSpace } from "@/theme/spacing";
import type { DemoExternalLinkBadgeProps } from "@/types/demo";

export const DemoExternalLinkBadge = ({
    accessibilityLabel,
    label,
    url,
}: DemoExternalLinkBadgeProps) => (
    <ExternalLinkBadge
        accessibilityLabel={accessibilityLabel}
        badgeStyle={styles.badge}
        label={label}
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
    pressable: {
        alignItems: "center",
        flexDirection: "row",
        gap: demoSpace.externalLinkBadgeGap,
        paddingHorizontal: contactSpace.badgePaddingHorizontal,
        paddingVertical: contactSpace.badgePaddingVertical,
    },
});
