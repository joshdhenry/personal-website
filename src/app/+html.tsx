import { ScrollViewStyleReset } from "expo-router/html";

import { colors } from "@/theme/colors";
import type { ChildrenProps } from "@/types/app";

// Avoids a white flash before React Native Web's own styles apply.
const backgroundResetStyle = { __html: `body{background-color:${colors.bg};}` };

/**
 * Root HTML template for static web export. Runs only on web, only at
 * build/export time. See https://docs.expo.dev/router/reference/static-rendering/#root-html
 */
export default ({ children }: ChildrenProps) => (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <ScrollViewStyleReset />
            <style dangerouslySetInnerHTML={backgroundResetStyle} />
        </head>
        <body>{children}</body>
    </html>
);
