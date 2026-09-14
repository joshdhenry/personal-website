import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";

const { Snack } = await import("snack-sdk");

const BINARY_EXTENSIONS = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".pdf",
    ".ico",
    ".ttf",
    ".otf",
    ".woff",
    ".woff2",
]);

// Only what's actually needed to run the app: src/ and assets/ (recursive),
// plus the handful of runtime-relevant root files. Everything else in the
// repo (tests, designs/, eslint/jest config, docs) is project tooling or
// reference material Snack shouldn't try to resolve as part of the bundle -
// it was trying to import devDependencies like "eslint/config" when the
// whole repo was included.
const RUNTIME_ROOT_FILES = new Set([
    "App.tsx",
    "app.json",
    "package.json",
    "babel.config.js",
    "tsconfig.json",
]);

const trackedFiles = execSync("git ls-tree -r HEAD --name-only", { encoding: "utf8" })
    .split("\n")
    .filter(Boolean)
    .filter(
        (path) =>
            path.startsWith("src/") || path.startsWith("assets/") || RUNTIME_ROOT_FILES.has(path),
    )
    .filter((path) => !path.endsWith(".test.ts") && !path.endsWith(".test.tsx"));

// Snack's bundler doesn't resolve the "@/*" alias the way local Metro does
// via tsconfig.json's "paths" (confirmed: a standalone tsconfig.json with
// just that paths mapping still left every "@/" import unresolved), and
// babel-plugin-module-resolver - the standard bundler-agnostic alias
// mechanism - fails too, because Snack runs babel.config.js plugins in a
// browser context and that plugin's bundle needs "node:events" (Module
// build failed: UnhandledSchemeError). So instead of relying on any alias
// mechanism, every "@/" import gets rewritten to the equivalent relative
// path at upload time - relative imports need no special resolution
// support at all. The real repo's source files are untouched; only the
// uploaded copy has the rewrite applied.
const ALIAS_IMPORT_PATTERN = /(from\s+|require\()(["'])@\/([^"']+)\2/g;

const rewriteAliasImports = (sourceCode, fileRepoPath) => {
    const fileDirectory = dirname(fileRepoPath);

    return sourceCode.replace(ALIAS_IMPORT_PATTERN, (match, prefix, quote, aliasedPath) => {
        const targetRepoPath = join("src", aliasedPath);
        let relativePath = relative(fileDirectory, targetRepoPath).split("\\").join("/");

        if (!relativePath.startsWith(".")) {
            relativePath = `./${relativePath}`;
        }

        return `${prefix}${quote}${relativePath}${quote}`;
    });
};

// Snack's in-browser TypeScript parser doesn't support the "satisfies"
// operator (TS 4.9+) - src/theme/typography.ts's "} satisfies
// TextStyleToken," entries fail with a raw parse error. It's a type-only
// construct with no runtime effect, so it's safe to strip for the Snack
// copy only; the real repo keeps it.
const SATISFIES_PATTERN = /\ssatisfies\s+[A-Za-z_$][\w$]*/g;

const stripSatisfiesOperator = (sourceCode) => sourceCode.replace(SATISFIES_PATTERN, "");

const files = {};

for (const path of trackedFiles) {
    const isBinary = BINARY_EXTENSIONS.has(extname(path).toLowerCase());

    if (isBinary) {
        const buffer = readFileSync(path);
        files[path] = {
            type: "ASSET",
            contents: new Blob([buffer]),
        };
    } else if (path === "App.tsx") {
        // expo-router/entry - the real repo's normal entry point - never
        // successfully boots inside Snack: this is a known, still-open
        // upstream bug (github.com/expo/snack/issues/459, open since SDK 49)
        // where Snack's web-preview host can't route any expo-router app
        // through the entry point's own bootstrap, regardless of project
        // content (reproduced with a from-scratch hello-world snack).
        // The confirmed community workaround is to skip expo-router/entry
        // and boot ExpoRoot directly with an explicit require.context and
        // location, which sidesteps whatever entry does that fails in
        // Snack's environment. The real repo's App.tsx (plain
        // "expo-router/entry" import) is untouched - this only affects the
        // uploaded Snack copy.
        //
        // registerRootComponent(App) is required here even though the plain
        // default export is enough for Snack's web preview to render (its
        // browser bundler mounts a module's default export directly,
        // bypassing React Native's AppRegistry entirely). expo-router/entry's
        // real entry-classic.js calls registerRootComponent for exactly this
        // reason: on native, nothing else ever calls AppRegistry.
        // registerComponent - without it, Expo Go's bridge boots, the bundle
        // evaluates with no error, but no root component is ever registered
        // to mount, so the app hangs on "Connecting..." forever (reproduced:
        // confirmed via Snack's own Appetize-embedded Android/iOS preview,
        // with the resume PDF asset ruled out as an unrelated red herring).
        files[path] = {
            type: "CODE",
            contents: `import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import Head from "expo-router/head";

function App() {
    return (
        <Head.Provider>
            <ExpoRoot context={require.context("./src/app", true)} location="/" />
        </Head.Provider>
    );
}

registerRootComponent(App);

export default App;
`,
        };
    } else if (path === "app.json") {
        // web.output: "static" builds a separate pre-rendered HTML file per
        // route via "expo export" (SSG), which Snack's live-preview server
        // doesn't produce - it serves one dev bundle, SPA-style. With
        // "static" still set, Snack's web preview shows Expo's own
        // infrastructure-level 404 (unrelated to this app's own
        // +not-found.tsx, which never even mounts) instead of the app.
        // "single" is the standard client-rendered SPA mode Snack expects;
        // the real repo keeps "static" for the actual joshhenry.info build.
        const appJson = JSON.parse(readFileSync(path, "utf8"));
        appJson.expo.web.output = "single";
        files[path] = {
            type: "CODE",
            contents: JSON.stringify(appJson, null, 4),
        };
    } else {
        const sourceCode = readFileSync(path, "utf8");
        files[path] = {
            type: "CODE",
            contents: stripSatisfiesOperator(rewriteAliasImports(sourceCode, path)),
        };
    }
}

console.log(`Publishing ${Object.keys(files).length} files...`);

// Snack ignores the "dependencies" field inside an uploaded package.json -
// it only resolves packages listed in this separate constructor option
// (confirmed: package.json's dependencies were silently dropped, and only
// entries added via the editor's own "Add dependency" UI ever appeared in
// Snack's dependency state). Deep imports (e.g. "expo-router/html") need
// their own entries here too, keyed by the full import path, not just the
// package name. "expo-router/entry" itself isn't needed - the Snack copy's
// App.tsx (above) never imports it.
const realPackageJson = JSON.parse(readFileSync("package.json", "utf8"));
const dependencies = {};

for (const [packageName, versionRange] of Object.entries(realPackageJson.dependencies)) {
    dependencies[packageName] = { version: versionRange };
}

dependencies["expo-router/html"] = dependencies["expo-router"];
dependencies["expo-router/head"] = dependencies["expo-router"];

// Without an authenticated user, saveAsync() creates a fresh anonymous
// Snack every run - it can't update the existing @joshdhenry/joshhenry.info
// slug in place, so publishing would need a manual "open this URL, click
// Save while logged in" step every time. Passing an Expo personal access
// token here (Authorization: Bearer, per snack-sdk's own utils.js) makes
// the save authenticated, and Snack's save endpoint matches by project name
// under that account - the same behavior confirmed by hand via the browser
// Save button - so this overwrites the existing slug directly, no manual
// step. Generate a token at https://expo.dev (account settings > Access
// Tokens - the same mechanism EAS CLI's own EXPO_TOKEN uses for CI) and set
// it as EXPO_ACCESS_TOKEN. Never hardcode the token here or commit it.
const accessToken = process.env.EXPO_ACCESS_TOKEN;

const snack = new Snack({
    dependencies,
    files,
    name: "joshhenry.info",
    sdkVersion: "54.0.0",
    user: accessToken ? { accessToken } : undefined,
});

const { id } = await snack.saveAsync();

if (accessToken) {
    console.log("Published: https://snack.expo.dev/@joshdhenry/joshhenry.info");
} else {
    console.log("No EXPO_ACCESS_TOKEN set - published anonymously, not to the permanent URL.");
    console.log(`Publish this to https://snack.expo.dev/@joshdhenry/joshhenry.info:`);
    console.log(`  1. Open https://snack.expo.dev/${id}`);
    console.log(`  2. Make sure you're logged into Josh's Expo account`);
    console.log(`  3. Click Save - it overwrites the existing @joshdhenry/joshhenry.info slug`);
}
