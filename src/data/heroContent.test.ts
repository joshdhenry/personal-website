import {
    heroActionBadges,
    heroHeadline,
    heroIntroParagraph,
    heroStats,
    heroTechLogRows,
    heroTerminalCommandText,
} from "./heroContent";

describe("heroContent", () => {
    it("has exactly 7 tech log rows, 6 stats, and 3 action badges", () => {
        expect(heroTechLogRows).toHaveLength(7);
        expect(heroStats).toHaveLength(6);
        expect(heroActionBadges).toHaveLength(3);
    });

    it("matches the exact spec copy, verbatim, per designs/CLAUDE.md's Copy rules", () => {
        expect(heroHeadline).toBe(
            "Ten years building apps that hold up, on iOS, Android, and the web.",
        );
        expect(heroIntroParagraph).toContain(
            "I'm Josh Henry, a mobile engineer in Portland, Oregon.",
        );
        expect(heroIntroParagraph).not.toContain("—");
        expect(heroTerminalCommandText).toBe("ls ~/tech --sort=hands-on-build-time");
    });

    it("uses the canonical fact-list stat values, not the prototype's typo'd iOS count", () => {
        const iosStat = heroStats.find((stat) => stat.id === "ios-apps-shipped");
        expect(iosStat?.finalValue).toBe(8);

        const softwareDevYears = heroStats.find((stat) => stat.id === "software-development-years");
        expect(softwareDevYears?.finalValue).toBe(10);

        const itYears = heroStats.find((stat) => stat.id === "it-software-years");
        expect(itYears?.finalValue).toBe(23);
    });

    it("computes tech log stagger delays as the exact spec sequence", () => {
        expect(heroTechLogRows.map((row) => row.staggerDelayMilliseconds)).toEqual([
            1500, 1900, 2300, 2700, 3100, 3500, 3900,
        ]);
    });

    it("gives every action badge a well-formed href", () => {
        for (const badge of heroActionBadges) {
            expect(badge.href.length).toBeGreaterThan(0);
        }
        const linkedIn = heroActionBadges.find((badge) => badge.id === "linkedin");
        const gitHub = heroActionBadges.find((badge) => badge.id === "github");
        expect(linkedIn?.href.startsWith("https://")).toBe(true);
        expect(gitHub?.href.startsWith("https://")).toBe(true);
    });
});
