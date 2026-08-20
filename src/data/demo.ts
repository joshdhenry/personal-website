/**
 * Typed content for the "Run this site as an app" (Demo) section. Copy is
 * verbatim per designs/joshhenry.info.dc.html's #app section, per
 * designs/CLAUDE.md's "Copy rules" ("do not rewrite copy Josh supplied"), with
 * five exceptions: demoPlaceholderHint replaces the prototype's "Set the
 * Snack URL in Tweaks" (a reference to the design tool's own editing panel,
 * which doesn't exist in this app) with this repo's real constants file path;
 * the native-app-specific strings (the design predates the native-app case
 * getting its own message instead of the "ON A COMPUTER" fallback); the
 * mobile intro copy below (the original intro paragraph and steps describe
 * interacting with the embed, which doesn't render at all on mobile - the
 * numbered steps are dropped entirely there rather than reworded, since the
 * fallback card right below already covers the same ground); demoFallbackLabel
 * /demoFallbackBody, reworded from the original "ON A COMPUTER... you are
 * already on a phone" because this card also renders for a narrow desktop
 * browser window, not only an actual phone - width, not device, is what this
 * repo can actually detect (useWindowDimensions, not Platform.OS, per
 * designs/README.md's own responsive rule); demoPitchBody, reworded per
 * Josh's direct edit request (colon -> " - ", "a fix" -> "an update", and the
 * closing clause rephrased); demoSteps, shortened per Josh's request to make
 * them more concise; and demoMobileHeading plus the native-app fallback
 * copy, reframed per Josh's request so mobile readers (who can't run the
 * embed at all) are told to go see this on the web, rather than being told
 * to "run this site as an app" when the embed, the whole point of that
 * framing, is exactly what's hidden from them; and demoNestedSnackLabel/
 * demoNestedSnackHint, new copy for a case the design doesn't cover at all -
 * this app running as the Snack embed itself, where showing the normal
 * iframe would try to nest the page inside itself.
 */

import type { DemoStep } from "@/types/demo";

export const demoHeading = "Run this site as an app";

export const demoMobileHeading = "Run this site on the web";

export const demoPlatformTag = "iOS + ANDROID";

export const demoIntroParagraph =
    "This page is a React Native and Expo app. The same codebase renders here in the browser and runs natively on iOS and Android, with native navigation, gestures, and scrolling. The Snack below is the running source and a live simulator beside it. Read the code, tap through the app, or run the same build on your own phone in Expo Go.";

export const demoSteps: readonly DemoStep[] = [
    {
        description: "The app builds and loads on its own.",
        id: "builds-on-its-own",
        number: "01",
    },
    {
        description: "Scroll, tap, or edit the code. Nothing here touches the live site.",
        id: "scroll-and-tap",
        number: "02",
    },
    {
        description: "Switch to My Device to run it natively in Expo Go.",
        id: "switch-to-my-device",
        number: "03",
    },
];

export const demoMobileIntroParagraph =
    "This page is a React Native and Expo app that also runs natively on iOS and Android, with native navigation, gestures, and scrolling.";

export const demoPitchLabel = "I CAN DO THIS FOR YOU";

export const demoPitchBody =
    "If your product needs to be on iOS, Android, and the web, this is how I build it - one React Native codebase, native modules in Swift, Objective-C, Java, or Kotlin wherever the platform actually calls for them, and over-the-air updates so an update can ship the same day it lands. Stakeholders test a real build on their own phone from a link, long before an app store review ever enters the picture.";

export const demoPitchCtaLabel = "Talk to me about your app →";

export const demoChromeLabel = "expo snack";

export const demoLiveEditorLabel = "live editor";

export const demoFallbackLabel = "NEEDS A WIDER WINDOW";

export const demoFallbackBody =
    "The code editor and simulator need more screen width to show side by side. Make this window wider, or open the Snack directly.";

export const demoOpenSnackLabel = "Open the Snack →";

export const demoNoSnackMobileText = "Snack link goes here once published";

export const demoPlaceholderLabel = "Snack embed loads here";

export const demoPlaceholderHint =
    "Set the Snack URL in src/constants/snack.ts, for example snack.expo.dev/@joshdhenry/joshhenry-info";

export const demoNestedSnackLabel = "THIS IS THAT SNACK";

export const demoNestedSnackHint =
    "You're already inside the embed, so it can't nest inside itself here. Open joshhenry.info directly to see this section in place.";

export const demoNativeAppLabel = "SEE IT ON THE WEB";

export const demoNativeAppBody =
    "Open joshhenry.info in a browser to see the same app running on the web.";

export const demoOpenWebsiteLabel = "Open joshhenry.info →";

export const demoWebsiteUrl = "https://joshhenry.info";
