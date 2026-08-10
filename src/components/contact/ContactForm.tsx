import { StyleSheet, TextInput, View } from "react-native";

import {
    contactEmailLabel,
    contactErrorMessage,
    contactMessageLabel,
    contactNameLabel,
    contactSubmitLabel,
    contactSubmittingLabel,
    contactSuccessMessage,
} from "@/data/contact";
import { useContactFormSubmission } from "@/hooks/useContactFormSubmission";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { contactSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";

import { ContactFormField } from "./ContactFormField";
import { ContactStatusMessage } from "./ContactStatusMessage";
import { ContactSubmitButton } from "./ContactSubmitButton";

export const ContactForm = () => {
    const { fieldErrors, status, submit, updateField, values } = useContactFormSubmission();
    const isSubmitting = status === "submitting";

    const handleNameChange = (value: string) => updateField("name", value);
    const handleEmailChange = (value: string) => updateField("email", value);
    const handleMessageChange = (value: string) => updateField("message", value);
    const handleHoneypotChange = (value: string) => updateField("honeypot", value);

    return (
        <View style={styles.card}>
            <ContactFormField
                accessibilityLabel={contactNameLabel}
                isDisabled={isSubmitting}
                isInvalid={fieldErrors.name}
                label={contactNameLabel}
                onChangeText={handleNameChange}
                value={values.name}
            />
            <ContactFormField
                accessibilityLabel={contactEmailLabel}
                isDisabled={isSubmitting}
                isInvalid={fieldErrors.email}
                label={contactEmailLabel}
                onChangeText={handleEmailChange}
                value={values.email}
            />
            <ContactFormField
                accessibilityLabel={contactMessageLabel}
                isDisabled={isSubmitting}
                isInvalid={fieldErrors.message}
                label={contactMessageLabel}
                multiline
                onChangeText={handleMessageChange}
                value={values.message}
            />
            <TextInput
                accessibilityElementsHidden
                autoComplete="off"
                importantForAccessibility="no-hide-descendants"
                onChangeText={handleHoneypotChange}
                style={styles.honeypot}
                value={values.honeypot}
                // tabIndex isn't in React Native's TextInputProps, but
                // react-native-web forwards it straight to the underlying
                // <input>. Without it this off-screen, aria-hidden field is
                // still keyboard-tabbable, which a screen reader user could
                // land on with no announced context.
                {...({ tabIndex: -1 } as Record<string, unknown>)}
            />
            <ContactSubmitButton
                isDisabled={isSubmitting}
                label={isSubmitting ? contactSubmittingLabel : contactSubmitLabel}
                onPress={submit}
            />
            {status === "success" && (
                <ContactStatusMessage
                    color={colors.statusPassing}
                    message={contactSuccessMessage}
                />
            )}
            {status === "error" && (
                <ContactStatusMessage color={colors.statusError} message={contactErrorMessage} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: contactSpace.formCardGap,
        padding: contactSpace.formCardPadding,
    },
    honeypot: {
        ...typeScale.contactInputText,
        height: 0,
        left: -9999,
        opacity: 0,
        position: "absolute",
        top: -9999,
        width: 0,
    },
});
