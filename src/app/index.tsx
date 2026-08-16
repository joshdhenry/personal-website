import Head from "expo-router/head";
import { useRef } from "react";
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
import { useFontsLoaded } from "@/hooks/useFontsLoaded";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { colors } from "@/theme/colors";
import type { SectionId, SectionOffsets } from "@/types/nav";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";
import { shouldGateOnFontsLoaded } from "@/utils/shouldGateOnFontsLoaded";

const createSectionOffsets = (): SectionOffsets => ({
    about: null,
    contact: null,
    demo: null,
    experience: null,
    projects: null,
    skills: null,
    top: 0,
});

export default () => {
    const fontsLoaded = useFontsLoaded();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);

    const scrollY = useSharedValue(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const sectionOffsets = useRef<SectionOffsets>(createSectionOffsets());
    const scrollToSection = useScrollToSection({ scrollViewRef, sectionOffsets });

    // A plain JS onScroll, not Animated.ScrollView + useAnimatedScrollHandler:
    // Animated.ScrollView's web ref doesn't support imperative .scrollTo(),
    // which scrollToSection below needs. Writing to a shared value from JS is
    // standard, documented Reanimated usage - the UI-thread worklets reading
    // scrollY.value (StickyNav's reveal, TerminalCard's parallax) don't care
    // whether the write came from JS or UI thread.
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
    };

    const handleSectionLayout = (sectionId: SectionId) => (event: LayoutChangeEvent) => {
        sectionOffsets.current[sectionId] = event.nativeEvent.layout.y;
    };

    const handleTalkToMePress = () => scrollToSection("contact");
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
                scrollEventThrottle={16}
                style={styles.scrollView}
            >
                <Head>
                    <title>Josh Henry, Senior Mobile Software Engineer</title>
                    <meta
                        content="Josh Henry is a Senior Mobile Software Engineer in Portland, OR building cross-platform apps in React Native, iOS, and Android."
                        name="description"
                    />
                </Head>
                <Hero scrollY={scrollY} />
                <View onLayout={handleSectionLayout("projects")}>
                    <ProjectsSection />
                </View>
                <View onLayout={handleSectionLayout("skills")}>
                    <SkillsSection />
                </View>
                <View onLayout={handleSectionLayout("experience")}>
                    <ExperienceSection />
                </View>
                <View onLayout={handleSectionLayout("about")}>
                    <AboutSection />
                </View>
                <View onLayout={handleSectionLayout("demo")}>
                    <DemoSection onTalkToMePress={handleTalkToMePress} />
                </View>
                <View onLayout={handleSectionLayout("contact")}>
                    <ContactSection />
                </View>
                <Footer />
            </ScrollView>

            <StickyNav
                isCompact={isCompact}
                isNarrow={isNarrow}
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
