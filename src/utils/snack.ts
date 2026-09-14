/**
 * Everything about deriving and gating the embedded Expo Snack in the Demo
 * section, built from the bare Snack URL in src/constants/snack.ts.
 */

/**
 * Snack's embed layout is internally responsive, so this only needs to gate
 * web + a width floor - not breakpoint.narrow, which is this section's own
 * layout choice, unrelated to whether the Snack itself still works.
 */
export const shouldRenderSnackEmbed = (platformOS: string, isCompact: boolean): boolean =>
    platformOS === "web" && !isCompact;

/**
 * Derives the embeddable Snack URL - inserts "/embedded" and forces
 * platform=web so the embed opens the web player, not the "My Device" QR
 * tab. supportedPlatforms stays unset so visitors can still switch to it.
 */
export const deriveSnackEmbedUrl = (snackUrl: string): string => {
    if (!snackUrl) {
        return "";
    }

    try {
        const parsedUrl = new URL(snackUrl);
        // Strips an existing /embedded prefix first, in case snackUrl was
        // mistakenly set to the already-embedded URL.
        const pathname = parsedUrl.pathname.startsWith("/embedded/")
            ? parsedUrl.pathname.slice("/embedded".length)
            : parsedUrl.pathname;
        // Rebuilt as a string, not mutated - RN's URL polyfill only
        // implements getters on native, so `embedUrl.pathname = ...` throws.
        const embedUrl = new URL(`${parsedUrl.origin}/embedded${pathname}`);
        embedUrl.searchParams.set("preview", "true");
        embedUrl.searchParams.set("platform", "web");
        embedUrl.searchParams.set("theme", "light");

        return embedUrl.toString();
    } catch (error: unknown) {
        // Unlike an unset snackUrl (the expected pre-launch state), a
        // malformed one is always a real mistake worth a warning.
        console.warn(`Malformed Snack URL "${snackUrl}", falling back to the placeholder`, error);

        return "";
    }
};
