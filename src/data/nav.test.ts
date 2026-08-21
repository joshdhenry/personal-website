import { navLinks, navNameLabel } from "./nav";

describe("nav content", () => {
    it("has the exact name label copy", () => {
        expect(navNameLabel).toBe("JOSH HENRY");
    });

    it("has exactly 5 links, in Projects/Skills/Experience/About/Contact order", () => {
        expect(navLinks.map((link) => link.label)).toEqual([
            "Projects",
            "Skills",
            "Experience",
            "About",
            "Contact",
        ]);
    });

    it("points every link's sectionId at the matching section", () => {
        for (const link of navLinks) {
            expect(link.sectionId).toBe(link.label.toLowerCase());
        }
    });
});
