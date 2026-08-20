import type { CSSProperties } from "react";
import { StyleSheet, View } from "react-native";

import {
    demoChromeLabel,
    demoLiveEditorLabel,
    demoPlaceholderHint,
    demoPlaceholderLabel,
} from "@/data/demo";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { demoSpace } from "@/theme/spacing";
import type { DemoSnackCardProps } from "@/types/demo";
import { deriveSnackEmbedUrl } from "@/utils/snack";

import { DemoNativeAppCard } from "./DemoNativeAppCard";
import { DemoSnackChromeBar } from "./DemoSnackChromeBar";
import { DemoSnackFallbackCard } from "./DemoSnackFallbackCard";
import { DemoSnackPlaceholder } from "./DemoSnackPlaceholder";

// A real DOM <iframe> (only ever rendered when shouldRenderIframe is true,
// i.e. on wide web), not an RN primitive, so its style is a plain CSS object
// rather than an RN StyleSheet entry.
const iframeStyle: CSSProperties = {
    backgroundColor: colors.surface,
    border: 0,
    display: "block",
    height: demoSpace.embedHeight,
    width: "100%",
};

export const DemoSnackCard = ({
    isNativeApp,
    shouldRenderIframe,
    snackUrl,
}: DemoSnackCardProps) => {
    const embedUrl = deriveSnackEmbedUrl(snackUrl);
    const hasSnack = embedUrl.length > 0;

    return (
        <View style={[styles.card, shadow.terminalCard]}>
            {shouldRenderIframe ? (
                <>
                    <DemoSnackChromeBar
                        label={demoChromeLabel}
                        liveEditorLabel={demoLiveEditorLabel}
                    />
                    {hasSnack ? (
                        <iframe
                            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
                            src={embedUrl}
                            style={iframeStyle}
                            title="Expo Snack: joshhenry.info"
                        />
                    ) : (
                        <DemoSnackPlaceholder
                            hint={demoPlaceholderHint}
                            label={demoPlaceholderLabel}
                        />
                    )}
                </>
            ) : isNativeApp ? (
                <DemoNativeAppCard />
            ) : (
                <DemoSnackFallbackCard snackUrl={snackUrl} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        overflow: "hidden",
    },
});
