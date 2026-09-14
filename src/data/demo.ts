/**
 * Typed content for the Demo section. Copy is verbatim per
 * designs/joshhenry.info.dc.html's #app section (designs/CLAUDE.md's Copy
 * rules), except where a comment below notes an intentional deviation.
 */

import type { DemoStep } from "@/types/demo";

export const demoHeading = "Run this site as an app";

// Reframed for mobile readers, who can't run the embed - points them to
// the web instead of the (here, misleading) "run this as an app" framing.
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

// Mobile-only intro; the steps below it are dropped entirely rather than
// reworded, since the fallback card covers the same ground.
export const demoMobileIntroParagraph =
    "This page is a React Native and Expo app that also runs natively on iOS and Android, with native navigation, gestures, and scrolling.";

export const demoPitchLabel = "I CAN DO THIS FOR YOU";

export const demoPitchBody =
    "If your product needs to be on iOS, Android, and the web, this is how I build it - one React Native codebase, native modules in Swift, Objective-C, Java, or Kotlin wherever the platform actually calls for them, and over-the-air updates so an update can ship the same day it lands. Stakeholders test a real build on their own phone from a link, long before an app store review ever enters the picture.";

export const demoPitchCtaLabel = "Talk to me about your app →";

export const demoChromeLabel = "expo snack";

export const demoLiveEditorLabel = "live editor";

export const demoFallbackLabel = "NEEDS A WIDER WINDOW";

// Reworded from the original phone-only copy - this card also renders for
// a narrow desktop window, which width (not device) detects.
export const demoFallbackBody =
    "The code editor and simulator need more screen width to show side by side. Make this window wider, or open the Snack directly.";

export const demoOpenSnackLabel = "Open the Snack →";

export const demoNoSnackMobileText = "Snack link goes here once published";

export const demoPlaceholderLabel = "Snack embed loads here";

// Replaces the prototype's "Set the Snack URL in Tweaks" (its own
// design-tool panel) with this repo's real config path.
export const demoPlaceholderHint =
    "Set the Snack URL in src/constants/snack.ts, for example snack.expo.dev/@joshdhenry/joshhenry-info";

// Native-app-specific copy; the design predates this case having its own
// message instead of the "ON A COMPUTER" fallback.
export const demoNativeAppLabel = "SEE IT ON THE WEB";

export const demoNativeAppBody =
    "Open joshhenry.info in a browser to see the same app running on the web.";

export const demoOpenWebsiteLabel = "Open joshhenry.info →";

export const demoWebsiteUrl = "https://joshhenry.info";
