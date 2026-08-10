import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { contactAvailabilityParagraph, contactBadges, contactHeading } from "@/data/contact";
import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { colors } from "@/theme/colors";
import { motion } from "@/theme/motion";
import { contactSpace } from "@/theme/spacing";
import { typeScale } from "@/theme/typography";

import { ContactBadgeList } from "./ContactBadgeList";

export const ContactIntro = () => {
    const headingRiseStyle = useRiseEntrance(motion.delay.riseContactHeading);

    return (
        <View style={styles.column}>
            <Animated.View style={headingRiseStyle}>
                <Text accessibilityRole="header" style={styles.heading}>
                    {contactHeading}
                </Text>
            </Animated.View>
            <Text style={styles.paragraph}>{contactAvailabilityParagraph}</Text>
            <ContactBadgeList badges={contactBadges} />
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        alignItems: "center",
        flex: 1,
        gap: contactSpace.introColumnGap,
    },
    heading: {
        ...typeScale.h2,
        color: colors.ink,
        textAlign: "center",
    },
    paragraph: {
        ...typeScale.contactAvailability,
        color: colors.inkMuted,
        maxWidth: contactSpace.availabilityParagraphMaxWidth,
        textAlign: "center",
    },
});
