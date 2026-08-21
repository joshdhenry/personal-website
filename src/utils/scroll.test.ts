import type { ScrollView } from "react-native";

import type { SectionOffsets } from "@/types/nav";

import {
    hasSectionOrderReachedTarget,
    readInitialScrollState,
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

describe("readInitialScrollState", () => {
    const asScrollView = (getScrollableNode: () => unknown) =>
        ({ getScrollableNode }) as unknown as ScrollView;

    it("returns a zeroed, not-at-bottom state when the ref hasn't attached yet", () => {
        expect(readInitialScrollState(null)).toEqual({ isAtBottom: false, scrollTop: 0 });
    });

    it("returns a zeroed, not-at-bottom state when the underlying node is missing", () => {
        const scrollView = asScrollView(() => null);

        expect(readInitialScrollState(scrollView)).toEqual({ isAtBottom: false, scrollTop: 0 });
    });

    it("reads the underlying DOM node's scrollTop when there's still room left to scroll", () => {
        const scrollView = asScrollView(() => ({
            clientHeight: 900,
            scrollHeight: 5822,
            scrollTop: 4000,
        }));

        expect(readInitialScrollState(scrollView)).toEqual({ isAtBottom: false, scrollTop: 4000 });
    });

    it("reports isAtBottom once scrolled to the maximum extent", () => {
        const scrollView = asScrollView(() => ({
            clientHeight: 900,
            scrollHeight: 5822,
            scrollTop: 4922,
        }));

        expect(readInitialScrollState(scrollView)).toEqual({ isAtBottom: true, scrollTop: 4922 });
    });

    it("tolerates subpixel rounding just short of the maximum extent", () => {
        const scrollView = asScrollView(() => ({
            clientHeight: 900,
            scrollHeight: 5822.5,
            scrollTop: 4921.8,
        }));

        expect(readInitialScrollState(scrollView)).toEqual({
            isAtBottom: true,
            scrollTop: 4921.8,
        });
    });
});

describe("hasSectionOrderReachedTarget", () => {
    it("scrolling down (direction 1) has reached the target once it's at or past it", () => {
        expect(hasSectionOrderReachedTarget("skills", "skills", 1)).toBe(true);
        expect(hasSectionOrderReachedTarget("experience", "skills", 1)).toBe(true);
        expect(hasSectionOrderReachedTarget("projects", "skills", 1)).toBe(false);
    });

    it("scrolling up (direction -1) has reached the target once it's at or before it", () => {
        expect(hasSectionOrderReachedTarget("skills", "skills", -1)).toBe(true);
        expect(hasSectionOrderReachedTarget("projects", "skills", -1)).toBe(true);
        expect(hasSectionOrderReachedTarget("experience", "skills", -1)).toBe(false);
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
