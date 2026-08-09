import type { SkillGroup } from "@/types/skills";

/**
 * Typed content for the Skills section. Copy strings are verbatim per
 * designs/CLAUDE.md's "Copy rules" section ("do not rewrite copy Josh
 * supplied"); do not edit them without updating the source spec in
 * designs/README.md / designs/joshhenry.info.dc.html first.
 */

export const skillGroups: readonly SkillGroup[] = [
    {
        items: [
            "TypeScript",
            "JavaScript",
            "Swift",
            "Objective-C",
            "Java",
            "Kotlin",
            "HTML",
            "CSS",
        ],
        label: "Languages",
    },
    {
        items: ["React Native", "Expo", "React Native Web", "React", "Native Modules"],
        label: "React Native",
    },
    {
        items: ["React Navigation", "Reanimated", "Animated", "Gesture Handler"],
        label: "UI / UX",
    },
    {
        items: ["WebRTC", "AVFoundation", "CallKit"],
        label: "Media",
    },
    {
        items: [
            "REST",
            "GraphQL",
            "Apollo",
            "Node",
            "Express",
            "Protobuf",
            "Postman",
            "Redux",
            "MobX / MST",
            "Context",
            "AsyncStorage",
            "Realm",
            "Twilio Sync",
            "Offline-first",
            "Data sync",
        ],
        label: "Data & State",
    },
    {
        items: [
            "Jest",
            "React Native Testing Library",
            "React Testing Library",
            "Cypress",
            "Nightwatch",
            "WDIO",
            "LambdaTest",
            "Accessibility (WCAG)",
        ],
        label: "Testing",
    },
    {
        items: [
            "CI/CD",
            "Bitrise",
            "App Store",
            "Google Play",
            "TestFlight",
            "Gradle",
            "CocoaPods",
            "Yarn Workspaces",
            "patch-package",
            "Docker",
            "Git",
        ],
        label: "Build & Release",
    },
    {
        items: [
            "AWS",
            "AWS Amplify",
            "Azure",
            "Firebase",
            "Datadog",
            "Reactotron",
            "Xcode Instruments",
            "Android Profiler",
            "Storybook",
        ],
        label: "Tools",
    },
    {
        items: ["Agile", "Scrum", "Test-driven development"],
        label: "Methodologies",
    },
    {
        items: ["GitHub Copilot", "GitLab Duo", "Claude"],
        label: "AI",
    },
];
