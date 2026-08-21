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
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { navSpace } from "@/theme/spacing";
import type { SectionId, SectionOffsets } from "@/types/nav";
import { isAtScrollBottom, readInitialScrollState } from "@/utils/scroll";
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
    // Real height, reported by StickyNav's onLayout once mounted;
    // navHeightFallback covers the gap before that first measurement.
    const [measuredNavHeight, setMeasuredNavHeight] = useState<number | null>(null);
    const navHeight = measuredNavHeight ?? navSpace.navHeightFallback + insets.top;
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
        scrollY.value = scrollTop;
        updateFromScroll(scrollTop, isAtBottom);
        setHasSyncedInitialScroll(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Plain JS onScroll: Animated.ScrollView's web ref lacks the imperative
    // .scrollTo() scrollToSection needs.
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const scrollOffset = contentOffset.y;
        scrollY.value = scrollOffset;
        const isAtBottom = isAtScrollBottom(
            scrollOffset,
            layoutMeasurement.height,
            contentSize.height,
        );
        updateFromScroll(scrollOffset, isAtBottom);
    };

    const createOnSectionLayout = (sectionId: SectionId) => (event: LayoutChangeEvent) => {
        sectionOffsets.current[sectionId] = event.nativeEvent.layout.y;
    };
    const onProjectsLayout = createOnSectionLayout("projects");
    const onSkillsLayout = createOnSectionLayout("skills");
    const onExperienceLayout = createOnSectionLayout("experience");
    const onAboutLayout = createOnSectionLayout("about");
    const onContactLayout = createOnSectionLayout("contact");

    const contentContainerStyle = [styles.content, { paddingBottom: insets.bottom }];

    if (shouldGateOnFontsLoaded(Platform.OS, fontsLoaded)) {
        return <View style={styles.loadingPlaceholder} />;
    }

    return (
        <View style={styles.root}>
            <ScrollView
                contentContainerStyle={contentContainerStyle}
                onScroll={onScroll}
                onScrollBeginDrag={onScrollBeginDrag}
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
