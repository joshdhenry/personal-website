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
 * Detects whether this build is currently running as the embedded Snack
 * itself (loaded inside Expo Snack's own web-preview host), not just any
 * arbitrary iframe - joshhenry.info could theoretically be embedded
 * elsewhere too, but that's a one-level embed, not the runaway case this
 * guards against. Rendering the Demo section's own Snack iframe while
 * already running as that Snack would embed the page inside itself,
 * repeating indefinitely. Snack's web-preview host consistently serves
 * projects from snack-runtime.eascdn.net (confirmed via direct inspection
 * of a running embed's iframe src), so an exact hostname match is enough.
 */
export const isRunningInsideSnack = (hostname: string): boolean =>
    hostname === "snack-runtime.eascdn.net";

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
