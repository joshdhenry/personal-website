import { Asset } from "expo-asset";

import { GitHubIcon } from "@/components/contact/icons/GitHubIcon";
import { LinkedInIcon } from "@/components/contact/icons/LinkedInIcon";
import { ResumeIcon } from "@/components/contact/icons/ResumeIcon";
import type { ContactBadgeDescriptor } from "@/types/contact";

/**
 * Typed content for the Contact section. The heading and availability
 * paragraph are copy strings, verbatim per designs/CLAUDE.md's "Copy
 * rules" ("do not rewrite copy Josh supplied"); do not edit them without
 * updating the source spec in designs/README.md first. Status messages are
 * this build's proposed success/error copy — designs/README.md explicitly
 * leaves those states undesigned.
 */

export const contactHeading = "Let's build something great";

export const contactAvailabilityParagraph =
    "Open to senior React Native and some mobile roles. Seeking remote work anywhere in the U.S., or hybrid in Portland, OR. Send me a message and I'll get back to you.";

// Public Formspree form ID, not a secret - safe to hardcode, per
// designs/CLAUDE.md's Contact spec.
export const contactFormspreeEndpoint = "https://formspree.io/f/xljrgjpe";

// Metro asset require, not a JS module import.
const resumeAsset = Asset.fromModule(
    require("../../assets/documents/Josh Henry - Portfolio Resume.pdf"),
);

export const contactBadges: readonly ContactBadgeDescriptor[] = [
    {
        accessibilityLabel: "LinkedIn profile",
        href: "https://www.linkedin.com/in/joshdhenry/",
        icon: LinkedInIcon,
        id: "linkedin",
        label: "joshdhenry",
    },
    {
        accessibilityLabel: "GitHub profile",
        href: "https://github.com/joshdhenry",
        icon: GitHubIcon,
        id: "github",
        label: "joshdhenry",
    },
    {
        accessibilityLabel: "Resume PDF",
        href: resumeAsset.uri,
        icon: ResumeIcon,
        id: "resume",
        label: "resume.pdf",
    },
];

export const contactNameLabel = "NAME";
export const contactEmailLabel = "EMAIL";
export const contactMessageLabel = "MESSAGE";
export const contactSubmitLabel = "Send message";
export const contactSubmittingLabel = "Sending...";

export const contactSuccessMessage = "Message sent - I'll get back to you soon.";
export const contactErrorMessage = "Something went wrong - try again or reach out on LinkedIn.";
