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
 * to My Device from inside the embed.
 */
export const deriveSnackEmbedUrl = (snackUrl: string): string => {
    if (!snackUrl) {
        return "";
    }

    const embedUrl = new URL(snackUrl);
    embedUrl.pathname = `/embedded${embedUrl.pathname}`;
    embedUrl.searchParams.set("preview", "true");
    embedUrl.searchParams.set("platform", "web");
    embedUrl.searchParams.set("theme", "light");

    return embedUrl.toString();
};
