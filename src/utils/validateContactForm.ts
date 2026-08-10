import type { ContactFormFieldErrors, ContactFormValues } from "@/types/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Client-side validation gate for the Contact form's submit handler, per
 * designs/CLAUDE.md's "must not be spammable: honeypot field plus client-
 * side validation at minimum." Pure function so it's testable without
 * mounting the form, and shared by the submission hook and any inline
 * field-error styling.
 */
export const validateContactForm = (values: ContactFormValues): ContactFormFieldErrors => ({
    email: !EMAIL_PATTERN.test(values.email.trim()),
    message: values.message.trim().length === 0,
    name: values.name.trim().length === 0,
});

export const isContactFormValid = (errors: ContactFormFieldErrors): boolean =>
    !errors.email && !errors.message && !errors.name;
