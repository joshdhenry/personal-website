import { shouldGateOnFontsLoaded } from "./shouldGateOnFontsLoaded";

describe("shouldGateOnFontsLoaded", () => {
    it("never gates web, regardless of fonts-loaded state", () => {
        expect(shouldGateOnFontsLoaded("web", false)).toBe(false);
        expect(shouldGateOnFontsLoaded("web", true)).toBe(false);
    });

    it("gates iOS and Android until fonts finish loading", () => {
        expect(shouldGateOnFontsLoaded("ios", false)).toBe(true);
        expect(shouldGateOnFontsLoaded("android", false)).toBe(true);
    });

    it("stops gating iOS and Android once fonts have loaded", () => {
        expect(shouldGateOnFontsLoaded("ios", true)).toBe(false);
        expect(shouldGateOnFontsLoaded("android", true)).toBe(false);
    });
});
