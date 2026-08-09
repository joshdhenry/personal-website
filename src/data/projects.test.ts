import { compactProjects, featuredProjects } from "./projects";

describe("projects", () => {
    it("has exactly 5 featured projects and 6 compact projects, in fixed order", () => {
        expect(featuredProjects).toHaveLength(5);
        expect(compactProjects).toHaveLength(6);

        expect(featuredProjects.map((project) => project.id)).toEqual([
            "streem",
            "gencon",
            "mind-yeti",
            "second-step-k8",
            "second-step-adults",
        ]);
        expect(compactProjects.map((project) => project.id)).toEqual([
            "diablo-golf",
            "my-fish-pal",
            "zen-builder",
            "vista-weather",
            "skylines-trivia",
            "spin-wheel-control",
        ]);
    });

    it("only spans both columns and treats the image as a wordmark for Streem", () => {
        for (const project of featuredProjects) {
            const isStreem = project.id === "streem";
            expect(project.spansBothColumns).toBe(isStreem);
            expect(project.isWordmarkImage).toBe(isStreem);
        }
    });

    it("omits outcome only for Mind Yeti", () => {
        for (const project of featuredProjects) {
            const hasOutcome = project.outcome !== undefined;
            expect(hasOutcome).toBe(project.id !== "mind-yeti");
        }
    });

    it("gives every featured project at least one stack chip, one per technology", () => {
        for (const project of featuredProjects) {
            expect(project.stackChips.length).toBeGreaterThan(0);
            for (const chip of project.stackChips) {
                expect(chip).not.toContain(",");
            }
        }
    });

    it("matches the exact spec copy, verbatim, per designs/CLAUDE.md's Copy rules", () => {
        const streem = featuredProjects.find((project) => project.id === "streem");
        expect(streem?.title).toBe("Streem React Native SDK");
        expect(streem?.problem).toContain("The SDK lets the company skip that step");

        const diabloGolf = compactProjects.find((project) => project.id === "diablo-golf");
        expect(diabloGolf?.techLine).toBe("Objective-C · Swift · Java");

        for (const project of [...featuredProjects, ...compactProjects]) {
            const copyFields = [
                project.title,
                "problem" in project ? project.problem : undefined,
                "whatIBuilt" in project ? project.whatIBuilt : undefined,
                "outcome" in project ? project.outcome : undefined,
                "paragraph" in project ? project.paragraph : undefined,
            ].filter((field): field is string => typeof field === "string");

            for (const field of copyFields) {
                expect(field).not.toContain("—");
            }
        }
    });

    it("gives every project image a non-empty alt text matching its title", () => {
        for (const project of [...featuredProjects, ...compactProjects]) {
            expect(project.imageAlt).toBe(project.title);
        }
    });
});
