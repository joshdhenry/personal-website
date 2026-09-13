import { Text } from "react-native";

import { chromeBarLabelStyle } from "@/components/shared/ChromeBarShell";
import {
    demoFallbackBody,
    demoFallbackLabel,
    demoNoSnackMobileText,
    demoOpenSnackLabel,
} from "@/data/demo";
import type { DemoSnackFallbackCardProps } from "@/types/demo";

import { DemoExternalLinkBadge } from "./DemoExternalLinkBadge";
import { DemoFallbackCardShell } from "./DemoFallbackCardShell";

export const DemoSnackFallbackCard = ({ hasSnack, snackUrl }: DemoSnackFallbackCardProps) => (
    <DemoFallbackCardShell body={demoFallbackBody} label={demoFallbackLabel}>
        {hasSnack ? (
            <DemoExternalLinkBadge
                accessibilityLabel={demoOpenSnackLabel}
                label={demoOpenSnackLabel}
                url={snackUrl}
            />
        ) : (
            // chromeBarLabelStyle (colors.inkMuted), not the design's
            // colors.inkFaint - inkFaint is 1.89:1 on colors.surface, well
            // under WCAG AA's 4.5:1 minimum for this text size.
            <Text style={chromeBarLabelStyle}>{demoNoSnackMobileText}</Text>
        )}
    </DemoFallbackCardShell>
);
