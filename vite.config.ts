import { defineConfig } from "vitest/config";

export default defineConfig({
    cacheDir: "./.cache/vitest",
    test: {
        coverage: {
            include: ["*.mjs"],
            provider: "v8",
            reporter: [
                "text",
                "json",
                "lcov",
                "html",
            ],
            reportsDirectory: "./coverage",
        },
        environment: "node",
        exclude: [
            "**/.cache/**",
            "**/coverage/**",
            "**/node_modules/**",
        ],
        include: ["test/**/*.test.ts"],
        name: "typedoc-plugin-docusaurus-doc-links",
        restoreMocks: true,
        slowTestThreshold: 300,
        typecheck: {
            checker: "tsc",
            enabled: true,
            tsconfig: "./tsconfig.json",
        },
    },
});
