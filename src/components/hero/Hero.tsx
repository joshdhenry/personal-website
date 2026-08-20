import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
    heroActionBadges,
    heroEyebrowLabel,
    heroHeadline,
    heroIntroParagraph,
    heroOpenToWorkLabel,
    heroStats,
    heroTechLogRows,
    heroTerminalCommandText,
    heroTerminalPathLabel,
    heroTerminalShellLabel,
} from "@/data/heroContent";
import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { heroSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { HeroProps } from "@/types/hero";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";

import { ActionBadgeRow } from "./ActionBadgeRow";
import { StatusEyebrow } from "./StatusEyebrow";
import { TerminalCard } from "./TerminalCard";

export const Hero = ({ scrollY }: HeroProps) => {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);

    const headlineRiseStyle = useRiseEntrance(motion.delay.riseHeadline);
    const introRiseStyle = useRiseEntrance(motion.delay.riseIntro);

    const headlineTypeStyle = isCompact
        ? typeScale.heroHeadlineCompact
        : isNarrow
          ? typeScale.heroHeadlineNarrow
          : typeScale.heroHeadline;
    const paddingHorizontal = isCompact
        ? heroSpace.sectionPaddingHorizontalCompact
        : isNarrow
          ? heroSpace.sectionPaddingHorizontalNarrow
          : heroSpace.sectionPaddingHorizontalWide;
    // The Hero is the first thing on screen, above the sticky nav's own
    // safe-area handling (which only applies once the nav reveals past
    // 560px of scroll) - Math.max so a device's status bar/notch inset only
    // adds space when it genuinely exceeds the design's own top padding,
    // never stacking on top of it.
    const paddingTop = Math.max(
        insets.top,
        isNarrow ? heroSpace.sectionPaddingTopNarrow : heroSpace.sectionPaddingTopWide,
    );
    const paddingBottom = isNarrow
        ? heroSpace.sectionPaddingBottomNarrow
        : heroSpace.sectionPaddingBottomWide;

    const sectionStyle = [styles.section, { paddingBottom, paddingHorizontal, paddingTop }];
    const gridStyle = [styles.grid, isNarrow ? styles.gridNarrow : styles.gridWide];
    const leftColumnStyle = [styles.column, isNarrow ? styles.columnFull : styles.columnLeft];
    const rightColumnStyle = [styles.column, isNarrow ? styles.columnFull : styles.columnRight];
    const headlineStyle = [styles.headline, headlineTypeStyle, headlineRiseStyle];
    const introWrapStyle = [styles.introWrap, introRiseStyle];

    return (
        <View style={sectionStyle}>
            <View style={gridStyle}>
                <View style={leftColumnStyle}>
                    <StatusEyebrow
                        eyebrowLabel={heroEyebrowLabel}
                        openToWorkLabel={heroOpenToWorkLabel}
                    />

                    <Animated.Text accessibilityRole="header" style={headlineStyle}>
                        {heroHeadline}
                    </Animated.Text>

                    <Animated.View style={introWrapStyle}>
                        <Text style={styles.intro}>{heroIntroParagraph}</Text>
                    </Animated.View>

                    <ActionBadgeRow badges={heroActionBadges} isCompact={isCompact} />
                </View>

                <View style={rightColumnStyle}>
                    <TerminalCard
                        commandText={heroTerminalCommandText}
                        isNarrow={isNarrow}
                        pathLabel={heroTerminalPathLabel}
                        scrollY={scrollY}
                        shellLabel={heroTerminalShellLabel}
                        stats={heroStats}
                        techLogRows={heroTechLogRows}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        gap: heroSpace.columnGap,
        minWidth: 0,
    },
    columnFull: {
        width: "100%",
    },
    columnLeft: {
        flex: 1.05,
    },
    columnRight: {
        alignSelf: "stretch",
        flex: 0.95,
        justifyContent: "center",
    },
    grid: {
        alignItems: "center",
    },
    gridNarrow: {
        alignItems: "stretch",
        flexDirection: "column",
        gap: 40,
    },
    gridWide: {
        flexDirection: "row",
        gap: heroSpace.gridGap,
    },
    headline: {
        color: colors.ink,
    },
    intro: {
        ...typeScale.heroIntro,
        color: colors.inkMuted,
    },
    introWrap: {
        maxWidth: heroSpace.introMaxWidth,
    },
    section: {
        alignSelf: "center",
        backgroundColor: colors.bg,
        maxWidth: heroSpace.containerMaxWidth,
        width: "100%",
    },
});
