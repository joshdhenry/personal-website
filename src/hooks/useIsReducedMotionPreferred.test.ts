import { renderHook, waitFor } from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";

import { useIsReducedMotionPreferred } from "./useIsReducedMotionPreferred";

describe("useIsReducedMotionPreferred", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("resolves to true when the platform reports reduce-motion enabled", async () => {
        jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockResolvedValue(true);
        const removeSpy = jest.fn();
        jest.spyOn(AccessibilityInfo, "addEventListener").mockReturnValue({
            remove: removeSpy,
        } as unknown as ReturnType<typeof AccessibilityInfo.addEventListener>);

        const { result } = renderHook(() => useIsReducedMotionPreferred());

        await waitFor(() => expect(result.current).toBe(true));
    });

    it("resolves to false when the platform reports reduce-motion disabled", async () => {
        jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockResolvedValue(false);
        jest.spyOn(AccessibilityInfo, "addEventListener").mockReturnValue({
            remove: jest.fn(),
        } as unknown as ReturnType<typeof AccessibilityInfo.addEventListener>);

        const { result } = renderHook(() => useIsReducedMotionPreferred());

        await waitFor(() => expect(result.current).toBe(false));
    });

    it("unsubscribes its change listener on unmount", async () => {
        jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockResolvedValue(false);
        const removeSpy = jest.fn();
        jest.spyOn(AccessibilityInfo, "addEventListener").mockReturnValue({
            remove: removeSpy,
        } as unknown as ReturnType<typeof AccessibilityInfo.addEventListener>);

        const { unmount } = renderHook(() => useIsReducedMotionPreferred());
        unmount();

        expect(removeSpy).toHaveBeenCalledTimes(1);
    });
});
