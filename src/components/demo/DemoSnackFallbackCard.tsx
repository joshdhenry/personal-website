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
            <Text style={chromeBarLabelStyle}>{demoNoSnackMobileText}</Text>
        )}
    </DemoFallbackCardShell>
);
