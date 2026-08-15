import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";

import { snackUrl } from "@/constants/snack";
import { colors } from "@/theme/colors";
import { demoSpace } from "@/theme/spacing";
import type { DemoSectionProps } from "@/types/demo";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";
import { shouldRenderSnackEmbed } from "@/utils/snack";

import { DemoIntro } from "./DemoIntro";
import { DemoPitchCard } from "./DemoPitchCard";
import { DemoSnackCard } from "./DemoSnackCard";

export const DemoSection = ({ onTalkToMePress }: DemoSectionProps) => {
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);
    const shouldRenderIframe = shouldRenderSnackEmbed(Platform.OS, isCompact);
    const isNativeApp = Platform.OS !== "web";

    const paddingHorizontal = isCompact
        ? demoSpace.sectionPaddingHorizontalCompact
        : isNarrow
          ? demoSpace.sectionPaddingHorizontalNarrow
          : demoSpace.sectionPaddingHorizontalWide;
    const paddingVertical = isNarrow
        ? demoSpace.sectionPaddingVerticalNarrow
        : demoSpace.sectionPaddingVerticalWide;

    const sectionStyle = [
        styles.section,
        { paddingBottom: paddingVertical, paddingHorizontal, paddingTop: paddingVertical },
    ];

    const intro = <DemoIntro isMobileReader={!shouldRenderIframe} isNarrow={isNarrow} />;
    const pitchCard = <DemoPitchCard isNarrow={isNarrow} onTalkToMePress={onTalkToMePress} />;
    const snackCard = (
        <DemoSnackCard
            isNativeApp={isNativeApp}
            shouldRenderIframe={shouldRenderIframe}
            snackUrl={snackUrl}
        />
    );

    return (
        <View style={sectionStyle}>
            <View style={styles.column}>
                {isNarrow ? (
                    <>
                        {intro}
                        {snackCard}
                        {pitchCard}
                    </>
                ) : (
                    <>
                        <View style={styles.introRowWide}>
                            {intro}
                            {pitchCard}
                        </View>
                        {snackCard}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        gap: demoSpace.outerColumnGap,
    },
    introRowWide: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: demoSpace.introRowGap,
    },
    section: {
        alignSelf: "center",
        backgroundColor: colors.bg,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        maxWidth: demoSpace.containerMaxWidth,
        width: "100%",
    },
});
