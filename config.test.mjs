import test from "ava";

/**
 * @param {unknown} value
 * @returns {unknown}
 */
function serialize(value) {
    if (typeof value === "function") {
        return `[Function ${value.name}]`;
    }
    if (Array.isArray(value)) {
        return value.map((it) => serialize(it));
    }
    if (value && typeof value === "object") {
        const entries = Object.entries(value);
        const mapped = entries.map(([key, it]) => {
            key = key.replace(process.cwd(), "<rootDir>");
            if (key === "plugins") {
                const pluginEntries = Object.entries(it);
                const pluginMapped = pluginEntries.map(([key, jt]) => {
                    return [key, `[Plugin ${jt.meta?.name ?? key}]`];
                });
                return [key, Object.fromEntries(pluginMapped)];
            }
            if (key === "parser") {
                return [key, `[Parser ${it.meta?.name ?? key}]`];
            }
            return [key, serialize(it)];
        });
        return Object.fromEntries(mapped);
    }
    return value;
}

const packages = [
    "@forsakringskassan/eslint-config",
    "@forsakringskassan/eslint-config-angular",
    "@forsakringskassan/eslint-config-cli",
    "@forsakringskassan/eslint-config-cypress",
    "@forsakringskassan/eslint-config-jest",
    "@forsakringskassan/eslint-config-svelte",
    "@forsakringskassan/eslint-config-typescript",
    "@forsakringskassan/eslint-config-vue",
];

for (const pkg of packages) {
    test(pkg, async (t) => {
        const { default: config } = await import(`${pkg}/flat.mjs`);
        t.snapshot(serialize(config));
    });
}
