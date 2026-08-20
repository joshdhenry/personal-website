import { deriveSnackEmbedUrl, isRunningInsideSnack, shouldRenderSnackEmbed } from "./snack";

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

    it("doesn't double the /embedded prefix if the input is already the embedded URL", () => {
        expect(
            deriveSnackEmbedUrl("https://snack.expo.dev/embedded/@joshdhenry/joshhenry-info"),
        ).toBe(
            "https://snack.expo.dev/embedded/@joshdhenry/joshhenry-info?preview=true&platform=web&theme=light",
        );
    });
});

describe("isRunningInsideSnack", () => {
    it("is true on Snack's web-preview host", () => {
        expect(isRunningInsideSnack("snack-runtime.eascdn.net")).toBe(true);
    });

    it("is false on the real site's own host", () => {
        expect(isRunningInsideSnack("joshhenry.info")).toBe(false);
    });

    it("is false for an unrelated host that merely contains the same substring", () => {
        expect(isRunningInsideSnack("not-snack-runtime.eascdn.net.evil.com")).toBe(false);
    });
});
