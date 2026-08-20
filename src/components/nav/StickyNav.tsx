import { useEffect } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { navLinks, navWordmarkLabel } from "@/data/nav";
import { useIsReducedMotionPreferred } from "@/hooks/useIsReducedMotionPreferred";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { navSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { StickyNavProps } from "@/types/nav";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";
import { shouldRevealNav } from "@/utils/scroll";

import { NavLink } from "./NavLink";

// True position: fixed has no RN equivalent, so this stays web-only, per
// designs/README.md's own RN note; native gets the same tint without blur.
const navBackground = Platform.select({
    web: {
        backdropFilter: `blur(${navSpace.backdropBlurRadius}px)`,
        backgroundColor: colors.navBackground,
    },
    default: {
        backgroundColor: colors.navBackground,
    },
});

export const StickyNav = ({ onHeightChange, onLinkPress, scrollY }: StickyNavProps) => {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);
    // The nav grows taller by insets.top (see rowStyle below), so the
    // hidden-state offset has to grow with it or the nav peeks out from
    // under the status bar while "hidden".
    const hiddenTranslateY = navSpace.hiddenTranslateY - insets.top;
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(hiddenTranslateY);

    // A withTiming animation targets hiddenTranslateY/opacity as they were
    // when the animation started; a device rotation mid-transition (which
    // changes insets.top, and so hiddenTranslateY) would otherwise let that
    // animation finish at a stale translateY while opacity keeps animating
    // on its own, visibly desyncing the two. Recomputing both directly
    // whenever hiddenTranslateY changes cancels any in-flight animation and
    // snaps both to the position/opacity matching the current insets and
    // reveal state, whether the nav is resting or mid-transition.
    useEffect(() => {
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
            // previouslyRevealed is null only on this reaction's very first
            // evaluation ever (Reanimated seeds it once per component
            // instance and never resets it on a deps change) - e.g. a
            // bfcache-restored page already past the reveal threshold. That
            // first evaluation should apply instantly, not animate a pop-in
            // for a state the nav should simply start in.
            const shouldAnimate = !isReducedMotionPreferred && previouslyRevealed !== null;

            if (!shouldAnimate) {
                opacity.value = nextOpacity;
                translateY.value = nextTranslateY;
                return;
            }

            opacity.value = withTiming(nextOpacity, { duration: motion.duration.navReveal });
            translateY.value = withTiming(nextTranslateY, { duration: motion.duration.navReveal });
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
    const rowPaddingHorizontal = isNarrow
        ? navSpace.rowPaddingHorizontalNarrow
        : navSpace.rowPaddingHorizontal;
    const linkGap = isCompact
        ? navSpace.linkGapCompact
        : isNarrow
          ? navSpace.linkGapNarrow
          : navSpace.linkGap;

    const rowStyle = [
        styles.row,
        {
            gap: navSpace.rowGap,
            paddingHorizontal: rowPaddingHorizontal,
            paddingTop: navSpace.rowPaddingVertical + insets.top,
        },
    ];
    const linksRowStyle = [styles.linksRow, { gap: linkGap }];
    const navAnimatedStyle = [styles.nav, navBackground, revealStyle];
    // The nav's rendered height (independent of its opacity/translateY reveal
    // state, which are transforms and don't affect layout) - reported up so
    // scrollToSection can land a section below the nav instead of under it.
    const handleLayout = (event: LayoutChangeEvent) =>
        onHeightChange(event.nativeEvent.layout.height);

    return (
        <Animated.View onLayout={handleLayout} style={navAnimatedStyle}>
            <View style={rowStyle}>
                <NavLink
                    accessibilityLabel={`${navWordmarkLabel}, scroll to top`}
                    defaultColor={colors.ink}
                    label={navWordmarkLabel}
                    labelStyle={typeScale.navWordmark}
                    onLinkPress={onLinkPress}
                    sectionId="top"
                />
                <View style={linksRowStyle}>
                    {navLinks.map((link) => (
                        <NavLink
                            accessibilityLabel={link.label}
                            defaultColor={colors.inkMuted}
                            key={link.id}
                            label={link.label}
                            labelStyle={linkLabelStyle}
                            onLinkPress={onLinkPress}
                            sectionId={link.sectionId}
                        />
                    ))}
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    linksRow: {
        alignItems: "center",
        flexDirection: "row",
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
