import Head from "expo-router/head";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { DemoSection } from "@/components/demo/DemoSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { StickyNav } from "@/components/nav/StickyNav";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ogImageUrl, siteUrl } from "@/constants/site";
import { navLinks } from "@/data/nav";
import { siteMetaDescription, siteMetaSiteName, siteMetaTitle } from "@/data/siteMeta";
import { useFontsLoaded } from "@/hooks/useFontsLoaded";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { navSpace } from "@/theme/spacing";
import type { SectionId, SectionOffsets } from "@/types/nav";
import {
    isAtScrollBottom,
    readInitialScrollState,
    resolveExtraBottomPadding,
} from "@/utils/scroll";
import { shouldGateOnFontsLoaded } from "@/utils/shouldGateOnFontsLoaded";

// Whichever section is last in nav order needs to clear the sticky nav on
// scroll (see extraBottomPadding below); derived so reordering navLinks
// can't silently break that.
const lastNavSectionId = navLinks[navLinks.length - 1].sectionId;

export default () => {
    const fontsLoaded = useFontsLoaded();
    const insets = useSafeAreaInsets();
    const { height: windowHeight } = useWindowDimensions();

    const scrollY = useSharedValue(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const sectionOffsets = useRef<SectionOffsets>({
        about: null,
        contact: null,
        demo: null,
        experience: null,
        projects: null,
        skills: null,
        top: 0,
    });
    // Real height, reported by StickyNav's onLayout once mounted;
    // navHeightFallback covers the gap before that first measurement.
    const [measuredNavHeight, setMeasuredNavHeight] = useState<number | null>(null);
    const navHeight = measuredNavHeight ?? navSpace.navHeightFallback + insets.top;
    // Latest-ref pattern (see useScrollSpy) so callbacks below stay stable
    // without depending on these values directly.
    const navHeightRef = useRef(navHeight);
    navHeightRef.current = navHeight;
    const windowHeightRef = useRef(windowHeight);
    windowHeightRef.current = windowHeight;
    // The ScrollView's real content height (Hero through Footer), excluding
    // extraBottomPadding below - a ref, not state, since only the resolved
    // padding itself needs to trigger a re-render.
    const contentHeightRef = useRef<number | null>(null);
    // lastNavSectionId needs windowHeight - navHeight of real content below
    // it to scroll flush under the nav, or the browser clamps short
    // (worse on wide/tall viewports). Reserves exactly that shortfall.
    const [extraBottomPadding, setExtraBottomPadding] = useState(0);
    // Functional setState keeps this callback stable (no dep array), so
    // onContentSizeChange/onContactLayout never rebind their listeners.
    const updateExtraBottomPadding = useCallback(() => {
        const contentHeight = contentHeightRef.current;
        if (contentHeight === null) {
            return;
        }

        setExtraBottomPadding((currentExtraBottomPadding) => {
            const naturalContentHeight = contentHeight - currentExtraBottomPadding;

            return resolveExtraBottomPadding(
                sectionOffsets.current[lastNavSectionId],
                navHeightRef.current,
                windowHeightRef.current,
                naturalContentHeight,
            );
        });
    }, []);
    const onContentSizeChange = useCallback(
        (_contentWidth: number, contentHeight: number) => {
            contentHeightRef.current = contentHeight;
            updateExtraBottomPadding();
        },
        [updateExtraBottomPadding],
    );
    useEffect(updateExtraBottomPadding, [navHeight, windowHeight, updateExtraBottomPadding]);
    const scrollToSection = useScrollToSection({
        navHeight,
        scrollViewRef,
        sectionOffsets,
    });
    const { currentSectionId, onLinkPress, onScrollBeginDrag, updateFromScroll } = useScrollSpy({
        navHeight,
        scrollToSection,
        scrollY,
        sectionOffsets,
    });

    // Gates StickyNav's mount below - its reveal reaction trusts its own
    // first evaluation, so it must not mount before scrollY is real.
    const [hasSyncedInitialScroll, setHasSyncedInitialScroll] = useState(Platform.OS !== "web");
    // A bfcache-restored page can start pre-scrolled with no onScroll event;
    // sync the real position once on mount. Web-only - no native equivalent.
    useEffect(() => {
        if (Platform.OS !== "web") {
            return;
        }

        const { isAtBottom, scrollTop } = readInitialScrollState(scrollViewRef.current);
        updateFromScroll(scrollTop, isAtBottom);
        setHasSyncedInitialScroll(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Plain JS onScroll: Animated.ScrollView's web ref lacks the imperative
    // .scrollTo() scrollToSection needs.
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const scrollOffset = contentOffset.y;
        const isAtBottom = isAtScrollBottom(
            scrollOffset,
            layoutMeasurement.height,
            contentSize.height,
        );
        updateFromScroll(scrollOffset, isAtBottom);
    };

    // A section's onLayout (ResizeObserver-backed on web) can fire well after
    // the mount-sync effect above (sectionOffsets is still empty there), and
    // again later (e.g. a project card expanding shifts its section's
    // height) - re-resolving the scroll-spy from the live scroll position
    // each time keeps it from getting stuck on a section whose neighbor's
    // offset simply hadn't measured yet when the last real onScroll fired.
    // Several sections can all report a fresh layout in the same frame (e.g.
    // every section on first mount), so the actual DOM read is deferred to
    // one rAF per frame instead of once per section.
    const syncFrameRef = useRef<number | null>(null);
    useEffect(() => {
        return () => {
            if (syncFrameRef.current !== null) {
                cancelAnimationFrame(syncFrameRef.current);
            }
        };
    }, []);
    const syncScrollSpyFromLayout = () => {
        if (Platform.OS !== "web" || syncFrameRef.current !== null) {
            return;
        }

        syncFrameRef.current = requestAnimationFrame(() => {
            syncFrameRef.current = null;
            const { isAtBottom, scrollTop } = readInitialScrollState(scrollViewRef.current);
            updateFromScroll(scrollTop, isAtBottom);
        });
    };

    const createOnSectionLayout = (sectionId: SectionId) => (event: LayoutChangeEvent) => {
        sectionOffsets.current[sectionId] = event.nativeEvent.layout.y;
        syncScrollSpyFromLayout();
        // Only lastNavSectionId's own offset feeds updateExtraBottomPadding -
        // no need to recompute it for every other section's layout pass too.
        if (sectionId === lastNavSectionId) {
            updateExtraBottomPadding();
        }
    };
    const onProjectsLayout = createOnSectionLayout("projects");
    const onSkillsLayout = createOnSectionLayout("skills");
    const onExperienceLayout = createOnSectionLayout("experience");
    const onAboutLayout = createOnSectionLayout("about");
    const onDemoLayout = createOnSectionLayout("demo");
    const onContactLayout = createOnSectionLayout("contact");

    // onLinkPress (not scrollToSection): gives the Demo CTA's scroll the
    // same pending-target guard nav links get, avoiding a flickering
    // sticky-nav highlight mid-scroll.
    const onTalkToMePress = useCallback(() => onLinkPress("contact"), [onLinkPress]);
    const contentPaddingBottom = insets.bottom + extraBottomPadding;
    const contentContainerStyle = [styles.content, { paddingBottom: contentPaddingBottom }];

    if (shouldGateOnFontsLoaded(Platform.OS, fontsLoaded)) {
        return <View style={styles.loadingPlaceholder} />;
    }

    return (
        <View style={styles.root}>
            <ScrollView
                contentContainerStyle={contentContainerStyle}
                onContentSizeChange={onContentSizeChange}
                onScroll={onScroll}
                onScrollBeginDrag={onScrollBeginDrag}
                ref={scrollViewRef}
                scrollEventThrottle={motion.scrollEventThrottleMs}
                style={styles.scrollView}
            >
                <Head>
                    <title>{siteMetaTitle}</title>
                    <meta content={siteMetaDescription} name="description" />
                    <meta content="website" property="og:type" />
                    <meta content={siteUrl} property="og:url" />
                    <meta content={siteMetaTitle} property="og:title" />
                    <meta content={siteMetaDescription} property="og:description" />
                    <meta content={ogImageUrl} property="og:image" />
                    <meta content="1200" property="og:image:width" />
                    <meta content="630" property="og:image:height" />
                    <meta content={siteMetaSiteName} property="og:site_name" />
                    <meta content="summary_large_image" name="twitter:card" />
                    <meta content={siteMetaTitle} name="twitter:title" />
                    <meta content={siteMetaDescription} name="twitter:description" />
                    <meta content={ogImageUrl} name="twitter:image" />
                </Head>
                <Hero scrollY={scrollY} />
                <View onLayout={onProjectsLayout}>
                    <ProjectsSection />
                </View>
                <View onLayout={onSkillsLayout}>
                    <SkillsSection />
                </View>
                <View onLayout={onExperienceLayout}>
                    <ExperienceSection />
                </View>
                <View onLayout={onAboutLayout}>
                    <AboutSection />
                </View>
                <View onLayout={onDemoLayout}>
                    <DemoSection onTalkToMePress={onTalkToMePress} />
                </View>
                <View onLayout={onContactLayout}>
                    <ContactSection />
                </View>
                <Footer />
            </ScrollView>

            {hasSyncedInitialScroll && (
                <StickyNav
                    currentSectionId={currentSectionId}
                    onHeightChange={setMeasuredNavHeight}
                    onLinkPress={onLinkPress}
                    scrollY={scrollY}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
    },
    loadingPlaceholder: {
        backgroundColor: colors.bg,
        flex: 1,
    },
    root: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: colors.bg,
        flex: 1,
    },
});
