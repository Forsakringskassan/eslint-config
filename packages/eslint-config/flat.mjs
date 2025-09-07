import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import prettierPlugin from "eslint-plugin-prettier";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import globals from "globals";

export { default as globals } from "globals";

/**
 * @typedef {import("eslint").Linter.Config} Config
 */

/**
 * @param {Config} config
 * @returns {Config}
 */
function defineConfig(config) {
    return config;
}

export default [
    defineConfig({
        ...js.configs.recommended,
    }),

    defineConfig({
        ...prettierConfig,
    }),

    defineConfig({
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            ...prettierPlugin.configs.recommended.rules,
        },
    }),

    defineConfig({
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...importPlugin.configs.errors.rules,
        },
    }),

    defineConfig({
        plugins: {
            "eslint-comments": eslintCommentsPlugin,
        },
        rules: {
            ...eslintCommentsPlugin.configs.recommended.rules,
        },
    }),

    defineConfig({
        plugins: {
            sonarjs: sonarjsPlugin,
        },
        rules: {
            ...sonarjsPlugin.configs.recommended.rules,
        },
    }),

    defineConfig({
        languageOptions: {
            globals: {
                ...globals.es6,
            },
            parserOptions: {
                ecmaFeatures: {
                    globalReturn: true,
                },
            },
        },
    }),

    defineConfig({
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    }),

    defineConfig({
        settings: {
            "import/resolver": {
                [fileURLToPath(
                    import.meta.resolve("eslint-import-resolver-node"),
                )]: true,
                [fileURLToPath(
                    import.meta.resolve("eslint-import-resolver-typescript"),
                )]: true,
            },
        },

        rules: {
            camelcase: "error",
            complexity: ["error", 20],
            "consistent-return": "error",
            curly: "error",
            eqeqeq: "error",
            "max-depth": ["error", 3],
            "max-params": ["error", { max: 5 }],
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-loop-func": "error",
            "no-new": "error",
            "no-new-func": "error",
            "no-unreachable": "error",
            "no-unused-vars": "error",
            "no-var": "error",
            "no-warning-comments": "error",
            "prefer-const": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",
            "prefer-template": "error",
            radix: "error",
            yoda: "error",

            "eslint-comments/disable-enable-pair": [
                "error",
                { allowWholeFile: true },
            ],
            "eslint-comments/require-description": [
                "error",
                {
                    ignore: [
                        "eslint-enable",
                        "eslint-env",
                        "exported",
                        "global",
                        "globals",
                    ],
                },
            ],
            "eslint-comments/no-unused-disable": "error",

            /* Use eslint native complexity rule instead */
            "sonarjs/cognitive-complexity": "off",

            /* Prefer to use multiple returns even for booleans (looks better and
             * can yield performance increase), see example of this in
             * "example.js". */
            "sonarjs/prefer-single-boolean-return": "off",

            /* This rule is deemed to provide more trouble than actual value.
             * Especially because of the prevalence of translations, i.e., text
             * keys. */
            "sonarjs/no-duplicate-string": "off",

            /* Lower some errors to warnings, these are allowed on local builds (to
             * not prevent builds during development where code is unfinished and
             * might contain debugging code) but is disallowed when building from
             * Jenkins (via `--max-warnings 0`) */
            "no-console": "warn",
            "no-debugger": "warn",
            "prettier/prettier": "warn",

            "import/default": "off",
            "import/extensions": [
                "error",
                "never",
                {
                    css: "always",
                    json: "always",
                },
            ],
            "import/newline-after-import": "error",
            "import/no-absolute-path": "error",
            "import/no-deprecated": "error",
            "import/no-duplicates": "error",
            "import/no-dynamic-require": "error",
            "import/no-extraneous-dependencies": "error",
            "import/no-mutable-exports": "error",
            "import/no-named-as-default": "error",
            "import/no-named-as-default-member": "error",
            "import/no-named-default": "error",
            "import/no-unresolved": [
                "error",
                {
                    /* neither of the resolvers will handle @ alias */
                    ignore: ["^@"],
                },
            ],
            "import/no-useless-path-segments": "error",
            "import/order": [
                "error",
                {
                    pathGroups: [
                        {
                            pattern: "@/**",
                            group: "parent",
                            position: "before",
                        },
                    ],
                },
            ],
        },
    }),

    defineConfig({
        name: "@forsakringskassan/eslint-config/ecma-version",
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: "module",
        },
    }),

    defineConfig({
        /* ensure cjs and mjs files are linted too */
        name: "@forsakringskassan/eslint-config/extensions",
        files: ["**/*.cjs", "**/*.mjs"],
    }),

    defineConfig({
        /* mjs requires file extension */
        name: "@forsakringskassan/eslint-config/esm",
        files: ["**/*.mjs"],
        rules: {
            "import/extensions": ["error", "always"],
        },
    }),
];
