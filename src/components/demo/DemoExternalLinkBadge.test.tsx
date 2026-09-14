import { Linking } from "react-native";

import { fireEvent, render, screen } from "@testing-library/react-native";

import { DemoExternalLinkBadge } from "./DemoExternalLinkBadge";

describe("DemoExternalLinkBadge", () => {
    it("opens the url via Linking on press", () => {
        const openURLSpy = jest
            .spyOn(Linking, "openURL")
            .mockImplementation(() => Promise.resolve());
        const url = "https://joshhenry.info";

        render(
            <DemoExternalLinkBadge
                accessibilityLabel="Open joshhenry.info"
                label="Open →"
                url={url}
            />,
        );
        fireEvent.press(screen.getByLabelText("Open joshhenry.info"));

        expect(openURLSpy).toHaveBeenCalledWith(url);

        openURLSpy.mockRestore();
    });
});
