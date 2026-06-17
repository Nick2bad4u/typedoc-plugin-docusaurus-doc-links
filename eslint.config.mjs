import { createConfig } from "eslint-config-nick2bad4u";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line unicorn/prefer-import-meta-properties -- Keep compatibility with the declared Node >=22.0.0 engine.
const rootDirectory = fileURLToPath(new URL(".", import.meta.url));

/** @type {import("eslint").Linter.Config[]} */
const config = [
    {
        ignores: [
            "docs/docusaurus/site-docs/developer/api/**",
            "docs/docusaurus/static/img/coverage.json",
            "docs/docusaurus/static/img/coverage.svg",
        ],
        name: "Generated Docusaurus API output",
    },
    ...createConfig({
        rootDirectory,
        tsconfigPaths: ["./tsconfig.eslint.json"],
    }),
    {
        files: ["docs/docusaurus/src/pages/index.tsx"],
        rules: {
            "canonical/filename-no-index": "off",
        },
    },
    {
        files: ["docs/docusaurus/site-docs/**/*.md"],
        rules: {
            "markdown/no-multiple-h1": "off",
        },
    },
    {
        files: ["docs/docusaurus/static/manifest.json"],
        rules: {
            "json-schema-validator-2/no-invalid": "off",
        },
    },
];

export default config;
