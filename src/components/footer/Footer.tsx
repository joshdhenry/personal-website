import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

import {
    footerCopyrightName,
    footerNote,
    footerSourceAccessibilityLabel,
    footerSourceHref,
    footerSourceLabel,
} from "@/data/footer";
import { colors } from "@/theme/colors";
import { footerSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";

import { FooterSourceLink } from "./FooterSourceLink";

export const Footer = () => {
    const { width } = useWindowDimensions();
    const { isNarrow } = resolveResponsiveLayoutMode(width);
    const copyrightText = `© ${new Date().getFullYear()} ${footerCopyrightName}`;

    const rowStyle = [styles.container, isNarrow ? styles.rowNarrow : styles.rowWide];

    return (
        <View style={styles.section}>
            <View style={rowStyle}>
                <Text style={styles.note}>{footerNote}</Text>
                <View style={styles.links}>
                    <FooterSourceLink
                        accessibilityLabel={footerSourceAccessibilityLabel}
                        href={footerSourceHref}
                        label={footerSourceLabel}
                    />
                    <Text style={styles.copyright}>{copyrightText}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        maxWidth: footerSpace.containerMaxWidth,
        paddingHorizontal: footerSpace.sectionPaddingHorizontal,
        paddingVertical: footerSpace.sectionPaddingVertical,
        width: "100%",
    },
    copyright: {
        ...typeScale.footerText,
        color: colors.inkMutedLight,
    },
    links: {
        alignItems: "center",
        flexDirection: "row",
        gap: footerSpace.linksGap,
    },
    note: {
        ...typeScale.footerText,
        color: colors.inkMuted,
        maxWidth: footerSpace.noteMaxWidth,
    },
    rowNarrow: {
        alignItems: "flex-start",
        flexDirection: "column",
        gap: footerSpace.rowGap,
    },
    rowWide: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: footerSpace.rowGap,
        justifyContent: "space-between",
    },
    section: {
        alignItems: "center",
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        width: "100%",
    },
});
