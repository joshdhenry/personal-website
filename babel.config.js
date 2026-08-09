module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            // react-native-reanimated/plugin must stay the last entry: it rewrites
            // worklets at compile time, and any plugin listed after it can undo
            // that rewrite, causing animations to silently no-op with no error.
            "react-native-reanimated/plugin",
        ],
    };
};
