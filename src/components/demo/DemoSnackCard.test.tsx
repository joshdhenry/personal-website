import { render, screen } from "@testing-library/react-native";

import {
    demoChromeLabel,
    demoFallbackLabel,
    demoNativeAppLabel,
    demoNoSnackMobileText,
    demoPlaceholderLabel,
} from "@/data/demo";

import { DemoSnackCard } from "./DemoSnackCard";

const snackUrl = "https://snack.expo.dev/@joshdhenry/joshhenry-info";

describe("DemoSnackCard", () => {
    it("renders the Snack iframe and chrome bar when it should render an iframe and a Snack URL is set", () => {
        render(<DemoSnackCard isNativeApp={false} shouldRenderIframe snackUrl={snackUrl} />);

        const iframe = screen.UNSAFE_getByType("iframe" as never);
        expect(iframe.props.src).toContain("snack.expo.dev/embedded/");
        expect(screen.getByText(demoChromeLabel, { includeHiddenElements: true })).toBeTruthy();
        expect(screen.queryByText(demoPlaceholderLabel)).toBeNull();
        expect(screen.queryByText(demoFallbackLabel)).toBeNull();
        expect(screen.queryByText(demoNativeAppLabel)).toBeNull();
    });

    it("renders the placeholder and chrome bar when it should render an iframe but no Snack URL is set", () => {
        render(<DemoSnackCard isNativeApp={false} shouldRenderIframe snackUrl="" />);

        expect(screen.getByText(demoPlaceholderLabel)).toBeTruthy();
        expect(screen.getByText(demoChromeLabel, { includeHiddenElements: true })).toBeTruthy();
        expect(screen.UNSAFE_queryByType("iframe" as never)).toBeNull();
        expect(screen.queryByText(demoFallbackLabel)).toBeNull();
    });

    it("renders the placeholder, not a broken iframe, when the Snack URL is malformed", () => {
        render(<DemoSnackCard isNativeApp={false} shouldRenderIframe snackUrl="not a url" />);

        expect(screen.getByText(demoPlaceholderLabel)).toBeTruthy();
        expect(screen.UNSAFE_queryByType("iframe" as never)).toBeNull();
    });

    it("renders the Snack fallback card without a chrome bar on narrow web, when a Snack URL is set", () => {
        render(
            <DemoSnackCard isNativeApp={false} shouldRenderIframe={false} snackUrl={snackUrl} />,
        );

        expect(screen.getByText(demoFallbackLabel)).toBeTruthy();
        expect(screen.queryByText(demoChromeLabel)).toBeNull();
        expect(screen.queryByText(demoNoSnackMobileText)).toBeNull();
        expect(screen.UNSAFE_queryByType("iframe" as never)).toBeNull();
        expect(screen.queryByText(demoPlaceholderLabel)).toBeNull();
        expect(screen.queryByText(demoNativeAppLabel)).toBeNull();
    });

    it("renders the Snack fallback card with plain text on narrow web, when no Snack URL is set", () => {
        render(<DemoSnackCard isNativeApp={false} shouldRenderIframe={false} snackUrl="" />);

        expect(screen.getByText(demoFallbackLabel)).toBeTruthy();
        expect(screen.getByText(demoNoSnackMobileText)).toBeTruthy();
    });

    it("renders the native-app card without a chrome bar, pointing at the live website", () => {
        render(<DemoSnackCard isNativeApp shouldRenderIframe={false} snackUrl={snackUrl} />);

        expect(screen.getByText(demoNativeAppLabel)).toBeTruthy();
        expect(screen.queryByText(demoChromeLabel)).toBeNull();
        expect(screen.queryByText(demoFallbackLabel)).toBeNull();
        expect(screen.UNSAFE_queryByType("iframe" as never)).toBeNull();
    });
});
