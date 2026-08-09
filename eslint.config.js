// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
    expoConfig,
    prettierConfig,
    {
        // designs/ is a reference bundle (a design prototype and its support
        // script), not application source, so it is exempt from this repo's
        // lint rules.
        ignores: ["dist/*", "designs/*"],
    },
    {
        // Expo Router route files (src/app/**) are located by filename, not
        // component name, and are exported anonymously (declared and
        // exported on one line, per this repo's convention) — a displayName
        // would be dead weight here.
        files: ["src/app/**/*.tsx"],
        rules: {
            "react/display-name": "off",
        },
    },
]);
