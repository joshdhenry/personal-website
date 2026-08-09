import { Image, StyleSheet, View, type ImageStyle, type ViewStyle } from "react-native";

import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { projectsSpace } from "@/theme/spacing";
import type { ProjectImageBandProps } from "@/types/projects";

export const ProjectImageBand = ({
    alt,
    hasFullBorder,
    isWordmark,
    source,
}: ProjectImageBandProps) => {
    const bandStyle = [
        styles.band,
        hasFullBorder ? styles.bandFullBorder : styles.bandBottomBorderOnly,
        isWordmark && styles.bandWordmarkPadding,
    ];

    return (
        <View style={bandStyle}>
            <Image
                accessibilityLabel={alt}
                importantForAccessibility="no-hide-descendants"
                resizeMode="contain"
                source={source}
                style={imageStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    band: {
        aspectRatio: 7 / 3,
        backgroundColor: colors.surface,
        overflow: "hidden",
    },
    bandBottomBorderOnly: {
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
    },
    bandFullBorder: {
        borderColor: colors.border,
        borderRadius: radius.imageBand,
        borderWidth: 1,
    },
    bandWordmarkPadding: {
        paddingHorizontal:
            projectsSpace.streemImageBandPaddingHorizontal as ViewStyle["paddingHorizontal"],
        paddingVertical: projectsSpace.streemImageBandPaddingVertical,
    },
});

// Kept out of the StyleSheet.create above so TypeScript infers this as
// ImageStyle on its own, not widened to the ViewStyle | TextStyle |
// ImageStyle union StyleSheet.create falls back to when a single call
// mixes View and Image style shapes.
const imageStyle: ImageStyle = {
    borderRadius: radius.image,
    height: "100%",
    width: "100%",
};
