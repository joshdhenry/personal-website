import Head from "expo-router/head";
import { useEffect, useRef, useState } from "react";
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { StickyNav } from "@/components/nav/StickyNav";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { useFontsLoaded } from "@/hooks/useFontsLoaded";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { navSpace } from "@/theme/spacing";
import type { SectionId, SectionOffsets } from "@/types/nav";
import {
    isScrolledToBottom,
    readScrollableNodeScrollTop,
    resolveCurrentSectionId,
    scrollBottomEpsilonPx,
} from "@/utils/scroll";
import { shouldGateOnFontsLoaded } from "@/utils/shouldGateOnFontsLoaded";

export default () => {
    const fontsLoaded = useFontsLoaded();
    const insets = useSafeAreaInsets();

    const scrollY = useSharedValue(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const sectionOffsets = useRef<SectionOffsets>({
        about: null,
        contact: null,
        experience: null,
        projects: null,
        skills: null,
        top: 0,
    });
    const navHeightEstimate = navSpace.navHeightEstimate + insets.top;
    const scrollToSection = useScrollToSection({
        navHeightEstimate,
        scrollViewRef,
        sectionOffsets,
    });

    // The sticky nav's "current section" highlight (StickyNav.currentSectionId).
    // A ref alongside the state so handleScroll can compare against the
    // latest value without setState firing (and re-rendering StickyNav) on
    // every scroll frame - only on the frames where it actually changes.
    const [currentSectionId, setCurrentSectionId] = useState<SectionId>("top");
    const currentSectionIdRef = useRef<SectionId>("top");
    const updateCurrentSectionId = (scrollOffset: number, isAtBottom: boolean) => {
        const nextSectionId = resolveCurrentSectionId(
            scrollOffset,
            sectionOffsets.current,
            navHeightEstimate,
            isAtBottom,
        );
        if (nextSectionId !== currentSectionIdRef.current) {
            currentSectionIdRef.current = nextSectionId;
            setCurrentSectionId(nextSectionId);
        }
    };

    // scrollY starts at 0, but the browser (e.g. bfcache back/forward
    // navigation) can leave the ScrollView's underlying DOM node already
    // scrolled before any onScroll event reaches React - StickyNav would
    // then wrongly judge the nav should stay hidden. This reads the real
    // starting offset once on mount without moving the page, so it's a sync,
    // never a reset. Web-only: readScrollableNodeScrollTop reads DOM state
    // that has no equivalent on iOS/Android.
    useEffect(() => {
        if (Platform.OS !== "web") {
            return;
        }

        const scrollOffset = readScrollableNodeScrollTop(scrollViewRef.current);
        scrollY.value = scrollOffset;
        updateCurrentSectionId(scrollOffset, isScrolledToBottom(scrollViewRef.current));
        // Only ever needs to run once, on mount - scrollY and the update
        // function are stable/deliberately excluded so this doesn't re-fire
        // on every render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // A plain JS onScroll, not Animated.ScrollView + useAnimatedScrollHandler:
    // Animated.ScrollView's web ref doesn't support imperative .scrollTo(),
    // which scrollToSection below needs. Writing to a shared value from JS is
    // standard, documented Reanimated usage - the UI-thread worklet reading
    // scrollY.value (StickyNav's reveal) doesn't care whether the write came
    // from JS or UI thread.
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const scrollOffset = contentOffset.y;
        scrollY.value = scrollOffset;
        // The last section (Contact) can have less remaining page height
        // below it than the viewport is tall, so it can never satisfy
        // resolveCurrentSectionId's offset math on its own - see
        // scrollBottomEpsilonPx's doc comment for why this is passed through.
        const isAtBottom =
            scrollOffset + layoutMeasurement.height >= contentSize.height - scrollBottomEpsilonPx;
        updateCurrentSectionId(scrollOffset, isAtBottom);
    };

    const handleSectionLayout = (sectionId: SectionId) => (event: LayoutChangeEvent) => {
        sectionOffsets.current[sectionId] = event.nativeEvent.layout.y;
    };
    const handleProjectsLayout = handleSectionLayout("projects");
    const handleSkillsLayout = handleSectionLayout("skills");
    const handleExperienceLayout = handleSectionLayout("experience");
    const handleAboutLayout = handleSectionLayout("about");
    const handleContactLayout = handleSectionLayout("contact");

    const contentContainerStyle = [styles.content, { paddingBottom: insets.bottom }];

    if (shouldGateOnFontsLoaded(Platform.OS, fontsLoaded)) {
        return <View style={styles.loadingPlaceholder} />;
    }

    return (
        <View style={styles.root}>
            <ScrollView
                contentContainerStyle={contentContainerStyle}
                onScroll={handleScroll}
                ref={scrollViewRef}
                scrollEventThrottle={motion.scrollEventThrottleMs}
                style={styles.scrollView}
            >
                <Head>
                    <title>Josh Henry, Senior Mobile Software Engineer</title>
                    <meta
                        content="Josh Henry is a Senior Mobile Software Engineer in Portland, OR building cross-platform apps in React Native, iOS, and Android."
                        name="description"
                    />
                </Head>
                <Hero />
                <View onLayout={handleProjectsLayout}>
                    <ProjectsSection />
                </View>
                <View onLayout={handleSkillsLayout}>
                    <SkillsSection />
                </View>
                <View onLayout={handleExperienceLayout}>
                    <ExperienceSection />
                </View>
                <View onLayout={handleAboutLayout}>
                    <AboutSection />
                </View>
                <View onLayout={handleContactLayout}>
                    <ContactSection />
                </View>
                <Footer />
            </ScrollView>

            <StickyNav
                currentSectionId={currentSectionId}
                onLinkPress={scrollToSection}
                scrollY={scrollY}
            />
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
