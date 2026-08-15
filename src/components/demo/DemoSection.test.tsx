import { Platform, useWindowDimensions } from "react-native";

import { render, screen } from "@testing-library/react-native";

import { demoHeading, demoMobileHeading } from "@/data/demo";

import { DemoSection } from "./DemoSection";

jest.mock("react-native/Libraries/Utilities/useWindowDimensions");

const mockedUseWindowDimensions = jest.mocked(useWindowDimensions);

describe("DemoSection", () => {
    const originalPlatformOS = Platform.OS;

    afterEach(() => {
        Platform.OS = originalPlatformOS;
        mockedUseWindowDimensions.mockReset();
    });

    it("shows the desktop heading on narrow web, since the visitor can still resize to see the embed", () => {
        Platform.OS = "web";
        mockedUseWindowDimensions.mockReturnValue({
            fontScale: 1,
            height: 800,
            scale: 1,
            width: 400,
        });

        render(<DemoSection onTalkToMePress={jest.fn()} />);

        expect(screen.getByText(demoHeading)).toBeTruthy();
        expect(screen.queryByText(demoMobileHeading)).toBeNull();
    });

    it("shows the mobile heading on native, since the embed can never render there", () => {
        Platform.OS = "ios";
        mockedUseWindowDimensions.mockReturnValue({
            fontScale: 1,
            height: 800,
            scale: 1,
            width: 400,
        });

        render(<DemoSection onTalkToMePress={jest.fn()} />);

        expect(screen.getByText(demoMobileHeading)).toBeTruthy();
        expect(screen.queryByText(demoHeading)).toBeNull();
    });
});
