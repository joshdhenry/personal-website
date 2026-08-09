import { experienceRangeLabel, experienceRoles } from "./experience";

describe("experienceRoles", () => {
    it("has exactly 5 roles, newest first", () => {
        expect(experienceRoles).toHaveLength(5);
        expect(experienceRoles.map((experienceRole) => experienceRole.role)).toEqual([
            "Senior React Native Mobile Software Engineer",
            "Senior Mobile Software Engineer",
            "Senior Software Engineer",
            "React Native Mobile Software Engineer",
            "Founder / iOS Developer",
        ]);
        expect(experienceRoles.map((experienceRole) => experienceRole.dateRangeLabel)).toEqual([
            "2023 to 2026",
            "2021 to 2022",
            "2020 to 2021",
            "2017 to 2020",
            "2016 to 2017",
        ]);
    });

    it("matches the exact spec copy, verbatim, per designs/CLAUDE.md's Copy rules", () => {
        expect(experienceRoles[0]?.companyLine).toBe("Streem (acquired by Frontdoor) · Remote");
        expect(experienceRoles[0]?.note).toBe("React Native video conferencing SDK");
        expect(experienceRoles[4]?.companyLine).toBe("Big Smash Software, LLC · Seattle, WA");
        expect(experienceRangeLabel).toBe("2016 to 2026");

        for (const experienceRole of experienceRoles) {
            expect(experienceRole.role).not.toContain("—");
            expect(experienceRole.companyLine).not.toContain("—");
            expect(experienceRole.note).not.toContain("—");
        }
    });
});
