import {
    aboutHeading,
    aboutPersonalParagraph,
    aboutPortraitAlt,
    aboutProfessionalParagraph,
} from "./about";

describe("about content", () => {
    it("matches the exact spec copy, verbatim, per designs/CLAUDE.md's Copy rules", () => {
        expect(aboutHeading).toBe("About");
        expect(aboutProfessionalParagraph).toBe(
            "I earned a BS in Computer Information Systems and spent 13 years in retail IT before founding Big Smash Software and moving into app development full time. Since then I've shipped production iOS, Android, and React Native apps, from greenfield builds through App Store and Google Play releases, with deep native module work across Swift, Objective-C, Java, and Kotlin. I care most about mobile performance, reliability, and testing strategy, and AI-assisted development is a daily part of my workflow.",
        );
        expect(aboutPersonalParagraph).toBe(
            "I live in Portland, OR with my wife, after living in a lot of other states first. Enough of them to make me pay attention to what makes a place work. That turned into a real interest in urban design and city planning. I'll happily nerd out about zoning and transit for an evening. The rest of my attention goes to astronomy and physics, and the questions at the edge of them. I play more Civilization than I'll admit. I love all animals, especially dogs.",
        );
        expect(aboutPortraitAlt).toBe("Josh Henry");

        for (const copy of [aboutHeading, aboutProfessionalParagraph, aboutPersonalParagraph]) {
            expect(copy).not.toContain("—");
        }
    });
});
