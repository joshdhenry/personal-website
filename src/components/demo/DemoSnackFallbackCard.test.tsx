import { render, screen } from "@testing-library/react-native";

import { demoNoSnackMobileText, demoOpenSnackLabel } from "@/data/demo";

import { DemoSnackFallbackCard } from "./DemoSnackFallbackCard";

describe("DemoSnackFallbackCard", () => {
    it("renders the Open the Snack badge when a valid Snack URL is set", () => {
        render(
            <DemoSnackFallbackCard snackUrl="https://snack.expo.dev/@joshdhenry/joshhenry-info" />,
        );

        expect(screen.getByLabelText(demoOpenSnackLabel)).toBeTruthy();
        expect(screen.queryByText(demoNoSnackMobileText)).toBeNull();
    });

    it("renders plain text, not a badge, when no Snack URL is set", () => {
        render(<DemoSnackFallbackCard snackUrl="" />);

        expect(screen.getByText(demoNoSnackMobileText)).toBeTruthy();
        expect(screen.queryByLabelText(demoOpenSnackLabel)).toBeNull();
    });

    it("renders plain text, not a broken badge, when the Snack URL is malformed", () => {
        render(<DemoSnackFallbackCard snackUrl="not a url" />);

        expect(screen.getByText(demoNoSnackMobileText)).toBeTruthy();
        expect(screen.queryByLabelText(demoOpenSnackLabel)).toBeNull();
    });
});
