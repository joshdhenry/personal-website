import { useEffect, useRef, useState } from "react";

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
 * focused flag for the web keyboard focus ring. Hover and press are two
 * independent booleans rather than one shared flag, so releasing a press
 * while the cursor is still over the element (the ordinary end of a click)
 * doesn't clear active state that hover is still holding.
 *
 * onActiveChange fires from an effect watching the derived isActive value,
 * not inline inside the hover/press handlers themselves. Two handlers
 * called back to back in the same tick (e.g. a keyboard Enter/Space firing
 * onPressIn then onPressOut with no render in between) would each close
 * over the same pre-update state if compared inline, silently dropping a
 * transition; an effect always sees the settled, post-render value, so it
 * can't be fooled by same-tick call ordering.
 */
export const usePressHoverFocus = (
    onActiveChange?: (active: boolean) => void,
): PressHoverFocusState => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPressing, setIsPressing] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isHovering || isPressing;
    const hasMountedRef = useRef(false);

    useEffect(() => {
        if (hasMountedRef.current) {
            onActiveChange?.(isActive);
        } else {
            hasMountedRef.current = true;
        }
        // onActiveChange is passed as a fresh closure on every render by
        // every caller here; including it would fire this effect (and the
        // spring it drives) on every render instead of only on real
        // hover/press transitions.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    return {
        handleBlur: () => setIsFocused(false),
        handleFocus: () => setIsFocused(true),
        handleHoverIn: () => setIsHovering(true),
        handleHoverOut: () => setIsHovering(false),
        handlePressIn: () => setIsPressing(true),
        handlePressOut: () => setIsPressing(false),
        isActive,
        isFocused,
    };
};
