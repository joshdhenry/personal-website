import { render, screen } from "@testing-library/react-native";

import { useIsReducedMotionPreferred } from "@/hooks/useIsReducedMotionPreferred";

import { TerminalStatPanel } from "./TerminalStatPanel";

jest.mock("@/hooks/useIsReducedMotionPreferred");

const mockedUseIsReducedMotionPreferred = jest.mocked(useIsReducedMotionPreferred);

describe("TerminalStatPanel", () => {
    afterEach(() => {
        mockedUseIsReducedMotionPreferred.mockReset();
    });

    it("displays the final value immediately under reduced motion", () => {
        mockedUseIsReducedMotionPreferred.mockReturnValue(true);

        render(
            <TerminalStatPanel
                borderRight
                borderTop
                finalValue={8}
                label="iOS apps shipped"
                suffix=""
            />,
        );

        // The value Text is marked importantForAccessibility="no-hide-descendants"
        // since the parent View is the sole accessible unit (composed label
        // below); opt back in to query it directly here.
        expect(screen.getByText("8", { includeHiddenElements: true })).toBeTruthy();
    });

    it("always labels itself with the static final value, never a transient animated one", () => {
        mockedUseIsReducedMotionPreferred.mockReturnValue(false);

        render(
            <TerminalStatPanel
                borderRight={false}
                borderTop
                finalValue={23}
                label="in IT and software"
                suffix=" yrs"
            />,
        );

        expect(screen.getByLabelText("23 yrs, in IT and software")).toBeTruthy();
    });
});
