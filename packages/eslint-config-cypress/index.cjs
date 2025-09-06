module.exports = {
    env: {
        "cypress/globals": true,
    },
    plugins: ["cypress", "mocha"],
    extends: ["plugin:cypress/recommended"],
    rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/triple-slash-reference": "off",
        "mocha/no-exclusive-tests": "warn",
        "mocha/no-identical-title": "error",
        "mocha/no-pending-tests": "warn",
        "mocha/no-skipped-tests": "warn",
    },
};
