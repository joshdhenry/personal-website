/**
 * Typed content for the sticky nav. Copy is verbatim per
 * designs/joshhenry.info.dc.html's nav bar.
 */

import type { NavLinkDescriptor } from "@/types/nav";

export const navWordmarkLabel = "JOSH HENRY";

export const navLinks: readonly NavLinkDescriptor[] = [
    { id: "projects", label: "Projects", sectionId: "projects" },
    { id: "skills", label: "Skills", sectionId: "skills" },
    { id: "experience", label: "Experience", sectionId: "experience" },
    { id: "about", label: "About", sectionId: "about" },
    { id: "demo", label: "Demo", sectionId: "demo" },
    { id: "contact", label: "Contact", sectionId: "contact" },
];
