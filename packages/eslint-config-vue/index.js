const semver = require("semver");
const vue = require("vue");

function detectVueMajor() {
    try {
        return semver.major(vue.version);
    } catch (err) {
        // eslint-disable-next-line no-console -- Print error
        console.error("Failed to detect Vue version:", err);
        // eslint-disable-next-line no-console -- Use Vue 2 as default
        console.error("Assuming Vue 2");
        return 2;
    }
}

module.exports = {
    extends: [
        "@forsakringskassan/typescript",
        detectVueMajor() === 3
            ? "plugin:vue/vue3-recommended"
            : "plugin:vue/recommended",
        "plugin:prettier/recommended",
    ],

    env: {
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
    },
};
