import {
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
} from "@expo-google-fonts/ibm-plex-mono";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { SpaceGrotesk_600SemiBold } from "@expo-google-fonts/space-grotesk";
import { useFonts } from "expo-font";
import { createContext, useContext } from "react";

import type { ChildrenProps } from "@/types/app";

const FontsLoadedContext = createContext(false);

/**
 * Loads the custom fonts and provides a `fontsLoaded` boolean down the
 * tree via context (there's no other way to get it from `_layout.tsx`,
 * where `useFonts` has to live, down to route-level components without
 * prop-drilling through Expo Router's `<Slot />`).
 *
 * Native (iOS/Android) doesn't always force a full Yoga relayout on a pure
 * `fontFamily` swap once a box's dimensions were already resolved via
 * flex-shrink negotiation — so a layout committed against the OS fallback
 * font's (usually narrower) glyph metrics can stay stale and clip text once
 * the real, wider custom font loads in. Consumers gate native rendering on
 * this value until fonts are ready to avoid that whole bug class. Web is
 * intentionally excluded from any such gate by its consumers — the
 * static-export HTML must carry real content immediately, independent of
 * font load, for SEO and first paint (see CLAUDE.md).
 */
export const FontsLoadedProvider = ({ children }: ChildrenProps) => {
    const [fontsLoaded] = useFonts({
        IBMPlexMono_400Regular,
        IBMPlexMono_500Medium,
        IBMPlexMono_600SemiBold,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        SpaceGrotesk_600SemiBold,
    });

    return (
        <FontsLoadedContext.Provider value={fontsLoaded}>{children}</FontsLoadedContext.Provider>
    );
};

export const useFontsLoaded = () => useContext(FontsLoadedContext);
