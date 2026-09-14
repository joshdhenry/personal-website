// Exists only so Snack's git-import finds a root App file (issue 613);
// nothing below runs - Metro uses package.json's "main", and
// publish-snack.mts replaces this file's content in the uploaded copy.
import "expo-router/entry";
