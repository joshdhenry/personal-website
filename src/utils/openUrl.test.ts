import { Linking } from "react-native";

import { openUrl } from "./openUrl";

describe("openUrl", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("opens the given URL", () => {
        const openURLSpy = jest.spyOn(Linking, "openURL").mockResolvedValue(true);

        openUrl("https://example.com");

        expect(openURLSpy).toHaveBeenCalledWith("https://example.com");
    });

    it("logs rather than throws when the OS has no handler for the URL", async () => {
        const openURLError = new Error("no handler");
        jest.spyOn(Linking, "openURL").mockRejectedValue(openURLError);
        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

        openUrl("bad://url");
        await Promise.resolve();
        await Promise.resolve();

        expect(warnSpy).toHaveBeenCalledWith("Failed to open bad://url", openURLError);
    });
});
