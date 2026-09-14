import { execSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";

import type { SnackFile } from "snack-content";

const { Snack } = await import("snack-sdk");

const BINARY_EXTENSIONS = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".svg",
    ".pdf",
    ".ico",
    ".ttf",
    ".otf",
    ".woff",
    ".woff2",
]);

// Root files the bundle needs; everything else (tests, designs/, tooling
// configs) made Snack try to resolve devDependencies like "eslint/config".
const RUNTIME_ROOT_FILES = new Set([
    "App.tsx",
    "app.json",
    "package.json",
    "babel.config.js",
    "tsconfig.json",
]);

// --cached (tracked) + --others --exclude-standard (untracked, not
// gitignored) so an uncommitted new file still publishes - readFile below
// already reads working-tree content, not the last commit's.
const trackedFiles = execSync("git ls-files --cached --others --exclude-standard", {
    encoding: "utf8",
})
    .split("\n")
    .filter(Boolean)
    .filter(
        (path) =>
            path.startsWith("src/") || path.startsWith("assets/") || RUNTIME_ROOT_FILES.has(path),
    )
    .filter((path) => !path.endsWith(".test.ts") && !path.endsWith(".test.tsx"));

// Snack's bundler can't resolve the "@/*" alias like local Metro does, so
// every "@/" import is rewritten to a relative path at upload time only.
// The trailing lookahead avoids rewriting a comment/string with the same text.
const ALIAS_IMPORT_PATTERN = /(from\s+|require\()(["'])@\/([^"']+)\2(?=[;)])/g;

const rewriteAliasImports = (sourceCode: string, fileRepoPath: string): string => {
    const fileDirectory = dirname(fileRepoPath);

    return sourceCode.replace(
        ALIAS_IMPORT_PATTERN,
        (_match, prefix: string, quote: string, aliasedPath: string) => {
            const targetRepoPath = join("src", aliasedPath);
            let relativePath = relative(fileDirectory, targetRepoPath).split("\\").join("/");

            if (!relativePath.startsWith(".")) {
                relativePath = `./${relativePath}`;
            }

            return `${prefix}${quote}${relativePath}${quote}`;
        },
    );
};

// Snack's in-browser TS parser doesn't support "satisfies" (TS 4.9+), a
// type-only construct safe to strip for the Snack copy only; the optional
// generic-argument group also strips e.g. "satisfies Record<string, Foo>".
const SATISFIES_PATTERN = /\ssatisfies\s+[A-Za-z_$][\w$]*(?:<[^;\n]*>)?/g;

const stripSatisfiesOperator = (sourceCode: string): string =>
    sourceCode.replace(SATISFIES_PATTERN, "");

// Snack's in-browser TS parser can't parse a numeric-literal union type at
// all (e.g. "1 | -1", src/utils/scroll.ts's hasSectionOrderReachedTarget) -
// confirmed live: loosening just the negative sign to "1 | number" still
// crashed identically, so the whole union collapses to "number" instead.
const NUMERIC_LITERAL_UNION_PATTERN = /-?\d+(?:\s*\|\s*-?\d+)+/g;

const collapseNumericLiteralUnionTypes = (sourceCode: string): string =>
    sourceCode.replace(NUMERIC_LITERAL_UNION_PATTERN, "number");

// Read once and reused for both the uploaded files entry and the
// dependencies derivation below, so the two can never see different content.
const packageJsonSourceCode = await readFile("package.json", "utf8");
const realPackageJson: { dependencies: Record<string, string> } = JSON.parse(packageJsonSourceCode);

// Reads every tracked file concurrently - trackedFiles regularly includes
// 100+ entries (src/, assets/), and each read is independent.
const fileEntries: [string, SnackFile][] = await Promise.all(
    trackedFiles.map(async (path): Promise<[string, SnackFile]> => {
        const isBinary = BINARY_EXTENSIONS.has(extname(path).toLowerCase());

        if (isBinary) {
            const buffer = await readFile(path);

            return [path, { type: "ASSET", contents: new Blob([buffer]) }];
        } else if (path === "package.json") {
            return [
                path,
                {
                    type: "CODE",
                    contents: collapseNumericLiteralUnionTypes(
                        stripSatisfiesOperator(rewriteAliasImports(packageJsonSourceCode, path)),
                    ),
                },
            ];
        } else if (path === "App.tsx") {
            // expo-router/entry never boots inside Snack (issue 459) - this
            // boots ExpoRoot directly instead; registerRootComponent is
            // required too, or the web bundler never mounts a root component.
            return [
                path,
                {
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
                },
            ];
        } else if (path === "app.json") {
            // Snack's web preview serves one dev bundle, not per-route static
            // HTML - "static" output shows Expo's own 404 there. "single" is
            // the SPA mode Snack expects; the real app.json keeps "static".
            const appJson = JSON.parse(await readFile(path, "utf8"));
            appJson.expo.web.output = "single";

            return [path, { type: "CODE", contents: JSON.stringify(appJson, null, 4) }];
        } else {
            const sourceCode = await readFile(path, "utf8");

            return [
                path,
                {
                    type: "CODE",
                    contents: collapseNumericLiteralUnionTypes(
                        stripSatisfiesOperator(rewriteAliasImports(sourceCode, path)),
                    ),
                },
            ];
        }
    }),
);

const files = Object.fromEntries(fileEntries);

console.log(`Publishing ${Object.keys(files).length} files...`);

// Snack ignores package.json's own "dependencies" field - it only resolves
// what's passed here. Deep imports (e.g. "expo-router/html") need their own
// entries too, keyed by the full import path.
const dependencies: Record<string, { version: string }> = {};

for (const [packageName, versionRange] of Object.entries(realPackageJson.dependencies)) {
    dependencies[packageName] = { version: versionRange };
}

dependencies["expo-router/html"] = dependencies["expo-router"];
dependencies["expo-router/head"] = dependencies["expo-router"];

// Without a token, saveAsync() creates a new anonymous Snack each run
// instead of updating the existing slug. Generate one at expo.dev (Access
// Tokens) and set EXPO_ACCESS_TOKEN - never commit it.
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
