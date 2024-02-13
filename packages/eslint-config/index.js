module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:import/errors",
        "plugin:eslint-comments/recommended",
        "plugin:sonarjs/recommended",
    ],

    env: {
        es6: true,
        node: true,
    },

    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
    },

    settings: {
        "import/resolver": {
            [require.resolve("eslint-import-resolver-node")]: true,
            [require.resolve("eslint-import-resolver-typescript")]: true,
        },
    },

    rules: {
        camelcase: "error",
        complexity: ["error", 20],
        "consistent-return": "error",
        curly: "error",
        eqeqeq: "error",
        "max-depth": ["error", 3],
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
        "import/extensions": ["error", "never", { json: "always" }],
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
};
