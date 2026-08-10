import {
    footerCopyrightName,
    footerNote,
    footerSourceAccessibilityLabel,
    footerSourceHref,
    footerSourceLabel,
} from "./footer";

describe("footer content", () => {
    it("matches the exact spec copy, verbatim, per designs/CLAUDE.md's Copy rules", () => {
        expect(footerNote).toBe(
            "Designed and built by me in React Native and Expo. One codebase running on iOS, Android, and here on the web. Developed AI-assisted with Claude Code.",
        );
        expect(footerSourceLabel).toBe("Source");
        expect(footerCopyrightName).toBe("Josh Henry");
    });

    it("never uses an em dash anywhere in Footer copy", () => {
        for (const copy of [footerNote, footerSourceLabel, footerCopyrightName]) {
            expect(copy).not.toContain("—");
        }
    });

    it("points the Source link at this site's own repository", () => {
        expect(footerSourceHref).toBe("https://github.com/joshdhenry/personal-website");
        expect(footerSourceAccessibilityLabel).toBe("View the source code for this site on GitHub");
    });
});
