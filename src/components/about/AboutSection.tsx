import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";

import {
    aboutHeading,
    aboutPersonalParagraph,
    aboutPortraitAlt,
    aboutPortraitSource,
    aboutProfessionalParagraph,
} from "@/data/about";
import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { aboutSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";

import { AboutPortrait } from "./AboutPortrait";

export const AboutSection = () => {
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);
    const headingRiseStyle = useRiseEntrance(motion.delay.riseAboutHeading);

    const paddingHorizontal = isCompact
        ? aboutSpace.sectionPaddingHorizontalCompact
        : isNarrow
          ? aboutSpace.sectionPaddingHorizontalNarrow
          : aboutSpace.sectionPaddingHorizontalWide;
    const paddingVertical = isNarrow
        ? aboutSpace.sectionPaddingVerticalNarrow
        : aboutSpace.sectionPaddingVerticalWide;

    const sectionStyle = [
        styles.section,
        { paddingBottom: paddingVertical, paddingHorizontal, paddingTop: paddingVertical },
    ];
    const rowStyle = [
        isNarrow ? styles.rowNarrow : styles.rowWide,
        { gap: isNarrow ? aboutSpace.gridGapNarrow : aboutSpace.gridGap },
    ];

    return (
        <View style={sectionStyle}>
            <View style={rowStyle}>
                <View style={styles.textColumn}>
                    <Animated.View style={headingRiseStyle}>
                        <Text accessibilityRole="header" style={styles.heading}>
                            {aboutHeading}
                        </Text>
                    </Animated.View>
                    <Text style={styles.paragraph}>{aboutProfessionalParagraph}</Text>
                    <Text style={styles.paragraph}>{aboutPersonalParagraph}</Text>
                </View>

                <AboutPortrait
                    alt={aboutPortraitAlt}
                    isNarrow={isNarrow}
                    source={aboutPortraitSource}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        ...typeScale.h2,
        color: colors.ink,
    },
    paragraph: {
        ...typeScale.aboutParagraph,
        color: colors.inkSecondary,
        maxWidth: aboutSpace.paragraphMaxWidth,
    },
    rowNarrow: {
        // Explicit stretch, matching Hero's gridNarrow, so the text column
        // deterministically fills the stacked width regardless of copy
        // length, rather than relying on flexbox's fit-content clamping.
        alignItems: "stretch",
        flexDirection: "column",
    },
    rowWide: {
        alignItems: "flex-start",
        flexDirection: "row",
    },
    section: {
        alignSelf: "center",
        backgroundColor: colors.bg,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        maxWidth: aboutSpace.containerMaxWidth,
        width: "100%",
    },
    textColumn: {
        flex: 1,
        gap: aboutSpace.textColumnGap,
    },
});
