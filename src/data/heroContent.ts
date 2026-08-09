import { Asset } from "expo-asset";

import { motion } from "@/theme/motion";
import type { HeroActionBadgeDescriptor, HeroStat, HeroTechLogRow } from "@/types/hero";

/**
 * Typed content for the Hero section. Copy strings are verbatim per
 * designs/CLAUDE.md's "Copy rules" section ("do not rewrite copy Josh
 * supplied"); do not edit them without updating the source spec in
 * designs/README.md first.
 */

export const heroEyebrowLabel = "SENIOR MOBILE SOFTWARE ENGINEER";

export const heroOpenToWorkLabel = "open to work";

export const heroHeadline = "Ten years building apps that hold up, on iOS, Android, and the web.";

export const heroIntroParagraph =
    "I'm Josh Henry, a mobile engineer in Portland, Oregon. I have ten years of production React Native, native iOS, and native Android experience under my belt - from greenfield builds to App Store releases to version 2's. I also write and work on native modules in Swift, Objective-C, Java, and Kotlin. Building an app is a craft, and I hold it to that standard. Above all else, quality is paramount to me. I want the people using my software to have an exquisite, bug-free, and secure experience that rivals the best apps they've ever used.";

// Metro asset require, not a JS module import.
const resumeAsset = Asset.fromModule(
    require("../../assets/documents/Josh Henry - Portfolio Resume.pdf"),
);

export const heroActionBadges: readonly HeroActionBadgeDescriptor[] = [
    {
        accessibilityLabel: "LinkedIn profile, opens in new tab",
        href: "https://www.linkedin.com/in/joshdhenry/",
        id: "linkedin",
        label: "LinkedIn",
    },
    {
        accessibilityLabel: "Resume PDF, opens in new tab",
        href: resumeAsset.uri,
        id: "resume",
        label: "Resume",
    },
    {
        accessibilityLabel: "GitHub profile, opens in new tab",
        href: "https://github.com/joshdhenry",
        id: "github",
        label: "GitHub",
    },
];

export const heroTerminalPathLabel = "~/josh/tech";
export const heroTerminalShellLabel = "zsh";

/**
 * The --sort flag is load-bearing copy: Josh wants it clear these are real
 * hands-on build hours, not years employed near the technology. Do not
 * shorten it.
 */
export const heroTerminalCommandText = "ls ~/tech --sort=hands-on-build-time";

const techLogEntries: readonly { techName: string; yearsLabel: string }[] = [
    { techName: "JavaScript / TypeScript", yearsLabel: "8 yrs" },
    { techName: "React Native", yearsLabel: "6.25 yrs" },
    { techName: "Swift", yearsLabel: "5.5 yrs" },
    { techName: "Objective-C", yearsLabel: "5.5 yrs" },
    { techName: "Java", yearsLabel: "4.5 yrs" },
    { techName: "Kotlin", yearsLabel: "3.5 yrs" },
    { techName: "React", yearsLabel: "2 yrs" },
];

export const heroTechLogRows: readonly HeroTechLogRow[] = techLogEntries.map((entry, index) => ({
    id: entry.techName,
    ...entry,
    staggerDelayMilliseconds: motion.delay.logRowStaggerStart + index * motion.logRowStaggerStep,
}));

export const heroStats: readonly HeroStat[] = [
    {
        finalValue: 10,
        id: "software-development-years",
        label: "software development",
        suffix: " yrs",
    },
    { finalValue: 23, id: "it-software-years", label: "in IT and software", suffix: " yrs" },
    { finalValue: 8, id: "ios-apps-shipped", label: "iOS apps shipped", suffix: "" },
    { finalValue: 4, id: "android-apps-shipped", label: "Android apps shipped", suffix: "" },
    {
        finalValue: 2,
        id: "frameworks-sdks-shipped",
        label: "frameworks & SDKs shipped",
        suffix: "",
    },
    { finalValue: 4, id: "web-apps-shipped", label: "web apps shipped", suffix: "" },
];
