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
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns an empty string when no Snack URL is configured", () => {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        expect(deriveSnackEmbedUrl("")).toBe("");
        // The unset case is the expected pre-launch state, not a mistake -
        // unlike a malformed value below, it shouldn't warn.
        expect(warnSpy).not.toHaveBeenCalled();
    });

    it("inserts /embedded after the host and appends the embed query params", () => {
        expect(deriveSnackEmbedUrl("https://snack.expo.dev/@joshdhenry/joshhenry-info")).toBe(
            "https://snack.expo.dev/embedded/@joshdhenry/joshhenry-info?preview=true&platform=web&theme=light",
        );
    });

    it("returns an empty string and warns, rather than throwing, for a malformed URL", () => {
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        expect(deriveSnackEmbedUrl("not a url")).toBe("");
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining("not a url"),
            expect.anything(),
        );
    });

    it("doesn't double the /embedded prefix if the input is already the embedded URL", () => {
        expect(
            deriveSnackEmbedUrl("https://snack.expo.dev/embedded/@joshdhenry/joshhenry-info"),
        ).toBe(
            "https://snack.expo.dev/embedded/@joshdhenry/joshhenry-info?preview=true&platform=web&theme=light",
        );
    });
});
