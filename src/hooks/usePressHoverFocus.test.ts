import { act, renderHook } from "@testing-library/react-native";

import { usePressHoverFocus } from "./usePressHoverFocus";

describe("usePressHoverFocus", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("starts inactive and unfocused", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        expect(result.current.isActive).toBe(false);
        expect(result.current.isFocused).toBe(false);
    });

    it("activates on hover-in and press-in, deactivates on hover-out and press-out", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        act(() => result.current.onHoverIn());
        expect(result.current.isActive).toBe(true);

        act(() => result.current.onHoverOut());
        expect(result.current.isActive).toBe(false);

        act(() => result.current.onPressIn());
        expect(result.current.isActive).toBe(true);

        act(() => {
            result.current.onPressOut();
            jest.runAllTimers();
        });
        expect(result.current.isActive).toBe(false);
    });

    it("stays active on press-out while still hovering (the ordinary end of a web click)", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        act(() => result.current.onHoverIn());
        act(() => result.current.onPressIn());
        act(() => {
            result.current.onPressOut();
            jest.runAllTimers();
        });

        expect(result.current.isActive).toBe(true);

        act(() => result.current.onHoverOut());
        expect(result.current.isActive).toBe(false);
    });

    it("stays active on hover-out while still pressing", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        act(() => result.current.onPressIn());
        act(() => result.current.onHoverIn());
        act(() => result.current.onHoverOut());

        expect(result.current.isActive).toBe(true);

        act(() => {
            result.current.onPressOut();
            jest.runAllTimers();
        });
        expect(result.current.isActive).toBe(false);
    });

    it("tracks focus independently of active state", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        act(() => result.current.onFocus());
        expect(result.current.isFocused).toBe(true);
        expect(result.current.isActive).toBe(false);

        act(() => result.current.onBlur());
        expect(result.current.isFocused).toBe(false);
    });

    it("never shows a focus ring while unfocused", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        expect(result.current.showFocusRing).toBe(false);
    });

    it("calls onActiveChange only when the combined active state actually changes", () => {
        const onActiveChange = jest.fn();
        const { result } = renderHook(() => usePressHoverFocus(onActiveChange));

        act(() => result.current.onHoverIn());
        expect(onActiveChange).toHaveBeenLastCalledWith(true);

        onActiveChange.mockClear();
        act(() => result.current.onPressIn());
        act(() => {
            result.current.onPressOut();
            jest.runAllTimers();
        });
        expect(onActiveChange).not.toHaveBeenCalled();

        act(() => result.current.onHoverOut());
        expect(onActiveChange).toHaveBeenLastCalledWith(false);
    });

    it("still fires onActiveChange for a same-tick keyboard press (Enter/Space)", () => {
        // Simulates onPressIn+onPressOut firing synchronously (a keyboard
        // Enter/Space on web) - onPressOut defers its clear so the
        // pressed-true render still commits first.
        const onActiveChange = jest.fn();
        const { result } = renderHook(() => usePressHoverFocus(onActiveChange));

        act(() => {
            result.current.onPressIn();
            result.current.onPressOut();
        });

        expect(result.current.isActive).toBe(true);
        expect(onActiveChange).toHaveBeenLastCalledWith(true);

        act(() => jest.runAllTimers());

        expect(result.current.isActive).toBe(false);
        expect(onActiveChange).toHaveBeenLastCalledWith(false);
    });

    it("cancels a pending deferred release when a new press starts before it fires", () => {
        const onActiveChange = jest.fn();
        const { result } = renderHook(() => usePressHoverFocus(onActiveChange));

        act(() => result.current.onPressIn());
        act(() => result.current.onPressOut());
        // Re-press lands before the deferred release from the prior
        // onPressOut fires; that stale timeout must not clear this one.
        act(() => result.current.onPressIn());
        act(() => jest.runAllTimers());

        expect(result.current.isActive).toBe(true);
        expect(onActiveChange).not.toHaveBeenCalledWith(false);
    });

    it("clears a pending deferred release on unmount", () => {
        const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
        const { result, unmount } = renderHook(() => usePressHoverFocus());

        act(() => result.current.onPressIn());
        act(() => result.current.onPressOut());
        clearTimeoutSpy.mockClear();

        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        clearTimeoutSpy.mockRestore();
    });
});
