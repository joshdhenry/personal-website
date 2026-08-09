import Head from "expo-router/head";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { Hero } from "@/components/hero/Hero";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { useFontsLoaded } from "@/hooks/useFontsLoaded";
import { colors } from "@/theme/colors";
import { shouldGateOnFontsLoaded } from "@/utils/shouldGateOnFontsLoaded";

export default () => {
    const fontsLoaded = useFontsLoaded();

    if (shouldGateOnFontsLoaded(Platform.OS, fontsLoaded)) {
        return <View style={styles.loadingPlaceholder} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.content} style={styles.scrollView}>
            <Head>
                <title>Josh Henry, Senior Mobile Software Engineer</title>
                <meta
                    content="Josh Henry is a Senior Mobile Software Engineer in Portland, OR building cross-platform apps in React Native, iOS, and Android."
                    name="description"
                />
            </Head>
            <Hero />
            <ProjectsSection />
            <SkillsSection />
            <ExperienceSection />
        </ScrollView>
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
    scrollView: {
        backgroundColor: colors.bg,
    },
});
