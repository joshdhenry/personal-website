import type { CompactProject, FeaturedProject } from "@/types/projects";

/**
 * Typed content for the Projects section. Copy strings are verbatim per
 * designs/CLAUDE.md's "Copy rules" section ("do not rewrite copy Josh
 * supplied"); do not edit them without updating the source spec in
 * designs/README.md / designs/joshhenry.info.dc.html first.
 */

export const featuredProjects: readonly FeaturedProject[] = [
    {
        id: "streem",
        image: require("../../assets/images/portfolio-streem.jpg"),
        imageAlt: "Streem React Native SDK",
        isWordmarkImage: true,
        outcome:
            "Integrated into the AHS and Frontdoor apps and over 100,000 calls have been made so far.",
        problem:
            "Home warranty customers needed live diagnosis from remote experts, on any phone, over unreliable networks. Without it, every claim meant a truck roll - a technician driving out, diagnosing in person, then ordering parts. The SDK lets the company skip that step and expedite the process, saving money in the process.",
        spansBothColumns: true,
        stackChips: [
            "React Native",
            "React Native Web",
            "Expo",
            "TypeScript",
            "Swift",
            "Objective-C",
            "Kotlin",
            "Java",
        ],
        stackSentence:
            "AWS Chime, WebRTC, Twilio Sync, CallKeep, Reanimated, react-native-gesture-handler, REST, Protobuf, MobX State Tree, Jest, React Testing Library, WDIO.",
        subtitle:
            "WebRTC video platform connecting home repair experts with home warranty customers",
        tier: "featured",
        title: "Streem React Native SDK",
        whatIBuilt:
            "A React Native video-calling SDK from the ground up, plus native modules in four languages across iOS and Android. Implemented many complex features such as audio routing, picture in picture, telephony, network quality monitoring, and more.",
    },
    {
        id: "gencon",
        image: require("../../assets/images/portfolio-gencon.png"),
        imageAlt: "Gen Con Convention App",
        isWordmarkImage: false,
        outcome:
            "The official Gen Con app, serving 60,000+ attendees, and the first year the convention had e-ticketing.",
        problem:
            "Convention halls have almost no connectivity, and attendees need to find and enter events all day.",
        spansBothColumns: false,
        stackChips: ["React Native", "JavaScript", "Objective-C", "Java"],
        stackSentence:
            "React Native, Realm, Lunr.js, native modules, Animated, REST, Node, AWS, Jest.",
        subtitle:
            "Offline-first event app for 60,000+ attendees, and the event's first e-ticketing",
        tier: "featured",
        title: "Gen Con Convention App",
        whatIBuilt:
            "An offline-first app that downloads events over a REST API and stores and fuzzy searches ~20,000 locally, with camera badge scanning for e-ticketed entry.",
    },
    {
        id: "mind-yeti",
        image: require("../../assets/images/portfolio-mindyeti.png"),
        imageAlt: "Mind Yeti",
        isWordmarkImage: false,
        problem:
            "Kids needed an introduction to mindfulness as part of a larger social-emotional learning platform.",
        spansBothColumns: false,
        stackChips: ["React Native", "React Native Web", "JavaScript"],
        stackSentence:
            "React Native Web, GraphQL (Apollo), React Navigation, Redux, Jest, React Testing Library, with managed services across AWS and Google App Engine.",
        subtitle: "Mindfulness app for schools and children",
        tier: "featured",
        title: "Mind Yeti",
        whatIBuilt:
            "A React Native Web mindfulness app, including its full-featured meditation media player with closed captioning.",
    },
    {
        id: "second-step-k8",
        image: require("../../assets/images/portfolio-secondstep-k8.png"),
        imageAlt: "Second Step K-8 Lesson Player",
        isWordmarkImage: false,
        outcome:
            "Kids in schools everywhere advanced and grew in their social-emotional learning. Accessibility audits and remediation brought the player up to WCAG standards so classrooms could use it inclusively.",
        problem:
            "Students in grades K-8 need to learn social-emotional skills, in classrooms with very mixed hardware.",
        spansBothColumns: false,
        stackChips: ["React", "JavaScript"],
        stackSentence: "React, styled-components, Redux, REST, Jest, React Testing Library.",
        subtitle: "Social-emotional learning for 45,000+ schools and 10M+ students",
        tier: "featured",
        title: "Second Step K-8 Lesson Player",
        whatIBuilt:
            "A React lesson player for the Second Step K-8 curriculum on SecondStep.org, built to run in classrooms across a wide range of school hardware.",
    },
    {
        id: "second-step-adults",
        image: require("../../assets/images/portfolio-secondstep-adults.png"),
        imageAlt: "Second Step SEL for Adults",
        isWordmarkImage: false,
        outcome:
            "Reached the parents and teachers who administer the lessons, alongside the K-8 curriculum.",
        problem: "Adults need social-emotional learning too, not just students.",
        spansBothColumns: false,
        stackChips: ["React Native Web", "JavaScript"],
        stackSentence: "React Native Web, Redux, REST.",
        subtitle: "Lesson player for the adult social-emotional learning curriculum",
        tier: "featured",
        title: "Second Step SEL for Adults",
        whatIBuilt:
            "The second React lesson player, for the adult curriculum, plus a comprehensive test plan across Jest, React Testing Library, Nightwatch, and Cypress.",
    },
];

export const compactProjects: readonly CompactProject[] = [
    {
        id: "diablo-golf",
        image: require("../../assets/images/portfolio-diablogolf.png"),
        imageAlt: "Diablo Golf v2",
        paragraph:
            "Version 2 of the golf companion app. Tracks your rounds, scores, and handicap, runs a long list of custom golf games, and adds a social layer so groups can play and compare together. Built natively in parity across iOS and Android.",
        techLine: "Objective-C · Swift · Java",
        tier: "compact",
        title: "Diablo Golf v2",
    },
    {
        id: "my-fish-pal",
        image: require("../../assets/images/portfolio-myfishpal.jpg"),
        imageAlt: "My Fish Pal",
        paragraph:
            "An iOS app designed to help aquarists keep track of their aquarium and its inhabitants. Utilizes Core Data to let the user create aquarium profiles and log all activities related to it. Uses the iOS-Charts library to visualize important changes in the aquarium's chemistry levels.",
        techLine: "Swift",
        tier: "compact",
        title: "My Fish Pal",
    },
    {
        id: "zen-builder",
        image: require("../../assets/images/portfolio-zenbuilder.jpg"),
        imageAlt: "Zen Builder",
        paragraph:
            "A meditation and relaxation timer that lets the user choose a duration, background sound, and drag & drop checkpoint sound effects onto a timeline. Uses Core Data and iCloud to store saved meditations and maintain the user's history. Implements Apple Health features by writing mindfulness minutes via HealthKit.",
        techLine: "Swift",
        tier: "compact",
        title: "Zen Builder",
    },
    {
        id: "vista-weather",
        image: require("../../assets/images/portfolio-vistaweather.jpg"),
        imageAlt: "Vista Weather",
        paragraph:
            "A beautiful and super-accurate weather app for iPhone and iPad. Check the local weather forecast or select any city in the world using the Forecast.io API. In addition to weather conditions, Vista Weather also beautifully displays photos crowd-sourced from your location using the Google Places API.",
        techLine: "Swift",
        tier: "compact",
        title: "Vista Weather",
    },
    {
        id: "skylines-trivia",
        image: require("../../assets/images/portfolio-skylinestrivia.jpg"),
        imageAlt: "Skylines Trivia",
        paragraph:
            "In this enjoyable trivia game for iOS created with Swift and Xcode, you are presented with scenes of city skylines from across the world. Be a jet-setter and guess them all correct to fly around the world. Get them wrong and you might lose your passport! This app relies heavily on Sprite Kit.",
        techLine: "Swift",
        tier: "compact",
        title: "Skylines Trivia",
    },
    {
        id: "spin-wheel-control",
        image: require("../../assets/images/portfolio-spinwheelcontrol.jpg"),
        imageAlt: "SpinWheelControl",
        paragraph:
            "An inertial spinning wheel UI control written in Swift that allows selection of an item. A derivation, port, and enhancement based loosely on a similar existing Objective-C CocoaPod named SMWheelControl. Uses IBInspectable properties to let developers easily configure the UI control from Interface Builder.",
        techLine: "Swift",
        tier: "compact",
        title: "SpinWheelControl",
    },
];
