import { useCallback, useEffect, useRef, useState } from "react";

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
    const pendingPressOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (pendingPressOutTimeoutRef.current !== null) {
                clearTimeout(pendingPressOutTimeoutRef.current);
            }
        };
    }, []);

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

    const handleBlur = useCallback(() => setIsFocused(false), []);
    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleHoverIn = useCallback(() => setIsHovering(true), []);
    const handleHoverOut = useCallback(() => setIsHovering(false), []);
    // A pending deferred release (see handlePressOut) belongs to the press it
    // was scheduled for; a fresh press-in must not let that stale timeout
    // clear isPressing out from under it later.
    const handlePressIn = useCallback(() => {
        if (pendingPressOutTimeoutRef.current !== null) {
            clearTimeout(pendingPressOutTimeoutRef.current);
            pendingPressOutTimeoutRef.current = null;
        }
        setIsPressing(true);
    }, []);
    // RN Web fires onPressIn then onPressOut in the same tick for a keyboard
    // Enter/Space activation (no hover involved), so clearing isPressing
    // synchronously here would batch away the isActive(true) render entirely
    // before the press-feedback spring above ever sees it. Deferring the
    // clear to the next tick guarantees that render commits first.
    const handlePressOut = useCallback(() => {
        pendingPressOutTimeoutRef.current = setTimeout(() => {
            pendingPressOutTimeoutRef.current = null;
            setIsPressing(false);
        }, 0);
    }, []);

    return {
        handleBlur,
        handleFocus,
        handleHoverIn,
        handleHoverOut,
        handlePressIn,
        handlePressOut,
        isActive,
        isFocused,
    };
};
