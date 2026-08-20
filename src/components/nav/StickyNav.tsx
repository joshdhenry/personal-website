import { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
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
import type { SectionId, StickyNavProps } from "@/types/nav";
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

export const StickyNav = ({ onLinkPress, scrollY }: StickyNavProps) => {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);
    // The link a user last actually activated (click or Enter/Space), not
    // just tabbed onto - drives NavLink's persistent blue color. Keyboard
    // focus (which link the ring is on) is tracked independently inside
    // each NavLink via usePressHoverFocus, since it changes on every Tab
    // regardless of activation.
    const [selectedSectionId, setSelectedSectionId] = useState<SectionId | null>(null);
    const handleLinkPress = (sectionId: SectionId) => {
        setSelectedSectionId(sectionId);
        onLinkPress(sectionId);
    };
    // The nav grows taller by insets.top (see rowStyle below), so the
    // hidden-state offset has to grow with it or the nav peeks out from
    // under the status bar while "hidden".
    const hiddenTranslateY = navSpace.hiddenTranslateY - insets.top;
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(hiddenTranslateY);
    const hasMountedRef = useRef(false);

    // A withTiming animation targets hiddenTranslateY/opacity as they were
    // when the animation started; a device rotation mid-transition (which
    // changes insets.top, and so hiddenTranslateY) would otherwise let that
    // animation finish at a stale translateY while opacity keeps animating
    // on its own, visibly desyncing the two. Recomputing both directly
    // whenever hiddenTranslateY changes cancels any in-flight animation and
    // snaps both to the position/opacity matching the current insets and
    // reveal state, whether the nav is resting or mid-transition. The
    // reaction below already seeds the correct initial state on its own
    // first evaluation, so this effect skips its own mount-time run - its
    // job starts at the first hiddenTranslateY change after that.
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

    const rowStyle = [
        styles.row,
        {
            gap: rowGap,
            paddingHorizontal: rowPaddingHorizontal,
            paddingTop: navSpace.rowPaddingVertical + insets.top,
        },
    ];
    // Even with the tighter *Compact tokens above, the 5 links + wordmark
    // are right at the edge of fitting a real phone width - comfortable on
    // iPhone-class widths, tight-but-fitting down to ~380px, and still short
    // on the smallest/oldest Android widths or with large accessibility text
    // scaling. flexShrink: 1 lets this ScrollView give up space to the
    // wordmark instead of forcing an overflow; when it's squeezed narrower
    // than its content, the excess becomes horizontally scrollable rather
    // than clipped. Everywhere content already fits, it sizes to content and
    // never scrolls - visually identical to a plain row.
    const linksContentStyle = [
        styles.linksRow,
        { gap: linkGap, paddingRight: rowPaddingHorizontal },
    ];
    const navAnimatedStyle = [styles.nav, navBackground, revealStyle];

    return (
        <Animated.View style={navAnimatedStyle}>
            <View style={rowStyle}>
                <NavLink
                    accessibilityLabel={`${navWordmarkLabel}, scroll to top`}
                    defaultColor={colors.ink}
                    isSelected={selectedSectionId === "top"}
                    label={navWordmarkLabel}
                    labelStyle={typeScale.navWordmark}
                    onLinkPress={handleLinkPress}
                    sectionId="top"
                />
                <ScrollView
                    contentContainerStyle={linksContentStyle}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.linksScroll}
                >
                    {navLinks.map((link) => (
                        <NavLink
                            accessibilityLabel={link.label}
                            defaultColor={colors.inkMuted}
                            isSelected={selectedSectionId === link.sectionId}
                            key={link.sectionId}
                            label={link.label}
                            labelStyle={linkLabelStyle}
                            onLinkPress={handleLinkPress}
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
