/**
 * Pulled out of index.tsx so the platform+fontsLoaded -> gate derivation is
 * testable without rendering the route (which would drag in expo-router/
 * head, Hero, and every subcomponent just to check one boolean).
 *
 * Web is never gated: the static-export HTML must carry real content
 * immediately, independent of font load, for SEO and first paint. Native
 * (iOS/Android) is gated until fonts are ready — see useFontsLoaded.tsx for
 * why.
 */
export const shouldGateOnFontsLoaded = (platformOS: string, fontsLoaded: boolean): boolean =>
    platformOS !== "web" && !fontsLoaded;
