// The deployed site's canonical origin, for building absolute URLs (e.g. the
// og:image meta tag) that social-media crawlers require.
export const siteUrl = "https://joshhenry.info";

export const ogImageUrl = `${siteUrl}/og-image.png`;

// Bare host, for prose that displays the site's address without a scheme.
export const siteHost = siteUrl.replace(/^https:\/\//, "");
