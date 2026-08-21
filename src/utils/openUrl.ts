import { Linking } from "react-native";

/**
 * Opens an external URL, logging (not surfacing) a failure - there's no
 * status UI on the badges that call this to show one.
 * @param url - The URL to open in the OS's default handler.
 * @returns Nothing; the open happens asynchronously and fire-and-forget.
 */
export const openUrl = (url: string): void => {
    Linking.openURL(url).catch((error: unknown) => {
        console.warn(`Failed to open ${url}`, error);
    });
};
