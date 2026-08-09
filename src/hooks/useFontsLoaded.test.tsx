import { render, renderHook, screen } from "@testing-library/react-native";
import { useFonts } from "expo-font";
import { Text } from "react-native";

import type { ChildrenProps } from "@/types/app";

import { FontsLoadedProvider, useFontsLoaded } from "./useFontsLoaded";

jest.mock("expo-font");
jest.mock("@expo-google-fonts/ibm-plex-mono", () => ({}));
jest.mock("@expo-google-fonts/inter", () => ({}));
jest.mock("@expo-google-fonts/space-grotesk", () => ({}));

const mockedUseFonts = jest.mocked(useFonts);

const wrapper = ({ children }: ChildrenProps) => (
    <FontsLoadedProvider>{children}</FontsLoadedProvider>
);

describe("useFontsLoaded", () => {
    afterEach(() => {
        mockedUseFonts.mockReset();
    });

    it("is false while FontsLoadedProvider's useFonts call hasn't resolved", () => {
        mockedUseFonts.mockReturnValue([false, null]);

        const { result } = renderHook(() => useFontsLoaded(), { wrapper });

        expect(result.current).toBe(false);
    });

    it("renders children immediately regardless of fonts-loaded state", () => {
        mockedUseFonts.mockReturnValue([false, null]);

        render(
            <FontsLoadedProvider>
                <Text>content</Text>
            </FontsLoadedProvider>,
        );

        expect(screen.getByText("content")).toBeTruthy();
    });

    it("resolves to true once FontsLoadedProvider's useFonts call succeeds", () => {
        mockedUseFonts.mockReturnValue([true, null]);

        const { result } = renderHook(() => useFontsLoaded(), { wrapper });

        expect(result.current).toBe(true);
    });

    it("defaults to false outside any FontsLoadedProvider", () => {
        const { result } = renderHook(() => useFontsLoaded());

        expect(result.current).toBe(false);
    });
});
