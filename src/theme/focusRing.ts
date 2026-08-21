import { colors } from "@/theme/colors";
import { focusRingSpace } from "@/theme/spacing";

/**
 * react-native-web supports CSS properties (outline*, boxShadow) React
 * Native's own TextStyle/ViewStyle types don't declare, so every web-only
 * style object in this theme is cast through this alias rather than
 * `Record<string, unknown>` at each call site.
 */
export type WebOnlyStyle = Record<string, unknown>;

/**
 * The visible keyboard focus ring shown on web, shared by every interactive
 * badge and link in this app. react-native-web-only style props, so this is
 * a plain style object rather than a StyleSheet.create() entry.
 */
export const focusRing: WebOnlyStyle = {
    outlineColor: colors.focusRing,
    outlineOffset: focusRingSpace.outlineOffset,
    outlineStyle: "solid",
    outlineWidth: focusRingSpace.outlineWidth,
};

/**
 * An inset variant of focusRing, for interactive elements that render inside
 * a clipping ancestor (e.g. a horizontally scrolling ScrollView) - an
 * outline draws outside the element's own box via outlineOffset, so an
 * ancestor's overflow:hidden clips it (typically the top/bottom edges,
 * leaving stray left/right slivers). An inset boxShadow draws within the
 * element's own box instead, so it can't be clipped regardless of context.
 */
export const insetFocusRing: WebOnlyStyle = {
    boxShadow: `inset 0 0 0 ${focusRingSpace.outlineWidth}px ${colors.focusRing}`,
};

/**
 * boxShadow is a different CSS property than outline, so insetFocusRing
 * above doesn't occlude the browser's own default focus outline the way
 * focusRing's outline-based style does (same property, so it always fully
 * replaces it). Pairs with insetFocusRing wherever it's used, to suppress
 * that independently-rendered native outline explicitly.
 */
export const suppressNativeFocusOutline: WebOnlyStyle = {
    outlineStyle: "none",
};
