#!/usr/bin/env node

const path = require("path");
const { spawn } = require("child_process");

const pkgPath = path.dirname(require.resolve("eslint/package.json"));
const binary = path.join(pkgPath, "bin/eslint");

spawn("node", [binary, ...process.argv.slice(2)], {
    stdio: "inherit",
}).on("exit", (code) => {
    process.exit(code);
});
