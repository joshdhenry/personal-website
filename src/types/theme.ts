/**
 * react-native-web supports CSS properties RN's own style types don't
 * declare (outline*, boxShadow); every web-only style casts through this.
 */
export type WebOnlyStyle = Record<string, unknown>;

export type TextStyleToken = {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    fontWeight: "400" | "500" | "600";
    letterSpacing?: number;
};

export type ResponsiveLayoutMode = {
    isCompact: boolean;
    isNarrow: boolean;
};
