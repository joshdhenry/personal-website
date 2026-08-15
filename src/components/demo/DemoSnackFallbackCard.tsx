import { StyleSheet, Text } from "react-native";

import {
    demoFallbackBody,
    demoFallbackLabel,
    demoNoSnackMobileText,
    demoOpenSnackLabel,
} from "@/data/demo";
import { colors } from "@/theme/colors";
import { typeScale } from "@/theme/typography";
import type { DemoSnackFallbackCardProps } from "@/types/demo";

import { DemoExternalLinkBadge } from "./DemoExternalLinkBadge";
import { DemoFallbackCardShell } from "./DemoFallbackCardShell";

export const DemoSnackFallbackCard = ({ snackUrl }: DemoSnackFallbackCardProps) => {
    const hasSnack = snackUrl.length > 0;

    return (
        <DemoFallbackCardShell body={demoFallbackBody} label={demoFallbackLabel}>
            {hasSnack ? (
                <DemoExternalLinkBadge
                    accessibilityLabel={demoOpenSnackLabel}
                    label={demoOpenSnackLabel}
                    url={snackUrl}
                />
            ) : (
                <Text style={styles.noSnackText}>{demoNoSnackMobileText}</Text>
            )}
        </DemoFallbackCardShell>
    );
};

const styles = StyleSheet.create({
    noSnackText: {
        ...typeScale.chromeLabel,
        color: colors.inkFaint,
    },
});
