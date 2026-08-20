import type { ScrollView } from "react-native";

import { readScrollableNodeScrollTop, shouldRevealNav } from "./scroll";

describe("shouldRevealNav", () => {
    it("stays hidden before the reveal threshold", () => {
        expect(shouldRevealNav(0, 560)).toBe(false);
        expect(shouldRevealNav(560, 560)).toBe(false);
    });

    it("reveals once scroll passes the threshold", () => {
        expect(shouldRevealNav(561, 560)).toBe(true);
    });
});

describe("readScrollableNodeScrollTop", () => {
    const asScrollView = (getScrollableNode: () => unknown) =>
        ({ getScrollableNode }) as unknown as ScrollView;

    it("returns 0 when the ref hasn't attached yet", () => {
        expect(readScrollableNodeScrollTop(null)).toBe(0);
    });

    it("returns 0 when the underlying node has no scrollTop", () => {
        const scrollView = asScrollView(() => null);

        expect(readScrollableNodeScrollTop(scrollView)).toBe(0);
    });

    it("returns the underlying DOM node's scrollTop", () => {
        const scrollView = asScrollView(() => ({ scrollTop: 842 }));

        expect(readScrollableNodeScrollTop(scrollView)).toBe(842);
    });
});
