import { Linking } from "react-native";

/**
 * Shared handler for every Pressable that opens an external URL (action
 * badges, contact badges, the footer source link). The OS may not have a
 * handler for a given URL; there's no status UI on any of these badges to
 * surface that to, so the rejection is swallowed from the UI's perspective
 * but still logged for debugging a bad href before it ships.
 */
export const openUrl = (url: string): void => {
    Linking.openURL(url).catch((error: unknown) => {
        console.warn(`Failed to open ${url}`, error);
    });
};
