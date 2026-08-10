import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "@/theme/colors";
import { radius } from "@/theme/radii";
import { contactSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ContactFormFieldProps } from "@/types/contact";

export const ContactFormField = ({
    accessibilityLabel,
    isDisabled,
    isInvalid,
    label,
    multiline,
    onChangeText,
    value,
}: ContactFormFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => setIsFocused(false);
    const handleFocus = () => setIsFocused(true);

    const inputStyle = [
        styles.input,
        multiline && styles.inputMultiline,
        isFocused && styles.inputFocused,
        isInvalid && !isFocused && styles.inputInvalid,
    ];

    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                accessibilityLabel={accessibilityLabel}
                editable={!isDisabled}
                multiline={multiline}
                numberOfLines={multiline ? contactSpace.messageFieldRows : undefined}
                onBlur={handleBlur}
                onChangeText={onChangeText}
                onFocus={handleFocus}
                style={inputStyle}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    field: {
        gap: contactSpace.fieldGap,
    },
    input: {
        ...typeScale.contactInputText,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderRadius: radius.sm,
        borderWidth: 1,
        color: colors.ink,
        paddingHorizontal: contactSpace.inputPaddingHorizontal,
        paddingVertical: contactSpace.inputPaddingVertical,
    },
    inputFocused: {
        backgroundColor: colors.surface,
        borderColor: colors.primary,
    },
    inputInvalid: {
        borderColor: colors.statusError,
    },
    inputMultiline: {
        textAlignVertical: "top",
    },
    label: {
        ...typeScale.contactFieldLabel,
        color: colors.inkMuted,
    },
});
