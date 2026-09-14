import { render, screen } from "@testing-library/react-native";

import { demoNoSnackMobileText, demoOpenSnackLabel } from "@/data/demo";

import { DemoSnackFallbackCard } from "./DemoSnackFallbackCard";

describe("DemoSnackFallbackCard", () => {
    it("renders the Open the Snack badge when hasSnack is true", () => {
        render(
            <DemoSnackFallbackCard
                hasSnack
                snackUrl="https://snack.expo.dev/@joshdhenry/joshhenry-info"
            />,
        );

        expect(screen.getByLabelText(demoOpenSnackLabel)).toBeTruthy();
        expect(screen.queryByText(demoNoSnackMobileText)).toBeNull();
    });

    it("renders plain text, not a badge, when hasSnack is false", () => {
        render(<DemoSnackFallbackCard hasSnack={false} snackUrl="" />);

        expect(screen.getByText(demoNoSnackMobileText)).toBeTruthy();
        expect(screen.queryByLabelText(demoOpenSnackLabel)).toBeNull();
    });
});
