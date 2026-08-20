import { render, screen } from "@testing-library/react-native";

import {
    demoHeading,
    demoIntroParagraph,
    demoMobileHeading,
    demoMobileIntroParagraph,
} from "@/data/demo";

import { DemoIntro } from "./DemoIntro";

describe("DemoIntro", () => {
    it("shows the desktop heading, intro copy, and steps when not read on mobile", () => {
        render(<DemoIntro isMobileReader={false} isNarrow={false} />);

        expect(screen.getByText(demoHeading)).toBeTruthy();
        expect(screen.queryByText(demoMobileHeading)).toBeNull();
        expect(screen.getByText(demoIntroParagraph)).toBeTruthy();
        expect(screen.getByText(/My Device/)).toBeTruthy();
    });

    it("shows the mobile heading and intro copy, with no numbered steps, when read on mobile", () => {
        render(<DemoIntro isMobileReader isNarrow />);

        expect(screen.getByText(demoMobileHeading)).toBeTruthy();
        expect(screen.queryByText(demoHeading)).toBeNull();
        expect(screen.getByText(demoMobileIntroParagraph)).toBeTruthy();
        expect(screen.queryByText(demoIntroParagraph)).toBeNull();
        expect(screen.queryByText(/My Device/)).toBeNull();
        expect(screen.queryByRole("list")).toBeNull();
    });
});
