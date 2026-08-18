/**
 * Everything about deriving and gating the embedded Expo Snack in the Demo
 * section, built from the bare Snack URL in src/constants/snack.ts.
 */

/**
 * The Snack iframe only exists on web (there's no browser to embed one in on
 * native). Snack's own embed layout is internally responsive (its
 * code-pane-plus-simulator split adapts on its own), so this only needs to
 * gate out widths too small to be usable at all, not the wider
 * breakpoint.narrow range - that one's a layout choice for this section's
 * own intro row, unrelated to whether the Snack itself still works.
 */
export const shouldRenderSnackEmbed = (platformOS: string, isCompact: boolean): boolean =>
    platformOS === "web" && !isCompact;

/**
 * Derives the embeddable Snack URL from the bare Snack URL in
 * src/constants/snack.ts. Inserts "/embedded" after the host and forces
 * platform=web so the embed opens on the running web player rather than the
 * "My Device" QR tab (mydevice would open that tab instead).
 * supportedPlatforms is deliberately left unset so visitors can still switch
 * to My Device from inside the embed. A malformed value (not an absolute
 * URL) is treated the same as an unset one - falls back to the placeholder
 * card - rather than throwing during render.
 *
 * The new URL is built by reconstructing a string and re-parsing it, never
 * by mutating a URL instance's properties (aside from searchParams.set,
 * which is a real method, not a property setter): React Native's own
 * bundled URL polyfill (Libraries/Blob/URL.js) implements every URL
 * property as a getter only, with no setters at all, so something like
 * `embedUrl.pathname = ...` throws on native even though it works in a real
 * browser and in Jest's Node URL.
 */
export const deriveSnackEmbedUrl = (snackUrl: string): string => {
    if (!snackUrl) {
        return "";
    }

    try {
        const parsedUrl = new URL(snackUrl);
        // snackUrl is documented (src/constants/snack.ts) to be the bare
        // Snack page, never the already-embedded one - but if it's ever set
        // to the embedded URL by mistake, strip the existing prefix first
        // rather than doubling it into "/embedded/embedded/...", which
        // Expo's embed host won't resolve.
        const pathname = parsedUrl.pathname.startsWith("/embedded/")
            ? parsedUrl.pathname.slice("/embedded".length)
            : parsedUrl.pathname;
        const embedUrl = new URL(`${parsedUrl.origin}/embedded${pathname}`);
        embedUrl.searchParams.set("preview", "true");
        embedUrl.searchParams.set("platform", "web");
        embedUrl.searchParams.set("theme", "light");

        return embedUrl.toString();
    } catch {
        return "";
    }
};
