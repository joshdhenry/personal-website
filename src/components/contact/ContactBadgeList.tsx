import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import { motion } from "@/theme/motion";
import { contactSpace } from "@/theme/spacing";
import type { ContactBadgeListProps } from "@/types/contact";

import { ContactBadge } from "./ContactBadge";

export const ContactBadgeList = ({ badges }: ContactBadgeListProps) => {
    const riseStyle = useRiseEntrance(motion.delay.riseContactHeading);
    const listStyle = [styles.list, riseStyle];

    return (
        <Animated.View style={listStyle}>
            {badges.map((badge) => (
                <ContactBadge badge={badge} key={badge.id} />
            ))}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    list: {
        alignItems: "stretch",
        alignSelf: "stretch",
        gap: contactSpace.badgeListGap,
        maxWidth: contactSpace.badgeListMaxWidth,
        width: "100%",
    },
});
