import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import {
    demoHeading,
    demoIntroParagraph,
    demoMobileHeading,
    demoMobileIntroParagraph,
    demoPlatformTag,
    demoSteps,
} from "@/data/demo";
import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { demoSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { DemoIntroProps } from "@/types/demo";

export const DemoIntro = ({ isMobileReader, isNarrow }: DemoIntroProps) => {
    const headingRiseStyle = useRiseEntrance(motion.delay.riseDemoHeading);
    const heading = isMobileReader ? demoMobileHeading : demoHeading;
    const paragraph = isMobileReader ? demoMobileIntroParagraph : demoIntroParagraph;
    const columnStyle = [styles.column, !isNarrow && styles.columnWide];

    return (
        <View style={columnStyle}>
            <Animated.View style={[styles.headingRow, headingRiseStyle]}>
                <Text accessibilityRole="header" style={styles.heading}>
                    {heading}
                </Text>
                <Text style={styles.platformTag}>{demoPlatformTag}</Text>
            </Animated.View>

            <Text style={styles.paragraph}>{paragraph}</Text>

            {isMobileReader ? null : (
                // role, not accessibilityRole: RN's AccessibilityRole type has
                // no "listitem" value, but the newer cross-platform role prop
                // does, and it's what a list needs its children tagged with
                // for a screen reader to announce item count/position.
                <View role="list" style={styles.steps}>
                    {demoSteps.map((step) => (
                        <View key={step.id} role="listitem" style={styles.step}>
                            <Text style={styles.stepNumber}>{step.number}</Text>
                            <Text style={styles.stepText}>{step.description}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        gap: demoSpace.introTextColumnGap,
    },
    columnWide: {
        flex: 1.05,
        minWidth: 0,
    },
    heading: {
        ...typeScale.h2,
        color: colors.ink,
    },
    headingRow: {
        alignItems: "baseline",
        flexDirection: "row",
        gap: demoSpace.headingRowGap,
    },
    paragraph: {
        ...typeScale.aboutParagraph,
        color: colors.inkSecondary,
        maxWidth: demoSpace.introParagraphMaxWidth,
    },
    platformTag: {
        ...typeScale.demoPlatformTag,
        color: colors.inkMutedLight,
    },
    step: {
        alignItems: "baseline",
        flexDirection: "row",
        gap: demoSpace.stepItemGap,
    },
    stepNumber: {
        ...typeScale.demoStepNumber,
        color: colors.primary,
        flexShrink: 0,
    },
    stepText: {
        ...typeScale.projectSubtitleAndBody,
        color: colors.inkSecondary,
    },
    steps: {
        gap: demoSpace.stepsGap,
        marginTop: demoSpace.stepsListTopMargin,
    },
});
