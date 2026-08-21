import { StyleSheet, Text } from "react-native";

import { contactSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";
import type { ContactStatusMessageProps } from "@/types/contact";

export const ContactStatusMessage = ({ color, message }: ContactStatusMessageProps) => (
    <Text
        accessibilityLiveRegion="polite"
        accessibilityRole="alert"
        style={[styles.message, { color }]}
    >
        {message}
    </Text>
);

const styles = StyleSheet.create({
    message: {
        ...typeScale.contactStatusMessage,
        marginTop: contactSpace.statusMessageMarginTop,
    },
});
