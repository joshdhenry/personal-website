import { act, renderHook } from "@testing-library/react-native";

import type { SectionOffsets } from "@/types/nav";

import { useScrollSpy } from "./useScrollSpy";

describe("useScrollSpy", () => {
    const navHeight = 64;
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
                navHeight,
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
            result.current.updateFromScroll(2500 - navHeight, false);
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
            result.current.updateFromScroll(3000 - navHeight, false);
        });

        expect(result.current.currentSectionId).toBe("about");
    });

    it("resumes tracking scroll position once it reaches the clicked target", () => {
        const { result } = renderScrollSpy(0);

        act(() => {
            result.current.onLinkPress("about");
        });
        act(() => {
            result.current.updateFromScroll(4000 - navHeight, false);
        });

        expect(result.current.currentSectionId).toBe("about");

        act(() => {
            result.current.updateFromScroll(5000 - navHeight, false);
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
            result.current.updateFromScroll(3000 - navHeight, false);
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
            result.current.updateFromScroll(3000 - navHeight, false);
        });

        expect(result.current.currentSectionId).toBe("experience");

        jest.useRealTimers();
    });

    it("resolves from the latest scroll position when the safety-net timeout fires, instead of leaving a stale highlight", () => {
        jest.useFakeTimers();

        const { result } = renderScrollSpy(0);

        act(() => {
            result.current.onLinkPress("about");
        });
        // A scroll frame arrives but never reaches "about" before the
        // animation stalls out and no further onScroll event fires.
        act(() => {
            result.current.updateFromScroll(3000 - navHeight, false);
        });
        act(() => {
            jest.runAllTimers();
        });

        expect(result.current.currentSectionId).toBe("experience");

        jest.useRealTimers();
    });

    it("releases a pending target once scroll reverses back past where the click started, even without a drag event", () => {
        const { result } = renderScrollSpy(2000);

        // Establishes a starting section other than the default "top",
        // mirroring an onScrollBeginDrag-less platform (web): the only
        // guard-release signal is derived from scroll position itself.
        act(() => {
            result.current.updateFromScroll(2000, false);
        });
        act(() => {
            result.current.onLinkPress("about");
        });
        act(() => {
            result.current.updateFromScroll(1000 - navHeight, false);
        });

        expect(result.current.currentSectionId).toBe("projects");
    });

    it("keeps the clicked section highlighted when the safety-net timeout fires and no real scroll ever landed", () => {
        // Android repro: scrollTo() can silently fail to move anything, so
        // latestScrollRef never updates past its pre-click value.
        jest.useFakeTimers();

        const { result } = renderScrollSpy(2000);

        act(() => {
            result.current.updateFromScroll(2000, false);
        });
        expect(result.current.currentSectionId).toBe("skills");

        act(() => {
            result.current.onLinkPress("experience");
        });
        expect(result.current.currentSectionId).toBe("experience");

        act(() => {
            jest.runAllTimers();
        });

        expect(result.current.currentSectionId).toBe("experience");

        jest.useRealTimers();
    });

    it("keeps the clicked section highlighted when scrolling upward and no real scroll ever landed", () => {
        jest.useFakeTimers();

        const { result } = renderScrollSpy(3000);

        act(() => {
            result.current.updateFromScroll(3000, false);
        });
        expect(result.current.currentSectionId).toBe("experience");

        act(() => {
            result.current.onLinkPress("top");
        });
        expect(result.current.currentSectionId).toBe("top");

        act(() => {
            jest.runAllTimers();
        });

        expect(result.current.currentSectionId).toBe("top");

        jest.useRealTimers();
    });

    it("resolves to where scroll actually stalled, not the clicked target, when progress never crosses a section boundary", () => {
        jest.useFakeTimers();

        const { result } = renderScrollSpy(0);

        act(() => {
            result.current.onLinkPress("contact");
        });
        // Real progress, but short of even the first section's threshold.
        act(() => {
            result.current.updateFromScroll(500, false);
        });
        act(() => {
            jest.runAllTimers();
        });

        expect(result.current.currentSectionId).toBe("top");

        jest.useRealTimers();
    });

    it("releases a pending target once scroll returns to exactly the start section, after genuinely progressing past it", () => {
        const { result } = renderScrollSpy(0);

        act(() => {
            result.current.onLinkPress("experience");
        });
        // Genuine forward progress into "skills", short of the target.
        act(() => {
            result.current.updateFromScroll(2500 - navHeight, false);
        });
        // Reverses all the way back to exactly the click's starting section -
        // comparing only against the original start (not the furthest point
        // reached) would miss this, since "top" trivially satisfies "at or
        // past top".
        act(() => {
            result.current.updateFromScroll(0, false);
        });

        expect(result.current.currentSectionId).toBe("top");
    });
});
