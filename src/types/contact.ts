import type { ComponentType } from "react";

export type ContactBadgeDescriptor = {
    accessibilityLabel: string;
    href: string;
    icon: ComponentType;
    id: string;
    label: string;
};

export type ContactSubmissionStatus = "error" | "idle" | "submitting" | "success";

export type ContactFormValues = {
    email: string;
    honeypot: string;
    message: string;
    name: string;
};

export type ContactFormFieldErrors = {
    email: boolean;
    message: boolean;
    name: boolean;
};

export type ContactBadgeProps = {
    badge: ContactBadgeDescriptor;
};

export type ContactBadgeListProps = {
    badges: readonly ContactBadgeDescriptor[];
};

export type ContactFormFieldProps = {
    accessibilityLabel: string;
    isDisabled: boolean;
    isInvalid: boolean;
    label: string;
    multiline?: boolean;
    onChangeText: (value: string) => void;
    value: string;
};

export type ContactSubmitButtonProps = {
    isDisabled: boolean;
    label: string;
    onPress: () => void;
};

export type ContactStatusMessageProps = {
    color: string;
    message: string;
};
