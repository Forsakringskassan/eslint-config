import { fileURLToPath } from "node:url";
import path from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import legacyConfig from "./index.cjs";

function merge(result, it) {
    return {
        ...result,
        ...it,
        languageOptions: { ...result.languageOptions, ...it.languageOptions },
        plugins: { ...result.plugins, ...it.plugins },
        rules: { ...result.rules, ...it.rules },
    };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
});

const migrated = compat.config(legacyConfig).reduce(merge, {});

delete migrated.languageOptions;
migrated.name = "@forsakringskassan/eslint-config-cli";
migrated.files = ["*.{js,ts,cjs,mjs}", "**/scripts/*.{js,ts,cjs,mjs}"];

export default (override) => merge(migrated, override ?? {});
