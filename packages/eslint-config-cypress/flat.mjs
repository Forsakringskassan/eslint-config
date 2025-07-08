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

migrated.name = "@forsakringskassan/eslint-config-cypress";
migrated.files = ["**/*.cy.[jt]s"];

export default (override) => merge(migrated, override ?? {});
