/**
 * Typed content for the sticky nav. Copy is verbatim per
 * designs/joshhenry.info.dc.html's nav bar.
 */

import type { NavLinkDescriptor } from "@/types/nav";

export const navNameLabel = "JOSH HENRY";

export const navLinks: readonly NavLinkDescriptor[] = [
    { label: "Projects", sectionId: "projects" },
    { label: "Skills", sectionId: "skills" },
    { label: "Experience", sectionId: "experience" },
    { label: "About", sectionId: "about" },
    { label: "Contact", sectionId: "contact" },
];
