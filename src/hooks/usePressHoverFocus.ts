import { useState } from "react";

export type PressHoverFocusState = {
    handleBlur: () => void;
    handleFocus: () => void;
    handleHoverIn: () => void;
    handleHoverOut: () => void;
    handlePressIn: () => void;
    handlePressOut: () => void;
    isActive: boolean;
    isFocused: boolean;
};

/**
 * The press/hover/focus state machine shared by every interactive badge and
 * link in this app (nav links, action badges, external-link badges, the
 * pitch card's CTA): active on hover-in or press-in, inactive on hover-out
 * or press-out, plus a separate focused flag for the web keyboard focus
 * ring. onActiveChange is the hook for a caller's own spring animation
 * (scale, lift, underline) to run alongside the state change.
 */
export const usePressHoverFocus = (
    onActiveChange?: (active: boolean) => void,
): PressHoverFocusState => {
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const setActive = (active: boolean) => {
        setIsActive(active);
        onActiveChange?.(active);
    };

    return {
        handleBlur: () => setIsFocused(false),
        handleFocus: () => setIsFocused(true),
        handleHoverIn: () => setActive(true),
        handleHoverOut: () => setActive(false),
        handlePressIn: () => setActive(true),
        handlePressOut: () => setActive(false),
        isActive,
        isFocused,
    };
};
