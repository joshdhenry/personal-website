import { skillGroups } from "./skills";

describe("skillGroups", () => {
    it("has exactly 10 groups, in fixed order", () => {
        expect(skillGroups).toHaveLength(10);
        expect(skillGroups.map((group) => group.label)).toEqual([
            "Languages",
            "React Native",
            "UI / UX",
            "Media",
            "Data & State",
            "Testing",
            "Build & Release",
            "Tools",
            "Methodologies",
            "AI",
        ]);
    });

    it("has unique labels", () => {
        const labels = skillGroups.map((group) => group.label);
        expect(new Set(labels).size).toBe(labels.length);
    });

    it("gives every group at least one item", () => {
        for (const group of skillGroups) {
            expect(group.items.length).toBeGreaterThan(0);
        }
    });

    it("matches the exact spec copy, verbatim, per designs/CLAUDE.md's Copy rules", () => {
        const languages = skillGroups.find((group) => group.label === "Languages");
        expect(languages?.items).toEqual([
            "TypeScript",
            "JavaScript",
            "Swift",
            "Objective-C",
            "Java",
            "Kotlin",
            "HTML",
            "CSS",
        ]);

        const ai = skillGroups.find((group) => group.label === "AI");
        expect(ai?.items).toEqual(["GitHub Copilot", "GitLab Duo", "Claude"]);

        for (const group of skillGroups) {
            expect(group.label).not.toContain("—");
            for (const item of group.items) {
                expect(item).not.toContain("—");
            }
        }
    });
});
