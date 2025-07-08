module.exports = {
    env: {
        jest: true,
    },

    plugins: ["jest"],

    extends: ["plugin:jest/recommended", "plugin:jest/style"],

    rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "jest/consistent-test-it": ["error", { fn: "it" }],
        "jest/no-alias-methods": "error",
        "jest/no-disabled-tests": "warn",
        "jest/no-duplicate-hooks": "error",
        "jest/no-focused-tests": "warn",
        "jest/no-large-snapshots": [
            "error",
            { maxSize: 25, inlineMaxSize: 10 },
        ],
        "jest/no-test-prefixes": "warn",
        "jest/prefer-hooks-on-top": "error",
        "jest/prefer-todo": "error",

        /* jest uses @jest-* tags for per-file configuration */
        "tsdoc/syntax": "off",
    },
};
