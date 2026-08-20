import { renderHook } from "@testing-library/react-native";

import { useScrollToSection } from "./useScrollToSection";

describe("useScrollToSection", () => {
    it("scrolls to a section's last-measured offset minus the sticky nav's height", () => {
        const scrollTo = jest.fn();
        const scrollViewRef = { current: { scrollTo } };
        const sectionOffsets = { current: { about: 1200, contact: 3000, top: 0 } };

        const { result } = renderHook(() =>
            useScrollToSection({
                navHeightEstimate: 64,
                scrollViewRef,
                sectionOffsets,
            } as never),
        );

        result.current("about");

        expect(scrollTo).toHaveBeenCalledWith({ animated: true, y: 1136 });
    });

    it("clamps to 0 rather than scrolling to a negative offset", () => {
        const scrollTo = jest.fn();
        const scrollViewRef = { current: { scrollTo } };
        const sectionOffsets = { current: { top: 0 } };

        const { result } = renderHook(() =>
            useScrollToSection({
                navHeightEstimate: 64,
                scrollViewRef,
                sectionOffsets,
            } as never),
        );

        result.current("top");

        expect(scrollTo).toHaveBeenCalledWith({ animated: true, y: 0 });
    });

    it("does nothing when the ScrollView ref isn't attached yet", () => {
        const scrollViewRef = { current: null };
        const sectionOffsets = { current: { top: 0 } };

        const { result } = renderHook(() =>
            useScrollToSection({
                navHeightEstimate: 64,
                scrollViewRef,
                sectionOffsets,
            } as never),
        );

        expect(() => result.current("top")).not.toThrow();
    });

    it("does not scroll to a section whose offset hasn't been measured yet", () => {
        const scrollTo = jest.fn();
        const scrollViewRef = { current: { scrollTo } };
        const sectionOffsets = { current: { contact: null, top: 0 } };

        const { result } = renderHook(() =>
            useScrollToSection({
                navHeightEstimate: 64,
                scrollViewRef,
                sectionOffsets,
            } as never),
        );

        result.current("contact");

        expect(scrollTo).not.toHaveBeenCalled();
    });
});
