import Animated from "react-native-reanimated";

import { useRiseEntrance } from "@/hooks/useRiseEntrance";
import type { ProjectDetailRevealProps } from "@/types/projects";

/**
 * Wraps a card's expanded detail content so useRiseEntrance is called on
 * THIS component's own mount, not the always-mounted card's. The card only
 * renders this when isOpen is true, so every open is a fresh mount and the
 * spring replays every time - calling the hook directly in the card (which
 * never unmounts) would only ever animate once, invisibly, before the card
 * was ever opened.
 */
export const ProjectDetailReveal = ({ children, style }: ProjectDetailRevealProps) => {
    const riseStyle = useRiseEntrance(0);

    return <Animated.View style={[style, riseStyle]}>{children}</Animated.View>;
};
