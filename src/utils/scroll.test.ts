import type { ScrollView } from "react-native";

import type { SectionOffsets } from "@/types/nav";

import {
    isScrolledToBottom,
    readScrollableNodeScrollTop,
    resolveCurrentSectionId,
    shouldRevealNav,
} from "./scroll";

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

describe("isScrolledToBottom", () => {
    const asScrollView = (getScrollableNode: () => unknown) =>
        ({ getScrollableNode }) as unknown as ScrollView;

    it("returns false when the ref hasn't attached yet", () => {
        expect(isScrolledToBottom(null)).toBe(false);
    });

    it("returns false when there's still room left to scroll", () => {
        const scrollView = asScrollView(() => ({
            clientHeight: 900,
            scrollHeight: 5822,
            scrollTop: 4000,
        }));

        expect(isScrolledToBottom(scrollView)).toBe(false);
    });

    it("returns true once scrolled to the maximum extent", () => {
        const scrollView = asScrollView(() => ({
            clientHeight: 900,
            scrollHeight: 5822,
            scrollTop: 4922,
        }));

        expect(isScrolledToBottom(scrollView)).toBe(true);
    });

    it("tolerates subpixel rounding just short of the maximum extent", () => {
        const scrollView = asScrollView(() => ({
            clientHeight: 900,
            scrollHeight: 5822.5,
            scrollTop: 4921.8,
        }));

        expect(isScrolledToBottom(scrollView)).toBe(true);
    });
});

describe("resolveCurrentSectionId", () => {
    const navHeightEstimate = 64;
    const sectionOffsets: SectionOffsets = {
        about: 4000,
        contact: 5000,
        experience: 3000,
        projects: 1000,
        skills: 2000,
        top: 0,
    };

    it("resolves to top before any section has been reached", () => {
        expect(resolveCurrentSectionId(0, sectionOffsets, navHeightEstimate, false)).toBe("top");
        expect(resolveCurrentSectionId(900, sectionOffsets, navHeightEstimate, false)).toBe("top");
    });

    it("resolves to the last section whose offset has been reached", () => {
        expect(
            resolveCurrentSectionId(
                1000 - navHeightEstimate,
                sectionOffsets,
                navHeightEstimate,
                false,
            ),
        ).toBe("projects");
        expect(resolveCurrentSectionId(2500, sectionOffsets, navHeightEstimate, false)).toBe(
            "skills",
        );
        expect(resolveCurrentSectionId(5000, sectionOffsets, navHeightEstimate, false)).toBe(
            "contact",
        );
    });

    it("skips sections that haven't measured an offset yet", () => {
        const partialOffsets: SectionOffsets = { ...sectionOffsets, contact: null };

        expect(resolveCurrentSectionId(9000, partialOffsets, navHeightEstimate, false)).toBe(
            "about",
        );
    });

    it("forces the last measured section once scrolled to the bottom, even short of its offset", () => {
        // Contact's own content + footer can be shorter than the viewport,
        // so scrollY + navHeightEstimate may never reach contact's offset
        // even at the maximum possible scroll position.
        const shortOfContactOffset = 4900;

        expect(
            resolveCurrentSectionId(shortOfContactOffset, sectionOffsets, navHeightEstimate, false),
        ).toBe("about");
        expect(
            resolveCurrentSectionId(shortOfContactOffset, sectionOffsets, navHeightEstimate, true),
        ).toBe("contact");
    });

    it("at the bottom, skips a trailing section that hasn't measured an offset yet", () => {
        const partialOffsets: SectionOffsets = { ...sectionOffsets, contact: null };

        expect(resolveCurrentSectionId(4900, partialOffsets, navHeightEstimate, true)).toBe(
            "about",
        );
    });
});
