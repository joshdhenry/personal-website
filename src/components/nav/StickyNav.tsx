import { useEffect, useRef, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { navLinks, navNameLabel } from "@/data/nav";
import { useIsReducedMotionPreferred } from "@/hooks/useIsReducedMotionPreferred";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { navSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { StickyNavProps } from "@/types/nav";
import { getNavBackground } from "@/utils/nav";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";
import { shouldRevealNav } from "@/utils/scroll";

import { NavLink } from "./NavLink";

export const StickyNav = ({
    currentSectionId,
    onHeightChange,
    onLinkPress,
    scrollY,
}: StickyNavProps) => {
    const navBackground = getNavBackground(Platform.OS);
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);
    // Nav grows taller by insets.top, so the hidden offset must too, or it
    // peeks out under the status bar while "hidden".
    const hiddenTranslateY = navSpace.hiddenTranslateY - insets.top;
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(hiddenTranslateY);
    const hasMountedRef = useRef(false);

    // A rotation mid-animation changes hiddenTranslateY; recomputing snaps
    // both values to the current insets instead of an in-flight animation
    // finishing stale. Skips the initial mount - the reaction below seeds that.
    useEffect(() => {
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            return;
        }

        const shouldReveal = shouldRevealNav(scrollY.value, motion.navRevealScrollY);
        translateY.value = shouldReveal ? 0 : hiddenTranslateY;
        opacity.value = shouldReveal ? 1 : 0;
    }, [hiddenTranslateY, scrollY, translateY, opacity]);

    useAnimatedReaction(
        () => shouldRevealNav(scrollY.value, motion.navRevealScrollY),
        (shouldReveal, previouslyRevealed) => {
            if (shouldReveal === previouslyRevealed) {
                return;
            }

            const nextOpacity = shouldReveal ? 1 : 0;
            const nextTranslateY = shouldReveal ? 0 : hiddenTranslateY;
            // previouslyRevealed is null only on the reaction's true first
            // evaluation (e.g. a bfcache-restored page past the threshold) -
            // that state should apply instantly, not animate a pop-in.
            const shouldAnimate = !isReducedMotionPreferred && previouslyRevealed !== null;

            if (!shouldAnimate) {
                opacity.value = nextOpacity;
                translateY.value = nextTranslateY;
                return;
            }

            opacity.value = withSpring(nextOpacity, motion.spring.gentle);
            translateY.value = withSpring(nextTranslateY, motion.spring.gentle);
        },
        [isReducedMotionPreferred, hiddenTranslateY],
    );

    const revealStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        pointerEvents: opacity.value > 0 ? "auto" : "none",
        transform: [{ translateY: translateY.value }],
    }));

    const linkLabelStyle = isCompact
        ? typeScale.navLinkCompact
        : isNarrow
          ? typeScale.navLinkNarrow
          : typeScale.navLink;
    const rowPaddingHorizontal = isCompact
        ? navSpace.rowPaddingHorizontalCompact
        : isNarrow
          ? navSpace.rowPaddingHorizontalNarrow
          : navSpace.rowPaddingHorizontal;
    const rowGap = isCompact ? navSpace.rowGapCompact : navSpace.rowGap;
    const linkGap = isCompact
        ? navSpace.linkGapCompact
        : isNarrow
          ? navSpace.linkGapNarrow
          : navSpace.linkGap;

    const rowPaddingTop = navSpace.rowPaddingVertical + insets.top;
    const rowStyle = [
        styles.row,
        { gap: rowGap, paddingHorizontal: rowPaddingHorizontal, paddingTop: rowPaddingTop },
    ];
    // flexShrink isn't cross-platform reliable on ScrollView, so width is
    // computed explicitly once the name label renders; flexShrink is the
    // one-frame fallback before that.
    const [navNameWidth, setNavNameWidth] = useState(0);
    const onNavNameLayout = (event: LayoutChangeEvent) => {
        setNavNameWidth(event.nativeEvent.layout.width);
    };
    const containerWidth = Math.min(width, navSpace.containerMaxWidth);
    const rowContentWidth = containerWidth - rowPaddingHorizontal * 2;
    const availableLinksWidth =
        navNameWidth > 0 ? Math.max(0, rowContentWidth - navNameWidth - rowGap) : undefined;
    const linksScrollStyle = [
        styles.linksScroll,
        availableLinksWidth !== undefined && { maxWidth: availableLinksWidth },
    ];
    const linksContentStyle = [
        styles.linksRow,
        { gap: linkGap, paddingRight: rowPaddingHorizontal },
    ];
    const navAnimatedStyle = [styles.nav, navBackground, revealStyle];

    // Reports the real rendered height so index.tsx can scroll/highlight
    // precisely, instead of relying only on navSpace's fallback estimate.
    const onNavLayout = (event: LayoutChangeEvent) => {
        onHeightChange(event.nativeEvent.layout.height);
    };

    return (
        <Animated.View onLayout={onNavLayout} style={navAnimatedStyle}>
            <View style={rowStyle}>
                <View onLayout={onNavNameLayout}>
                    <NavLink
                        accessibilityLabel={`${navNameLabel}, scroll to top`}
                        defaultColor={colors.ink}
                        isSelected={currentSectionId === "top"}
                        label={navNameLabel}
                        labelStyle={typeScale.navName}
                        onLinkPress={onLinkPress}
                        sectionId="top"
                    />
                </View>
                <ScrollView
                    contentContainerStyle={linksContentStyle}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={linksScrollStyle}
                >
                    {navLinks.map((link) => (
                        <NavLink
                            accessibilityLabel={link.label}
                            defaultColor={colors.inkMuted}
                            isSelected={currentSectionId === link.sectionId}
                            key={link.sectionId}
                            label={link.label}
                            labelStyle={linkLabelStyle}
                            onLinkPress={onLinkPress}
                            sectionId={link.sectionId}
                        />
                    ))}
                </ScrollView>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    linksRow: {
        alignItems: "center",
        flexDirection: "row",
    },
    linksScroll: {
        flexShrink: 1,
    },
    nav: {
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: navSpace.stackOrder,
    },
    row: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: navSpace.containerMaxWidth,
        paddingVertical: navSpace.rowPaddingVertical,
        width: "100%",
    },
});
