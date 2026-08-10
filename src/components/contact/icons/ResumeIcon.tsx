import Svg, { Path } from "react-native-svg";

import { colors } from "@/theme/colors";
import { contactSpace } from "@/theme/spacing";

// Path geometry copied verbatim from designs/joshhenry.info.dc.html's
// #contact resume badge inline SVG (a stroked document outline).
export const ResumeIcon = () => (
    <Svg
        fill="none"
        height={contactSpace.badgeIconSize}
        viewBox="0 0 24 24"
        width={contactSpace.badgeIconSize}
    >
        <Path
            d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5z"
            stroke={colors.primary}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
        />
        <Path
            d="M14 2.5v5h5"
            stroke={colors.primary}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
        />
        <Path
            d="M9 13h6M9 17h6"
            stroke={colors.primary}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
        />
    </Svg>
);
