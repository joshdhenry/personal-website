import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

import type { PressHoverFocusState } from "@/types/interaction";

// Press/hover/focus state machine shared by every interactive badge/link.
// isActive is hover OR press (two booleans, so releasing a press while
// still hovered doesn't clear active).
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

    // Fires from an effect on isActive, not inline in the handlers below, so
    // a same-tick keyboard Enter (onPressIn then onPressOut, no render
    // between) can't close over stale state and drop the transition.
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
        isActive,
        isFocused,
        onBlur,
        onFocus,
        onHoverIn,
        onHoverOut,
        onPressIn,
        onPressOut,
        showFocusRing: Platform.OS === "web" && isFocused,
    };
};
