import {
    demoChromeLabel,
    demoFallbackBody,
    demoFallbackLabel,
    demoHeading,
    demoIntroParagraph,
    demoLiveEditorLabel,
    demoMobileHeading,
    demoMobileIntroParagraph,
    demoNativeAppBody,
    demoNativeAppLabel,
    demoNoSnackMobileText,
    demoOpenSnackLabel,
    demoOpenWebsiteLabel,
    demoPitchBody,
    demoPitchCtaLabel,
    demoPitchLabel,
    demoPlaceholderHint,
    demoPlaceholderLabel,
    demoPlatformTag,
    demoSteps,
    demoWebsiteUrl,
} from "./demo";

describe("demo content", () => {
    it("matches the exact spec copy, verbatim, per designs/CLAUDE.md's Copy rules", () => {
        expect(demoHeading).toBe("Run this site as an app");
        expect(demoPlatformTag).toBe("iOS + ANDROID");
        expect(demoPitchLabel).toBe("I CAN DO THIS FOR YOU");
        expect(demoFallbackLabel).toBe("NEEDS A WIDER WINDOW");
        expect(demoChromeLabel).toBe("expo snack");
        expect(demoLiveEditorLabel).toBe("live editor");
        expect(demoPlaceholderLabel).toBe("Snack embed loads here");
        expect(demoNativeAppLabel).toBe("SEE IT ON THE WEB");
    });

    it("tells mobile readers to see this on the web, not to run it as an app they're already running", () => {
        expect(demoMobileHeading).toBe("Run this site on the web");
        expect(demoNativeAppBody).toContain("Open joshhenry.info in a browser");
    });

    it("never uses an em dash anywhere in Demo copy", () => {
        for (const copy of [
            demoHeading,
            demoMobileHeading,
            demoIntroParagraph,
            demoPitchBody,
            demoFallbackBody,
            demoPlaceholderHint,
            demoNoSnackMobileText,
            demoNativeAppBody,
            demoMobileIntroParagraph,
            ...demoSteps.map((step) => step.description),
        ]) {
            expect(copy).not.toContain("—");
        }
    });

    it("never assumes the narrow-web fallback means an actual phone, only a narrow window", () => {
        expect(demoFallbackBody).not.toContain("phone");
        expect(demoFallbackBody).not.toContain("device");
    });

    it("uses a hyphen, not a colon, after 'how I build it', says 'an update' not 'a fix', and never claims to be near an app store review", () => {
        expect(demoPitchBody).toContain("how I build it - one React Native codebase");
        expect(demoPitchBody).toContain("an update can ship");
        expect(demoPitchBody).not.toContain("a fix");
        expect(demoPitchBody).not.toContain("goes near an app store review");
    });

    it("points the native-app card at the live website over https", () => {
        expect(demoWebsiteUrl).toBe("https://joshhenry.info");
        expect(demoOpenWebsiteLabel).toContain("joshhenry.info");
    });

    it("has exactly 3 desktop steps, numbered 01 to 03 in order", () => {
        expect(demoSteps).toHaveLength(3);
        expect(demoSteps.map((step) => step.number)).toEqual(["01", "02", "03"]);
    });

    it("gives every step a non-empty description", () => {
        for (const step of demoSteps) {
            expect(step.description.length).toBeGreaterThan(0);
        }
    });

    it("labels every external-link CTA with a trailing arrow", () => {
        expect(demoPitchCtaLabel).toContain("→");
        expect(demoOpenSnackLabel).toContain("→");
        expect(demoOpenWebsiteLabel).toContain("→");
    });
});
