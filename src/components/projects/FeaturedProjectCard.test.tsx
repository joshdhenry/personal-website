import { fireEvent, render, screen } from "@testing-library/react-native";

import { useIsReducedMotionPreferred } from "@/hooks/useIsReducedMotionPreferred";
import type { FeaturedProject } from "@/types/projects";

import { FeaturedProjectCard } from "./FeaturedProjectCard";

jest.mock("@/hooks/useIsReducedMotionPreferred");

const mockedUseIsReducedMotionPreferred = jest.mocked(useIsReducedMotionPreferred);

const baseProject: FeaturedProject = {
    id: "test-project",
    image: 1,
    imageAlt: "Test Project",
    isWordmarkImage: false,
    problem: "A problem statement.",
    spansBothColumns: false,
    stackChips: ["React Native", "TypeScript"],
    stackSentence: "React Native, TypeScript.",
    subtitle: "A test subtitle",
    tier: "featured",
    title: "Test Project",
    whatIBuilt: "What was built.",
};

describe("FeaturedProjectCard", () => {
    beforeEach(() => {
        mockedUseIsReducedMotionPreferred.mockReturnValue(true);
    });

    afterEach(() => {
        mockedUseIsReducedMotionPreferred.mockReset();
    });

    it("starts collapsed, hiding every detail field and labeling itself with the subtitle", () => {
        render(<FeaturedProjectCard project={baseProject} />);

        expect(screen.queryByText(baseProject.problem, { includeHiddenElements: true })).toBeNull();
        expect(screen.getByLabelText("Test Project, A test subtitle")).toBeTruthy();
        expect(
            screen.getByLabelText("Test Project, A test subtitle").props.accessibilityState,
        ).toEqual({ expanded: false });
    });

    it("expands to reveal PROBLEM, WHAT I BUILT, and STACK, then collapses again on a second press", () => {
        render(<FeaturedProjectCard project={baseProject} />);

        const card = screen.getByLabelText("Test Project, A test subtitle");
        fireEvent.press(card);

        expect(screen.getByText(baseProject.problem, { includeHiddenElements: true })).toBeTruthy();
        expect(
            screen.getByText(baseProject.whatIBuilt, { includeHiddenElements: true }),
        ).toBeTruthy();
        expect(
            screen.getByText(baseProject.stackSentence, { includeHiddenElements: true }),
        ).toBeTruthy();
        expect(card.props.accessibilityState).toEqual({ expanded: true });

        fireEvent.press(card);

        expect(screen.queryByText(baseProject.problem, { includeHiddenElements: true })).toBeNull();
        expect(card.props.accessibilityState).toEqual({ expanded: false });
    });

    it("omits OUTCOME when the project has none", () => {
        render(<FeaturedProjectCard project={baseProject} />);
        fireEvent.press(screen.getByLabelText("Test Project, A test subtitle"));
        expect(screen.queryByText("OUTCOME", { includeHiddenElements: true })).toBeNull();
    });

    it("shows OUTCOME when the project provides one", () => {
        const projectWithOutcome: FeaturedProject = { ...baseProject, outcome: "It shipped." };
        render(<FeaturedProjectCard project={projectWithOutcome} />);
        fireEvent.press(screen.getByLabelText("Test Project, A test subtitle"));
        expect(screen.getByText("It shipped.", { includeHiddenElements: true })).toBeTruthy();
    });
});
