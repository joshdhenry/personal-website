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

    it("tracks focus independently of active state", () => {
        const { result } = renderHook(() => usePressHoverFocus());

        act(() => result.current.handleFocus());
        expect(result.current.isFocused).toBe(true);
        expect(result.current.isActive).toBe(false);

        act(() => result.current.handleBlur());
        expect(result.current.isFocused).toBe(false);
    });

    it("calls onActiveChange with the new active state on every transition", () => {
        const onActiveChange = jest.fn();
        const { result } = renderHook(() => usePressHoverFocus(onActiveChange));

        act(() => result.current.handleHoverIn());
        expect(onActiveChange).toHaveBeenLastCalledWith(true);

        act(() => result.current.handlePressOut());
        expect(onActiveChange).toHaveBeenLastCalledWith(false);
    });
});
