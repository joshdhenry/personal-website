import { act, renderHook } from "@testing-library/react-native";

import type { SectionOffsets } from "@/types/nav";

import { useScrollSpy } from "./useScrollSpy";

describe("useScrollSpy", () => {
    const navHeightEstimate = 64;
    const sectionOffsets: { current: SectionOffsets } = {
        current: {
            about: 4000,
            contact: 5000,
            experience: 3000,
            projects: 1000,
            skills: 2000,
            top: 0,
        },
    };

    const renderScrollSpy = (scrollYValue = 0, offsets = sectionOffsets) => {
        const scrollToSection = jest.fn();
        const scrollY = { value: scrollYValue };
        const { result } = renderHook(() =>
            useScrollSpy({
                navHeightEstimate,
                scrollToSection,
                scrollY,
                sectionOffsets: offsets,
            } as never),
        );

        return { result, scrollToSection, scrollY };
    };

    it("starts at the top section", () => {
        const { result } = renderScrollSpy();

        expect(result.current.currentSectionId).toBe("top");
    });

    it("resolves the current section from scroll position via updateFromScroll", () => {
        const { result } = renderScrollSpy();

        act(() => {
            result.current.updateFromScroll(2500 - navHeightEstimate, false);
        });

        expect(result.current.currentSectionId).toBe("skills");
    });

    it("selects the clicked section immediately and scrolls to it", () => {
        const { result, scrollToSection } = renderScrollSpy(0);

        act(() => {
            result.current.onLinkPress("about");
        });

        expect(result.current.currentSectionId).toBe("about");
        expect(scrollToSection).toHaveBeenCalledWith("about");
    });

    it("does nothing for a click on a section whose offset hasn't measured yet", () => {
        const unmeasuredOffsets = { current: { ...sectionOffsets.current, contact: null } };
        const { result, scrollToSection } = renderScrollSpy(0, unmeasuredOffsets);

        act(() => {
            result.current.onLinkPress("contact");
        });

        expect(result.current.currentSectionId).toBe("top");
        expect(scrollToSection).not.toHaveBeenCalled();
    });

    it("ignores intermediate onScroll updates short of a click's target section", () => {
        const { result } = renderScrollSpy(0);

        act(() => {
            result.current.onLinkPress("about");
        });

        // Simulates an animated scrollTo()'s imprecise intermediate frames,
        // still resolving to a section before the clicked target.
        act(() => {
            result.current.updateFromScroll(3000 - navHeightEstimate, false);
        });

        expect(result.current.currentSectionId).toBe("about");
    });

    it("resumes tracking scroll position once it reaches the clicked target", () => {
        const { result } = renderScrollSpy(0);

        act(() => {
            result.current.onLinkPress("about");
        });
        act(() => {
            result.current.updateFromScroll(4000 - navHeightEstimate, false);
        });

        expect(result.current.currentSectionId).toBe("about");

        act(() => {
            result.current.updateFromScroll(5000 - navHeightEstimate, false);
        });

        expect(result.current.currentSectionId).toBe("contact");
    });

    it("lets a real drag gesture override a pending click target immediately", () => {
        const { result } = renderScrollSpy(0);

        act(() => {
            result.current.onLinkPress("about");
        });
        act(() => {
            result.current.onScrollBeginDrag();
        });
        act(() => {
            result.current.updateFromScroll(3000 - navHeightEstimate, false);
        });

        expect(result.current.currentSectionId).toBe("experience");
    });

    it("clears a stale pending target once the safety-net timeout elapses", () => {
        jest.useFakeTimers();

        const { result } = renderScrollSpy(0);

        act(() => {
            result.current.onLinkPress("about");
        });
        act(() => {
            jest.runAllTimers();
        });
        act(() => {
            result.current.updateFromScroll(3000 - navHeightEstimate, false);
        });

        expect(result.current.currentSectionId).toBe("experience");

        jest.useRealTimers();
    });
});
