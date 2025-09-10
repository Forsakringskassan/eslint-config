module.exports = {
    extends: [
        "@forsakringskassan/typescript",
        "plugin:vue/recommended",
        "plugin:prettier/recommended",
    ],

    env: {
        browser: true,
        node: false,
    },

    parserOptions: {
        parser: "@typescript-eslint/parser",
    },

    rules: {
        curly: "error" /* disabled by prettier/recommended, reenabled again */,
        "@typescript-eslint/no-object-literal-type-assertion": ["off"],

        /* documentation for vue components does not adhere with tsdoc syntax */
        "tsdoc/syntax": "off",

        /* this rule warns about the order of the top-level tags */
        "vue/block-order": [
            "error",
            {
                order: ["script", "template", "style"],
            },
        ],

        /* underlying custom elements have started to expose native slots */
        "vue/no-deprecated-slot-attribute": "off",
    },
};
