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
