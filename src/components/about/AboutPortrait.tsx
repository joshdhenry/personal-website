import { Image, StyleSheet, View, type ImageStyle } from "react-native";

import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { aboutSpace } from "@/theme/spacing";
import type { AboutPortraitProps } from "@/types/about";

export const AboutPortrait = ({ alt, isNarrow, source }: AboutPortraitProps) => {
    const frameStyle = [
        styles.frame,
        { width: isNarrow ? aboutSpace.portraitMaxWidthNarrow : aboutSpace.portraitColumnWidth },
    ];

    return (
        <View style={frameStyle}>
            <Image accessibilityLabel={alt} resizeMode="cover" source={source} style={imageStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    frame: {
        aspectRatio: 1, // headshot.png is a 1254x1254 square photo
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        overflow: "hidden",
    },
});

// Kept out of the StyleSheet.create above so TypeScript infers this as
// ImageStyle on its own, not widened to the ViewStyle | TextStyle |
// ImageStyle union StyleSheet.create falls back to for a single-shape sheet,
// matching ProjectImageBand.tsx's own imageStyle const precedent. Sized by
// its frame's aspectRatio + explicit width, not by its own dimensions,
// since a bare Image doesn't reliably derive height from aspectRatio + a
// single explicit dimension on React Native Web.
const imageStyle: ImageStyle = {
    height: "100%",
    width: "100%",
};
