module.exports = {
    preset: "jest-expo",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-reanimated|react-native-worklets)",
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.pdf$": "<rootDir>/__mocks__/fileMock.js",
    },
    setupFiles: ["<rootDir>/jest.setup.js"],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: ["text", "html"],
};
