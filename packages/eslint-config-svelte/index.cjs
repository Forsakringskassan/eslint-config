module.exports = {
    extends: ["plugin:svelte/recommended"],
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
    },
    parserOptions: {
        extraFileExtensions: [".svelte"],
    },
    overrides: [
        {
            files: ["*.svelte"],
            parser: "svelte-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
        },
        {
            files: ["**/*.svelte.js", "*.svelte.js"],
            parser: "svelte-eslint-parser",
        },
    ],
};
