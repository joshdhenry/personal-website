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

        act(() => result.current.handleHoverIn());
        expect(result.current.isActive).toBe(true);

        act(() => result.current.handleHoverOut());
        expect(result.current.isActive).toBe(false);

        act(() => result.current.handlePressIn());
        expect(result.current.isActive).toBe(true);

        act(() => {
            result.current.handlePressOut();
            jest.runAllTimers();
        });
        expect(result.current.isActive).toBe(false);
    });

    it("stays active on press-out while still hovering (the ordinary end of a web click)", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        act(() => result.current.handleHoverIn());
        act(() => result.current.handlePressIn());
        act(() => {
            result.current.handlePressOut();
            jest.runAllTimers();
        });

        expect(result.current.isActive).toBe(true);

        act(() => result.current.handleHoverOut());
        expect(result.current.isActive).toBe(false);
    });

    it("stays active on hover-out while still pressing", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        act(() => result.current.handlePressIn());
        act(() => result.current.handleHoverIn());
        act(() => result.current.handleHoverOut());

        expect(result.current.isActive).toBe(true);

        act(() => {
            result.current.handlePressOut();
            jest.runAllTimers();
        });
        expect(result.current.isActive).toBe(false);
    });

    it("tracks focus independently of active state", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        act(() => result.current.handleFocus());
        expect(result.current.isFocused).toBe(true);
        expect(result.current.isActive).toBe(false);

        act(() => result.current.handleBlur());
        expect(result.current.isFocused).toBe(false);
    });

    it("calls onActiveChange only when the combined active state actually changes", () => {
        const onActiveChange = jest.fn();
        const { result } = renderHook(() => usePressHoverFocus(onActiveChange));

        act(() => result.current.handleHoverIn());
        expect(onActiveChange).toHaveBeenLastCalledWith(true);

        onActiveChange.mockClear();
        act(() => result.current.handlePressIn());
        act(() => {
            result.current.handlePressOut();
            jest.runAllTimers();
        });
        expect(onActiveChange).not.toHaveBeenCalled();

        act(() => result.current.handleHoverOut());
        expect(onActiveChange).toHaveBeenLastCalledWith(false);
    });

    it("still fires onActiveChange for a same-tick keyboard press (Enter/Space)", () => {
        // A keyboard Enter/Space activation on web commonly fires onPressIn
        // then onPressOut synchronously with no render in between -
        // simulated here by calling both inside one act(). handlePressOut
        // defers its state clear so the pressed-true render still commits
        // (and the press-feedback spring still fires) before release.
        const onActiveChange = jest.fn();
        const { result } = renderHook(() => usePressHoverFocus(onActiveChange));

        act(() => {
            result.current.handlePressIn();
            result.current.handlePressOut();
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

        act(() => result.current.handlePressIn());
        act(() => result.current.handlePressOut());
        // Re-press lands before the deferred release from the prior
        // handlePressOut fires; that stale timeout must not clear this one.
        act(() => result.current.handlePressIn());
        act(() => jest.runAllTimers());

        expect(result.current.isActive).toBe(true);
        expect(onActiveChange).not.toHaveBeenCalledWith(false);
    });

    it("clears a pending deferred release on unmount", () => {
        const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
        const { result, unmount } = renderHook(() => usePressHoverFocus());

        act(() => result.current.handlePressIn());
        act(() => result.current.handlePressOut());
        clearTimeoutSpy.mockClear();

        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
        clearTimeoutSpy.mockRestore();
    });
});
