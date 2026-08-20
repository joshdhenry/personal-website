import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { projectsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { CompactProjectCardProps } from "@/types/projects";

import { ProjectDetailReveal } from "./ProjectDetailReveal";
import { ProjectExpandAffordance } from "./ProjectExpandAffordance";
import { ProjectImageBand } from "./ProjectImageBand";

// Android clips a View's children to its background's rounded-corner outline
// once `elevation` is applied, so the hover/press shadow is web-only. See
// ActionBadge.tsx for the same guard and full rationale.
const isHoverShadowSupported = Platform.OS === "web";

export const CompactProjectCard = ({ project }: CompactProjectCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        animatedStyle,
        handleHoverIn,
        handleHoverOut,
        handlePressIn,
        handlePressOut,
        isActive,
    } = usePressScale(projectsSpace.cardLiftDistance);

    const handlePress = () => setIsOpen((previousIsOpen) => !previousIsOpen);

    const cardStyle = [
        styles.card,
        isActive && isHoverShadowSupported && shadow.projectCard,
        animatedStyle,
    ];
    const accessibilityLabel = `${project.title}, ${project.techLine}`;

    return (
        <Animated.View style={cardStyle}>
            <Pressable
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
                accessible
                aria-expanded={isOpen}
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <ProjectImageBand
                    alt={project.imageAlt}
                    hasFullBorder={false}
                    isWordmark={false}
                    source={project.image}
                />

                <View style={styles.body}>
                    <View style={styles.headerRow}>
                        <Text importantForAccessibility="no-hide-descendants" style={styles.title}>
                            {project.title}
                        </Text>
                        <ProjectExpandAffordance isOpen={isOpen} variant="compact" />
                    </View>

                    <Text importantForAccessibility="no-hide-descendants" style={styles.techLine}>
                        {project.techLine}
                    </Text>

                    {isOpen && (
                        <ProjectDetailReveal style={styles.detail}>
                            <Text
                                importantForAccessibility="no-hide-descendants"
                                style={styles.paragraph}
                            >
                                {project.paragraph}
                            </Text>
                        </ProjectDetailReveal>
                    )}
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    body: {
        gap: projectsSpace.compactBodyGap,
        paddingHorizontal: projectsSpace.compactBodyPaddingHorizontal,
        paddingVertical: projectsSpace.compactBodyPaddingVertical,
    },
    card: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        overflow: "hidden",
    },
    detail: {
        borderTopColor: colors.border,
        borderTopWidth: 1,
        gap: projectsSpace.compactDetailGap,
        marginTop: projectsSpace.compactDetailMarginTop,
        paddingTop: projectsSpace.compactDetailPaddingTop,
    },
    headerRow: {
        alignItems: "baseline",
        flexDirection: "row",
        gap: projectsSpace.compactHeaderGap,
        justifyContent: "space-between",
    },
    paragraph: {
        ...typeScale.projectSubtitleAndBody,
        color: colors.inkSecondary,
    },
    techLine: {
        ...typeScale.projectCompactTechLine,
        color: colors.inkMuted,
    },
    title: {
        ...typeScale.projectCompactTitle,
        color: colors.ink,
        flexShrink: 1,
    },
});
