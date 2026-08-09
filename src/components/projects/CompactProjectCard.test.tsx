import { fireEvent, render, screen } from "@testing-library/react-native";

import { useIsReducedMotionPreferred } from "@/hooks/useIsReducedMotionPreferred";
import type { CompactProject } from "@/types/projects";

import { CompactProjectCard } from "./CompactProjectCard";

jest.mock("@/hooks/useIsReducedMotionPreferred");

const mockedUseIsReducedMotionPreferred = jest.mocked(useIsReducedMotionPreferred);

const testProject: CompactProject = {
    id: "test-project",
    image: 1,
    imageAlt: "Test Project",
    paragraph: "A paragraph describing the test project in detail.",
    techLine: "Swift",
    tier: "compact",
    title: "Test Project",
};

describe("CompactProjectCard", () => {
    beforeEach(() => {
        mockedUseIsReducedMotionPreferred.mockReturnValue(true);
    });

    afterEach(() => {
        mockedUseIsReducedMotionPreferred.mockReset();
    });

    it("starts collapsed, hiding the detail paragraph and labeling itself with the tech line", () => {
        render(<CompactProjectCard project={testProject} />);

        expect(
            screen.queryByText(testProject.paragraph, { includeHiddenElements: true }),
        ).toBeNull();
        expect(screen.getByLabelText("Test Project, Swift")).toBeTruthy();
        expect(screen.getByLabelText("Test Project, Swift").props.accessibilityState).toEqual({
            expanded: false,
        });
    });

    it("expands to reveal the paragraph on press, then collapses again on a second press", () => {
        render(<CompactProjectCard project={testProject} />);

        const card = screen.getByLabelText("Test Project, Swift");
        fireEvent.press(card);

        expect(
            screen.getByText(testProject.paragraph, { includeHiddenElements: true }),
        ).toBeTruthy();
        expect(card.props.accessibilityState).toEqual({ expanded: true });

        fireEvent.press(card);

        expect(
            screen.queryByText(testProject.paragraph, { includeHiddenElements: true }),
        ).toBeNull();
        expect(card.props.accessibilityState).toEqual({ expanded: false });
    });
});
