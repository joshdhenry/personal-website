import { act, renderHook } from "@testing-library/react-native";

import { usePressHoverFocus } from "./usePressHoverFocus";

describe("usePressHoverFocus", () => {
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

        act(() => result.current.handlePressOut());
        expect(result.current.isActive).toBe(false);
    });

    it("stays active on press-out while still hovering (the ordinary end of a web click)", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        act(() => result.current.handleHoverIn());
        act(() => result.current.handlePressIn());
        act(() => result.current.handlePressOut());

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

        act(() => result.current.handlePressOut());
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
        act(() => result.current.handlePressOut());
        expect(onActiveChange).not.toHaveBeenCalled();

        act(() => result.current.handleHoverOut());
        expect(onActiveChange).toHaveBeenLastCalledWith(false);
    });

    it("doesn't drop the reset call when press-in and press-out land in the same update batch", () => {
        // A keyboard Enter/Space activation on web commonly fires
        // onPressIn then onPressOut synchronously with no render in
        // between - simulated here by calling both inside one act().
        const onActiveChange = jest.fn();
        const { result } = renderHook(() => usePressHoverFocus(onActiveChange));

        act(() => {
            result.current.handlePressIn();
            result.current.handlePressOut();
        });

        expect(result.current.isActive).toBe(false);
        expect(onActiveChange).not.toHaveBeenCalled();
    });
});
