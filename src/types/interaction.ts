import type { useAnimatedStyle } from "react-native-reanimated";

export type PressHoverFocusState = {
    isActive: boolean;
    isFocused: boolean;
    onBlur: () => void;
    onFocus: () => void;
    onHoverIn: () => void;
    onHoverOut: () => void;
    onPressIn: () => void;
    onPressOut: () => void;
    showFocusRing: boolean;
};

export type PressScaleState = PressHoverFocusState & {
    animatedStyle: ReturnType<typeof useAnimatedStyle>;
};
