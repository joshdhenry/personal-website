import { act, renderHook } from "@testing-library/react-native";

import { usePressScale } from "./usePressScale";

describe("usePressScale", () => {
    it("only transforms scale, with no lift, when liftDistance is 0 (the default)", () => {
        const { result } = renderHook(() => usePressScale());

        expect(result.current.animatedStyle.transform).toEqual([{ scale: 1 }]);
    });

    it("also transforms translateY when a non-zero liftDistance is passed", () => {
        const { result } = renderHook(() => usePressScale(-4));

        expect(result.current.animatedStyle.transform).toEqual([{ scale: 1 }, { translateY: 0 }]);
    });

    it("passes through the underlying press/hover/focus state", () => {
        const { result } = renderHook(() => usePressScale());

        expect(result.current.isActive).toBe(false);
        expect(result.current.isFocused).toBe(false);

        act(() => result.current.handleFocus());

        expect(result.current.isFocused).toBe(true);
    });
});
