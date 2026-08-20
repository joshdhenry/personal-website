import { clampParallaxOffset, shouldRevealNav } from "./scroll";

describe("shouldRevealNav", () => {
    it("stays hidden before the reveal threshold", () => {
        expect(shouldRevealNav(0, 560)).toBe(false);
        expect(shouldRevealNav(560, 560)).toBe(false);
    });

    it("reveals once scroll passes the threshold", () => {
        expect(shouldRevealNav(561, 560)).toBe(true);
    });
});

describe("clampParallaxOffset", () => {
    it("returns 0 at the scroll offset", () => {
        expect(clampParallaxOffset(120, 120, -0.055, 28)).toBeCloseTo(0);
    });

    it("scales linearly within the clamp range", () => {
        expect(clampParallaxOffset(220, 120, -0.055, 28)).toBeCloseTo(-5.5);
    });

    it("clamps to the positive max", () => {
        expect(clampParallaxOffset(-1000, 120, -0.055, 28)).toBe(28);
    });

    it("clamps to the negative max", () => {
        expect(clampParallaxOffset(2000, 120, -0.055, 28)).toBe(-28);
    });
});
