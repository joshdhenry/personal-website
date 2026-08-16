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
 * pitch card's CTA): active while hovered or pressed, plus a separate
 * focused flag for the web keyboard focus ring. Hover and press are tracked
 * as two independent flags rather than one shared boolean, so releasing a
 * press while the cursor is still over the element (the ordinary end of a
 * click) doesn't clear active state that hover is still holding - onPressOut
 * fires before onHoverOut on web, so a single shared flag would flicker the
 * element back to its resting look for a frame while still under the
 * cursor. onActiveChange is the hook for a caller's own spring animation
 * (scale, lift, underline) to run alongside the combined state's changes.
 */
export const usePressHoverFocus = (
    onActiveChange?: (active: boolean) => void,
): PressHoverFocusState => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPressing, setIsPressing] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isHovering || isPressing;

    const setHovering = (hovering: boolean) => {
        setIsHovering(hovering);
        const nextActive = hovering || isPressing;

        if (nextActive !== isActive) {
            onActiveChange?.(nextActive);
        }
    };

    const setPressing = (pressing: boolean) => {
        setIsPressing(pressing);
        const nextActive = isHovering || pressing;

        if (nextActive !== isActive) {
            onActiveChange?.(nextActive);
        }
    };

    return {
        handleBlur: () => setIsFocused(false),
        handleFocus: () => setIsFocused(true),
        handleHoverIn: () => setHovering(true),
        handleHoverOut: () => setHovering(false),
        handlePressIn: () => setPressing(true),
        handlePressOut: () => setPressing(false),
        isActive,
        isFocused,
    };
};
