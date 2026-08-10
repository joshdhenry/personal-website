import { useState } from "react";

import { contactFormspreeEndpoint } from "@/data/contact";
import type {
    ContactFormFieldErrors,
    ContactFormValues,
    ContactSubmissionStatus,
} from "@/types/contact";
import { isContactFormValid, validateContactForm } from "@/utils/validateContactForm";

const EMPTY_VALUES: ContactFormValues = { email: "", honeypot: "", message: "", name: "" };
const NO_ERRORS: ContactFormFieldErrors = { email: false, message: false, name: false };

/**
 * Owns the Contact form's field state and submit lifecycle. No DOM <form>
 * per CLAUDE.md's hard rule, so this POSTs via fetch from a Pressable
 * handler instead of relying on a native form submission. A filled
 * honeypot field is treated as a silent success - the request never goes
 * out, and the bot sees nothing to indicate it was caught, per
 * designs/CLAUDE.md's "must not be spammable" requirement.
 */
export const useContactFormSubmission = () => {
    const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
    const [fieldErrors, setFieldErrors] = useState<ContactFormFieldErrors>(NO_ERRORS);
    const [status, setStatus] = useState<ContactSubmissionStatus>("idle");

    const updateField = (field: keyof ContactFormValues, value: string) => {
        setValues((previousValues) => ({ ...previousValues, [field]: value }));
    };

    const submit = async () => {
        const errors = validateContactForm(values);
        setFieldErrors(errors);

        if (!isContactFormValid(errors)) {
            return;
        }

        if (values.honeypot.trim().length > 0) {
            setStatus("success");
            setValues(EMPTY_VALUES);
            return;
        }

        setStatus("submitting");

        try {
            const response = await fetch(contactFormspreeEndpoint, {
                body: JSON.stringify({
                    email: values.email,
                    message: values.message,
                    name: values.name,
                }),
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                method: "POST",
            });

            if (response.ok) {
                setStatus("success");
                setValues(EMPTY_VALUES);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return { fieldErrors, status, submit, updateField, values };
};
