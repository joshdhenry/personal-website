import { colors } from "@/theme/colors";
import { navSpace } from "@/theme/spacing";

import { getNavBackground } from "./nav";

describe("getNavBackground", () => {
    it("includes a backdrop blur on web", () => {
        expect(getNavBackground("web")).toEqual({
            backdropFilter: `blur(${navSpace.backdropBlurRadius}px)`,
            backgroundColor: colors.bgTranslucent,
        });
    });

    it("omits the blur on native", () => {
        expect(getNavBackground("ios")).toEqual({ backgroundColor: colors.bgTranslucent });
    });
});
