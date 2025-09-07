import { Linter } from "eslint";

declare const config: Linter.Config[];
export const globals: typeof import("globals");

export default config;
