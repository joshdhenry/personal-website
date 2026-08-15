import { renderHook } from "@testing-library/react-native";

import { useScrollToSection } from "./useScrollToSection";

describe("useScrollToSection", () => {
    it("scrolls to a section's last-measured offset", () => {
        const scrollTo = jest.fn();
        const scrollViewRef = { current: { scrollTo } };
        const sectionOffsets = { current: { about: 1200, contact: 3000, top: 0 } };

        const { result } = renderHook(() =>
            useScrollToSection({
                scrollViewRef,
                sectionOffsets,
            } as never),
        );

        result.current("about");

        expect(scrollTo).toHaveBeenCalledWith({ animated: true, y: 1200 });
    });

    it("does nothing when the ScrollView ref isn't attached yet", () => {
        const scrollViewRef = { current: null };
        const sectionOffsets = { current: { top: 0 } };

        const { result } = renderHook(() =>
            useScrollToSection({
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
                scrollViewRef,
                sectionOffsets,
            } as never),
        );

        result.current("contact");

        expect(scrollTo).not.toHaveBeenCalled();
    });
});
