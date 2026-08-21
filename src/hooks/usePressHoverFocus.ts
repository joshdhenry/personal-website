import { useCallback, useEffect, useRef, useState } from "react";

export type PressHoverFocusState = {
    isActive: boolean;
    isFocused: boolean;
    onBlur: () => void;
    onFocus: () => void;
    onHoverIn: () => void;
    onHoverOut: () => void;
    onPressIn: () => void;
    onPressOut: () => void;
};

/**
 * Press/hover/focus state machine shared by every interactive badge and
 * link. isActive is hover OR press (kept as two booleans so releasing a
 * press while still hovered doesn't clear active). onActiveChange fires
 * from an effect on isActive, not inline, so same-tick handler pairs (a
 * keyboard Enter's onPressIn+onPressOut) can't drop a transition.
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
        // onActiveChange is a fresh closure every render; including it would
        // fire this effect on every render, not just real transitions.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    const onBlur = useCallback(() => setIsFocused(false), []);
    const onFocus = useCallback(() => setIsFocused(true), []);
    const onHoverIn = useCallback(() => setIsHovering(true), []);
    const onHoverOut = useCallback(() => setIsHovering(false), []);
    // A fresh press-in must not let a stale deferred release (see
    // onPressOut) clear isPressing out from under it later.
    const onPressIn = useCallback(() => {
        if (pendingPressOutTimeoutRef.current !== null) {
            clearTimeout(pendingPressOutTimeoutRef.current);
            pendingPressOutTimeoutRef.current = null;
        }
        setIsPressing(true);
    }, []);
    // A keyboard Enter/Space fires onPressIn then onPressOut same-tick;
    // clearing isPressing synchronously would batch away the active(true)
    // render before the press-feedback spring ever sees it.
    const onPressOut = useCallback(() => {
        pendingPressOutTimeoutRef.current = setTimeout(() => {
            pendingPressOutTimeoutRef.current = null;
            setIsPressing(false);
        }, 0);
    }, []);

    return {
        onBlur,
        onFocus,
        onHoverIn,
        onHoverOut,
        onPressIn,
        onPressOut,
        isActive,
        isFocused,
    };
};
