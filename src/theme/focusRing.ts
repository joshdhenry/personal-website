import { colors } from "@/theme/colors";
import { focusRingSpace } from "@/theme/spacing";
import type { WebOnlyStyle } from "@/types/theme";

/** Visible keyboard focus ring shown on web, shared by every interactive badge/link. */
export const focusRing: WebOnlyStyle = {
    outlineColor: colors.focusRing,
    outlineOffset: focusRingSpace.outlineOffset,
    outlineStyle: "solid",
    outlineWidth: focusRingSpace.outlineWidth,
};

// Inset variant of focusRing for elements inside a clipping ancestor (e.g. a
// horizontal ScrollView) - an outline draws outside the box via
// outlineOffset and gets clipped; an inset boxShadow can't be.
export const insetFocusRing: WebOnlyStyle = {
    boxShadow: `inset 0 0 0 ${focusRingSpace.outlineWidth}px ${colors.focusRing}`,
};

// boxShadow doesn't occlude the browser's own default outline the way
// focusRing's outline-based style does - pairs with insetFocusRing to
// suppress that independently-rendered outline explicitly.
export const suppressNativeFocusOutline: WebOnlyStyle = {
    outlineStyle: "none",
};
