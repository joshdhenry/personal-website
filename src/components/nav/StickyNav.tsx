import { Platform, StyleSheet, View } from "react-native";
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
import { shouldRevealNav } from "@/utils/scroll";

import { NavLink } from "./NavLink";

// True position: fixed has no RN equivalent, so this stays web-only, per
// designs/README.md's own RN note; native gets the same tint without blur.
const navBackground = Platform.select({
    web: {
        backdropFilter: "blur(12px)",
        backgroundColor: colors.navBackground,
    },
    default: {
        backgroundColor: colors.navBackground,
    },
});

export const StickyNav = ({ isCompact, isNarrow, onLinkPress, scrollY }: StickyNavProps) => {
    const insets = useSafeAreaInsets();
    // The nav grows taller by insets.top (see rowStyle below), so the
    // hidden-state offset has to grow with it or the nav peeks out from
    // under the status bar while "hidden".
    const hiddenTranslateY = navSpace.hiddenTranslateY - insets.top;
    const isReducedMotionPreferred = useIsReducedMotionPreferred();
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(hiddenTranslateY);

    useAnimatedReaction(
        () => shouldRevealNav(scrollY.value, motion.navRevealScrollY),
        (shouldReveal, previouslyRevealed) => {
            if (shouldReveal === previouslyRevealed) {
                return;
            }

            const nextOpacity = shouldReveal ? 1 : 0;
            const nextTranslateY = shouldReveal ? 0 : hiddenTranslateY;

            if (isReducedMotionPreferred) {
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
    const handleWordmarkPress = () => onLinkPress("top");
    const handleLinkPress = (sectionId: SectionId) => () => onLinkPress(sectionId);

    return (
        <Animated.View style={[styles.nav, navBackground, revealStyle]}>
            <View style={rowStyle}>
                <NavLink
                    accessibilityLabel={`${navWordmarkLabel}, scroll to top`}
                    defaultColor={colors.ink}
                    label={navWordmarkLabel}
                    labelStyle={typeScale.navWordmark}
                    onPress={handleWordmarkPress}
                />
                <View style={linksRowStyle}>
                    {navLinks.map((link) => (
                        <NavLink
                            accessibilityLabel={link.label}
                            defaultColor={colors.inkMuted}
                            key={link.id}
                            label={link.label}
                            labelStyle={linkLabelStyle}
                            onPress={handleLinkPress(link.sectionId)}
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
