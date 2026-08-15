import { deriveSnackEmbedUrl, shouldRenderSnackEmbed } from "./snack";

describe("shouldRenderSnackEmbed", () => {
    it("renders on web, as long as it isn't compact-width", () => {
        expect(shouldRenderSnackEmbed("web", false)).toBe(true);
    });

    it("does not render on compact-width web", () => {
        expect(shouldRenderSnackEmbed("web", true)).toBe(false);
    });

    it("never renders on native, compact-width or not", () => {
        expect(shouldRenderSnackEmbed("ios", false)).toBe(false);
        expect(shouldRenderSnackEmbed("android", false)).toBe(false);
    });
});

describe("deriveSnackEmbedUrl", () => {
    it("returns an empty string when no Snack URL is configured", () => {
        expect(deriveSnackEmbedUrl("")).toBe("");
    });

    it("inserts /embedded after the host and appends the embed query params", () => {
        expect(deriveSnackEmbedUrl("https://snack.expo.dev/@joshdhenry/joshhenry-info")).toBe(
            "https://snack.expo.dev/embedded/@joshdhenry/joshhenry-info?preview=true&platform=web&theme=light",
        );
    });

    it("returns an empty string, rather than throwing, for a malformed URL", () => {
        expect(deriveSnackEmbedUrl("not a url")).toBe("");
    });
});
