import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { radius } from "@/theme/radii";
import { shadow } from "@/theme/shadow";
import { projectsSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { FeaturedProjectCardProps } from "@/types/projects";

import { ProjectDetailField } from "./ProjectDetailField";
import { ProjectExpandAffordance } from "./ProjectExpandAffordance";
import { ProjectImageBand } from "./ProjectImageBand";
import { ProjectStackChips } from "./ProjectStackChips";

// Android clips a View's children to its background's rounded-corner outline
// once `elevation` is applied, so the hover/press shadow is web-only. See
// ActionBadge.tsx for the same guard and full rationale.
const isHoverShadowSupported = Platform.OS === "web";

const PRESS_SCALE = 0.97;
const LIFT_DISTANCE = 4;

export const FeaturedProjectCard = ({ project }: FeaturedProjectCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const scale = useSharedValue(1);
    const liftY = useSharedValue(0);
    const detailRiseStyle = useRiseEntrance(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateY: liftY.value }],
    }));

    const setActive = (active: boolean) => {
        setIsActive(active);
        scale.value = withSpring(active ? PRESS_SCALE : 1, motion.spring.snappy);
        liftY.value = withSpring(active ? -LIFT_DISTANCE : 0, motion.spring.snappy);
    };

    const handlePress = () => setIsOpen((previousIsOpen) => !previousIsOpen);
    const handleHoverIn = () => setActive(true);
    const handleHoverOut = () => setActive(false);
    const handlePressIn = () => setActive(true);
    const handlePressOut = () => setActive(false);

    const cardStyle = [
        styles.card,
        project.spansBothColumns && styles.cardSpanning,
        isActive && isHoverShadowSupported && shadow.projectCard,
        animatedStyle,
    ];
    const detailStyle = [styles.detail, detailRiseStyle];
    const accessibilityLabel = `${project.title}, ${project.subtitle}`;

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
                    <Animated.View style={detailStyle}>
                        <ProjectDetailField label="PROBLEM" value={project.problem} />
                        <ProjectDetailField label="WHAT I BUILT" value={project.whatIBuilt} />
                        <ProjectDetailField label="STACK" value={project.stackSentence} />
                        {project.outcome && (
                            <ProjectDetailField label="OUTCOME" value={project.outcome} />
                        )}
                    </Animated.View>
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
