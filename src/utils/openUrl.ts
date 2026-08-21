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

/**
 * accessibilityRole for a Pressable that calls openUrl. "link" on native
 * (a real external destination); "button" on web, since react-native-web
 * only fires a real <a>'s native keyboard Enter/Space activation for
 * role="link", and these aren't real <a> elements.
 * @param platformOS - Platform.OS, passed in so this stays testable.
 * @returns "link" on native, "button" on web.
 */
export const getExternalLinkAccessibilityRole = (platformOS: string): "button" | "link" =>
    platformOS === "web" ? "button" : "link";
