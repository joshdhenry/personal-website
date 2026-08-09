// Jest stand-in for a required non-JS asset (e.g. the resume PDF). Shaped
// like the object expo-asset's Asset.fromModule expects from a web-resolved
// asset module, so the real fromModule code path runs in tests too.
module.exports = { uri: "test-file-stub.pdf" };
