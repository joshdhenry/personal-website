import { shouldRevealNav } from "./scroll";

describe("shouldRevealNav", () => {
    it("stays hidden before the reveal threshold", () => {
        expect(shouldRevealNav(0, 560)).toBe(false);
        expect(shouldRevealNav(560, 560)).toBe(false);
    });

    it("reveals once scroll passes the threshold", () => {
        expect(shouldRevealNav(561, 560)).toBe(true);
    });
});
