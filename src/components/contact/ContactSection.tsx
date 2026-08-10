import { StyleSheet, useWindowDimensions, View } from "react-native";

import { colors } from "@/theme/colors";
import { contactSpace } from "@/theme/spacing";
import { resolveResponsiveLayoutMode } from "@/utils/responsiveLayout";

import { ContactForm } from "./ContactForm";
import { ContactIntro } from "./ContactIntro";

export const ContactSection = () => {
    const { width } = useWindowDimensions();
    const { isCompact, isNarrow } = resolveResponsiveLayoutMode(width);

    const paddingHorizontal = isCompact
        ? contactSpace.sectionPaddingHorizontalCompact
        : isNarrow
          ? contactSpace.sectionPaddingHorizontalNarrow
          : contactSpace.sectionPaddingHorizontalWide;
    const paddingTop = isNarrow
        ? contactSpace.sectionPaddingVerticalNarrow
        : contactSpace.sectionPaddingTopWide;
    const paddingBottom = isNarrow
        ? contactSpace.sectionPaddingVerticalNarrow
        : contactSpace.sectionPaddingBottomWide;

    const sectionStyle = [styles.section, { paddingBottom, paddingHorizontal, paddingTop }];
    const rowStyle = [
        isNarrow ? styles.rowNarrow : styles.rowWide,
        { gap: isNarrow ? contactSpace.gridGapNarrow : contactSpace.gridGap },
    ];

    return (
        <View style={sectionStyle}>
            <View style={rowStyle}>
                <ContactIntro />
                <View style={styles.formColumn}>
                    <ContactForm />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formColumn: {
        flex: 1,
    },
    rowNarrow: {
        alignItems: "stretch",
        flexDirection: "column",
    },
    rowWide: {
        alignItems: "flex-start",
        flexDirection: "row",
    },
    section: {
        alignSelf: "center",
        backgroundColor: colors.bg,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        maxWidth: contactSpace.containerMaxWidth,
        width: "100%",
    },
});
