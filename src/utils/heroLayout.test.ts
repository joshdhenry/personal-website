import { resolveHeroLayoutMode } from "./heroLayout";

describe("resolveHeroLayoutMode", () => {
    it("is wide (not narrow, not compact) above 900px", () => {
        expect(resolveHeroLayoutMode(1200)).toEqual({ isNarrow: false, isCompact: false });
    });

    it("is narrow but not compact at exactly the 900px breakpoint", () => {
        expect(resolveHeroLayoutMode(900)).toEqual({ isNarrow: true, isCompact: false });
    });

    it("is narrow but not compact between 561px and 900px", () => {
        expect(resolveHeroLayoutMode(700)).toEqual({ isNarrow: true, isCompact: false });
    });

    it("is both narrow and compact at exactly the 560px breakpoint", () => {
        expect(resolveHeroLayoutMode(560)).toEqual({ isNarrow: true, isCompact: true });
    });

    it("is both narrow and compact below 560px", () => {
        expect(resolveHeroLayoutMode(375)).toEqual({ isNarrow: true, isCompact: true });
    });
});
