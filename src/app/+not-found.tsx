import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { space } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";

const handleGoBackHome = () => router.replace("/");

export default () => (
    <View style={styles.container}>
        <Text accessibilityRole="header" style={styles.heading}>
            This page doesn&apos;t exist.
        </Text>
        <Pressable
            accessibilityLabel="Go back home"
            accessibilityRole="link"
            onPress={handleGoBackHome}
            style={styles.link}
        >
            <Text style={styles.linkText}>Go back home</Text>
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.bg,
        flex: 1,
        gap: space.md,
        justifyContent: "center",
        padding: space.xl,
    },
    heading: {
        ...typeScale.h2,
        color: colors.ink,
    },
    link: {
        paddingVertical: space.sm,
    },
    linkText: {
        ...typeScale.body,
        color: colors.primary,
    },
});
