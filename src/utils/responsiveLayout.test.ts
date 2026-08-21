import { resolveByLayoutMode, resolveResponsiveLayoutMode } from "./responsiveLayout";

describe("resolveByLayoutMode", () => {
    it("picks the compact value when compact (and therefore also narrow)", () => {
        expect(resolveByLayoutMode({ isCompact: true, isNarrow: true }, "c", "n", "w")).toBe("c");
    });

    it("picks the narrow value when narrow but not compact", () => {
        expect(resolveByLayoutMode({ isCompact: false, isNarrow: true }, "c", "n", "w")).toBe("n");
    });

    it("picks the wide value when neither compact nor narrow", () => {
        expect(resolveByLayoutMode({ isCompact: false, isNarrow: false }, "c", "n", "w")).toBe("w");
    });
});

describe("resolveResponsiveLayoutMode", () => {
    it("is wide (not narrow, not compact) above 900px", () => {
        expect(resolveResponsiveLayoutMode(1200)).toEqual({ isNarrow: false, isCompact: false });
    });

    it("is narrow but not compact at exactly the 900px breakpoint", () => {
        expect(resolveResponsiveLayoutMode(900)).toEqual({ isNarrow: true, isCompact: false });
    });

    it("is narrow but not compact between 561px and 900px", () => {
        expect(resolveResponsiveLayoutMode(700)).toEqual({ isNarrow: true, isCompact: false });
    });

    it("is both narrow and compact at exactly the 560px breakpoint", () => {
        expect(resolveResponsiveLayoutMode(560)).toEqual({ isNarrow: true, isCompact: true });
    });

    it("is both narrow and compact below 560px", () => {
        expect(resolveResponsiveLayoutMode(375)).toEqual({ isNarrow: true, isCompact: true });
    });
});
