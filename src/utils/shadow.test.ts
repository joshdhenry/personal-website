import { isHoverShadowSupported } from "./shadow";

describe("isHoverShadowSupported", () => {
    it("is supported on web", () => {
        expect(isHoverShadowSupported("web")).toBe(true);
    });

    it("is not supported on native", () => {
        expect(isHoverShadowSupported("ios")).toBe(false);
        expect(isHoverShadowSupported("android")).toBe(false);
    });
});
