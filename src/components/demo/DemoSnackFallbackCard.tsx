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
import { deriveSnackEmbedUrl } from "@/utils/snack";

import { DemoExternalLinkBadge } from "./DemoExternalLinkBadge";
import { DemoFallbackCardShell } from "./DemoFallbackCardShell";

export const DemoSnackFallbackCard = ({ snackUrl }: DemoSnackFallbackCardProps) => {
    // deriveSnackEmbedUrl doubles as validation here (it returns "" for a
    // malformed URL, same as an unset one) - matches DemoSnackCard's own
    // hasSnack check, so a bad snackUrl value falls back to plain text in
    // both places instead of a live-looking badge that fails on tap here.
    const hasSnack = deriveSnackEmbedUrl(snackUrl).length > 0;

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
    // colors.inkMuted, not colors.inkFaint - inkFaint is 1.89:1 on
    // colors.surface, well under WCAG AA's 4.5:1 minimum for this text size.
    noSnackText: {
        ...typeScale.chromeLabel,
        color: colors.inkMuted,
    },
});
