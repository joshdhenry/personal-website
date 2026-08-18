// Expo Snack's git-import expects a root-level App entry file and doesn't
// recognize Expo Router's "main": "expo-router/entry" in package.json (see
// https://github.com/expo/snack/issues/613 for the same failure on an
// identically-shaped project). This file exists only to satisfy that import
// check; Metro itself still uses the real entry point via package.json's
// main field, this file is never loaded outside Snack.
import "expo-router/entry";
