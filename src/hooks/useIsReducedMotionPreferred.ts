import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

/**
 * Reads the platform's reduce-motion accessibility preference. On web this
 * maps to prefers-reduced-motion; on iOS/Android it maps to the OS-level
 * reduce-motion setting. One hook covers both per React Native's
 * AccessibilityInfo API, no platform branching needed at call sites.
 */
export const useIsReducedMotionPreferred = (): boolean => {
    const [isReducedMotionPreferred, setIsReducedMotionPreferred] = useState(false);

    useEffect(() => {
        let isMounted = true;

        AccessibilityInfo.isReduceMotionEnabled().then((isEnabled) => {
            if (isMounted) {
                setIsReducedMotionPreferred(isEnabled);
            }
        });

        const subscription = AccessibilityInfo.addEventListener(
            "reduceMotionChanged",
            setIsReducedMotionPreferred,
        );

        return () => {
            isMounted = false;
            subscription.remove();
        };
    }, []);

    return isReducedMotionPreferred;
};
