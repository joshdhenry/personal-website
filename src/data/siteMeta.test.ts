import { siteMetaDescription, siteMetaTitle } from "./siteMeta";

describe("siteMeta", () => {
    it("names Josh Henry and his role in the page title", () => {
        expect(siteMetaTitle).toBe("Josh Henry, Senior Mobile Software Engineer");
    });

    it("describes the role, stack, and platforms in the page description", () => {
        expect(siteMetaDescription).toContain("Senior Mobile Software Engineer");
        expect(siteMetaDescription).toContain("React Native");
        expect(siteMetaDescription).toContain("iOS, Android, and web");
    });

    it("keeps both strings non-empty, since they feed <title> and every og:/twitter: tag", () => {
        expect(siteMetaTitle.length).toBeGreaterThan(0);
        expect(siteMetaDescription.length).toBeGreaterThan(0);
    });
});
