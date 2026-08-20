import {
    demoNativeAppBody,
    demoNativeAppLabel,
    demoOpenWebsiteLabel,
    demoWebsiteUrl,
} from "@/data/demo";

import { DemoExternalLinkBadge } from "./DemoExternalLinkBadge";
import { DemoFallbackCardShell } from "./DemoFallbackCardShell";

export const DemoNativeAppCard = () => (
    <DemoFallbackCardShell body={demoNativeAppBody} compact label={demoNativeAppLabel}>
        <DemoExternalLinkBadge
            accessibilityLabel={demoOpenWebsiteLabel}
            label={demoOpenWebsiteLabel}
            url={demoWebsiteUrl}
        />
    </DemoFallbackCardShell>
);
