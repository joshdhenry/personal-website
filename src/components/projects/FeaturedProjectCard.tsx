import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { usePressScale } from "@/hooks/usePressScale";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { projectsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { FeaturedProjectCardProps } from "@/types/projects";
import { isHoverShadowSupported } from "@/utils/shadow";

import { ProjectDetailField } from "./ProjectDetailField";
import { ProjectDetailReveal } from "./ProjectDetailReveal";
import { ProjectExpandAffordance } from "./ProjectExpandAffordance";
import { ProjectImageBand } from "./ProjectImageBand";
import { ProjectStackChips } from "./ProjectStackChips";

export const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { animatedStyle, isActive, onHoverIn, onHoverOut, onPressIn, onPressOut } = usePressScale(
        projectsSpace.cardLiftDistance,
    );

    const onPress = () => setIsOpen((previousIsOpen) => !previousIsOpen);

    const cardStyle = [
        styles.card,
        project.spansBothColumns && styles.cardSpanning,
        isActive && isHoverShadowSupported(Platform.OS) && shadow.projectCard,
        animatedStyle,
    ];
    const accessibilityLabel = `${project.title}, ${project.subtitle}`;

    return (
        <Animated.View style={cardStyle}>
            <Pressable
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
                accessible
                aria-expanded={isOpen}
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <View style={styles.imageBandWrapper}>
                    <ProjectImageBand
                        alt={project.imageAlt}
                        hasFullBorder
                        isWordmark={project.isWordmarkImage}
                        source={project.image}
                    />
                </View>

                <View style={styles.headerRow}>
                    <View style={styles.titleBlock}>
                        <Text importantForAccessibility="no-hide-descendants" style={styles.title}>
                            {project.title}
                        </Text>
                        <Text
                            importantForAccessibility="no-hide-descendants"
                            style={styles.subtitle}
                        >
                            {project.subtitle}
                        </Text>
                    </View>
                    <ProjectExpandAffordance isOpen={isOpen} variant="featured" />
                </View>

                <ProjectStackChips chips={project.stackChips} />

                {isOpen && (
                    <ProjectDetailReveal style={styles.detail}>
                        <ProjectDetailField label="PROBLEM" value={project.problem} />
                        <ProjectDetailField label="WHAT I BUILT" value={project.whatIBuilt} />
                        <ProjectDetailField label="STACK" value={project.stackSentence} />
                        {project.outcome && (
                            <ProjectDetailField label="OUTCOME" value={project.outcome} />
                        )}
                    </ProjectDetailReveal>
                )}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        paddingHorizontal: projectsSpace.featuredCardPaddingHorizontal,
        paddingVertical: projectsSpace.featuredCardPaddingVertical,
    },
    cardSpanning: {
        width: "100%",
    },
    detail: {
        borderTopColor: colors.border,
        borderTopWidth: 1,
        gap: projectsSpace.detailGap,
        marginTop: projectsSpace.detailTopMargin,
        paddingTop: projectsSpace.detailTopPadding,
    },
    headerRow: {
        alignItems: "flex-start",
        flexDirection: "row",
        gap: projectsSpace.featuredHeaderGap,
        justifyContent: "space-between",
    },
    imageBandWrapper: {
        marginBottom: projectsSpace.imageBandMarginBottom,
    },
    subtitle: {
        ...typeScale.projectSubtitleAndBody,
        color: colors.inkMuted,
    },
    title: {
        ...typeScale.projectFeaturedTitle,
        color: colors.ink,
    },
    titleBlock: {
        flex: 1,
        gap: projectsSpace.titleBlockGap,
        minWidth: 0,
    },
});
