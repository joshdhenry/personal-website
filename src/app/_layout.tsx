import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { FontsLoadedProvider } from "@/hooks/useFontsLoaded";

export default () => (
    <FontsLoadedProvider>
        <SafeAreaProvider>
            <Slot />
        </SafeAreaProvider>
    </FontsLoadedProvider>
);
