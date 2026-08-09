import type { ExperienceRole } from "@/types/experience";

/**
 * Typed content for the Experience section. Dates and roles are the
 * canonical facts from designs/CLAUDE.md; companyLine/note copy is verbatim
 * per designs/joshhenry.info.dc.html, per designs/CLAUDE.md's "Copy rules"
 * ("do not rewrite copy Josh supplied"). Do not edit without updating that
 * source spec first.
 */

export const experienceRoles: readonly ExperienceRole[] = [
    {
        companyLine: "Streem (acquired by Frontdoor) · Remote",
        dateRangeLabel: "2023 to 2026",
        note: "React Native video conferencing SDK",
        role: "Senior React Native Mobile Software Engineer",
    },
    {
        companyLine: "Fall Guy Consulting · Seattle, WA · Hybrid",
        dateRangeLabel: "2021 to 2022",
        note: "Diablo Golf App v2",
        role: "Senior Mobile Software Engineer",
    },
    {
        companyLine: "Committee for Children · Seattle, WA · Hybrid",
        dateRangeLabel: "2020 to 2021",
        note: "Two LMS lesson players for social-emotional learning",
        role: "Senior Software Engineer",
    },
    {
        companyLine: "Fall Guy Consulting · Seattle, WA · Hybrid",
        dateRangeLabel: "2017 to 2020",
        note: "Gen Con convention app, Mind Yeti",
        role: "React Native Mobile Software Engineer",
    },
    {
        companyLine: "Big Smash Software, LLC · Seattle, WA",
        dateRangeLabel: "2016 to 2017",
        note: "4 iOS apps and 1 open-source CocoaPod in Swift",
        role: "Founder / iOS Developer",
    },
];

/** The heading row's mono date-range span, e.g. "2016 to 2026". */
export const experienceRangeLabel = "2016 to 2026";
