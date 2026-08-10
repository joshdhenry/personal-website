import { isContactFormValid, validateContactForm } from "./validateContactForm";

const validValues = {
    email: "josh@example.com",
    honeypot: "",
    message: "Let's talk about a role.",
    name: "Jane Recruiter",
};

describe("validateContactForm", () => {
    it("reports no errors for fully valid values", () => {
        expect(validateContactForm(validValues)).toEqual({
            email: false,
            message: false,
            name: false,
        });
    });

    it("flags an empty name", () => {
        expect(validateContactForm({ ...validValues, name: "   " }).name).toBe(true);
    });

    it("flags an empty message", () => {
        expect(validateContactForm({ ...validValues, message: "" }).message).toBe(true);
    });

    it("flags a malformed email", () => {
        expect(validateContactForm({ ...validValues, email: "not-an-email" }).email).toBe(true);
    });

    it("accepts a well-formed email", () => {
        expect(validateContactForm({ ...validValues, email: "a.b+c@sub.example.co" }).email).toBe(
            false,
        );
    });
});

describe("isContactFormValid", () => {
    it("is true when no field has an error", () => {
        expect(isContactFormValid({ email: false, message: false, name: false })).toBe(true);
    });

    it("is false when any field has an error", () => {
        expect(isContactFormValid({ email: false, message: false, name: true })).toBe(false);
    });
});
