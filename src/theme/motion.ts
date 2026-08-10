/**
 * Named Reanimated spring configs and durations. Use these everywhere;
 * never hand-roll a spring/timing config inline in a component.
 */
export const motion = {
    spring: {
        /** Reveals, section entry. */
        gentle: { damping: 18, stiffness: 140 },
        /** Press feedback. */
        snappy: { damping: 22, stiffness: 320 },
    },
    // Rise and cardIn entrances are spring-driven (motion.spring.gentle), per
    // CLAUDE.md's "Reanimated springs, not linear tweens, everywhere" — so
    // they have delay tokens (below) but no duration token; a spring's settle
    // time comes from its damping/stiffness, not an explicit duration. The
    // durations below cover animations that aren't a physical spring
    // interaction: a determinate progress fill, a blink cycle, and a count-up.
    duration: {
        /** Non-spring opacity fades. */
        fast: 120,
        /** Terminal progress rail fill, ms. */
        progressBarFill: 4200,
        /** One full caret blink cycle (on + off), ms. */
        caretBlinkCycle: 1000,
        /** Hero stat count-up, ms. */
        statCounter: 2200,
        /** Experience timeline rail's drawY fill, ms. */
        experienceRailDraw: 1600,
    },
    delay: {
        /** Terminal progress rail fill start delay, ms. */
        progressBarFill: 300,
        /** Terminal card cardIn entrance delay, ms. */
        cardInEntrance: 180,
        riseEyebrow: 0,
        riseHeadline: 60,
        riseIntro: 120,
        riseBadgeRow: 200,
        /** Projects section heading's single, modest entrance. */
        riseProjectsHeading: 0,
        /** Skills section heading's single, modest entrance, matches riseProjectsHeading. */
        riseSkillsHeading: 0,
        /** Experience section heading's single, modest entrance, matches riseProjectsHeading. */
        riseExperienceHeading: 0,
        /** About section heading's single, modest entrance, matches riseProjectsHeading. */
        riseAboutHeading: 0,
        /** Contact section heading's single, modest entrance, matches riseProjectsHeading. */
        riseContactHeading: 0,
        /**
         * First tech-log row's rise delay, ms. The remaining 6 rows step by
         * logRowStaggerStep, landing exactly on designs/README.md's "1.5s to
         * 3.9s in 0.4s steps" spec: 1500, 1900, 2300, 2700, 3100, 3500, 3900.
         */
        logRowStaggerStart: 1500,
        /** First Experience timeline row's rise delay, ms; remaining 4 rows step by experienceRowStaggerStep. */
        experienceRowStaggerStart: 0,
        /** Experience timeline rail's drawY start delay, ms. */
        experienceRailDraw: 300,
    },
    /** Per-row stagger step between the 7 tech-log rows, ms. */
    logRowStaggerStep: 400,
    /** Per-row stagger step between the 5 Experience timeline rows, ms, per designs/README.md's "0.09s intervals". */
    experienceRowStaggerStep: 90,
};
