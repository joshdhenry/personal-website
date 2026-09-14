// Exists only so Expo Snack's git-import finds a root App file (see
// github.com/expo/snack/issues/613); nothing below ever runs - Metro uses
// package.json's "main" instead, and publish-snack.mjs replaces this
// file's content entirely in the uploaded copy.
import "expo-router/entry";
