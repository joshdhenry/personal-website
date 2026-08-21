import {
    contactAvailabilityParagraph,
    contactErrorMessage,
    contactHeading,
    contactSuccessMessage,
} from "./contact";

describe("contact content", () => {
    it("matches the exact spec copy, verbatim, per designs/CLAUDE.md's Copy rules", () => {
        expect(contactHeading).toBe("Let's build something great");
        expect(contactAvailabilityParagraph).toBe(
            "Open to senior React Native and some mobile roles. Seeking remote work anywhere in the U.S., or hybrid in Portland, OR. Send me a message and I'll get back to you.",
        );
    });

    it("never uses an em dash anywhere in Contact copy", () => {
        for (const copy of [
            contactHeading,
            contactAvailabilityParagraph,
            contactSuccessMessage,
            contactErrorMessage,
        ]) {
            expect(copy).not.toContain("—");
        }
    });
});
