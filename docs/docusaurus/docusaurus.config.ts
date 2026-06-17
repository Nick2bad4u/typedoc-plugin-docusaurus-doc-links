import type {
    Options as ClassicPresetOptions,
    ThemeConfig as ClassicThemeConfig,
} from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";

import { themes as prismThemes } from "prism-react-renderer";

const organizationName = "Nick2bad4u";
const projectName = "typedoc-plugin-docusaurus-doc-links";
const siteOrigin = "https://nick2bad4u.github.io";
const baseUrl = `/${projectName}/`;
const repositoryUrl = `https://github.com/${organizationName}/${projectName}`;
const projectTagline =
    "Make generated TypeDoc Markdown links resolve as Docusaurus doc-file links.";
const yearFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
});
const currentYear = yearFormatter.format(Date.now());

const config = {
    baseUrl,
    baseUrlIssueBanner: true,
    deploymentBranch: "gh-pages",
    favicon: "img/logo.svg",
    future: {
        v4: {
            fasterByDefault: false,
            mdx1CompatDisabledByDefault: true,
            removeLegacyPostBuildHeadAttribute: true,
            siteStorageNamespacing: true,
        },
    },
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    markdown: {
        format: "detect",
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
        mermaid: true,
    },
    onBrokenAnchors: "throw",
    onBrokenLinks: "throw",
    onDuplicateRoutes: "throw",
    organizationName,
    plugins: [
        "docusaurus-plugin-image-zoom",
        [
            "@docusaurus/plugin-pwa",
            {
                // eslint-disable-next-line n/no-process-env -- Docusaurus PWA debug mode is intentionally environment-gated.
                debug: process.env.DOCUSAURUS_PWA_DEBUG === "true",
                offlineModeActivationStrategies: [
                    "appInstalled",
                    "queryString",
                    "standalone",
                ],
                pwaHead: [
                    {
                        content: "#0f766e",
                        name: "theme-color",
                        tagName: "meta",
                    },
                    {
                        href: `${baseUrl}manifest.json`,
                        rel: "manifest",
                        tagName: "link",
                    },
                    {
                        href: `${baseUrl}img/logo.svg`,
                        rel: "apple-touch-icon",
                        tagName: "link",
                    },
                ],
            },
        ],
    ],
    presets: [
        [
            "classic",
            {
                blog: false,
                docs: {
                    breadcrumbs: true,
                    editUrl: `${repositoryUrl}/blob/main/docs/docusaurus/`,
                    includeCurrentVersion: true,
                    onInlineTags: "ignore",
                    path: "site-docs",
                    routeBasePath: "docs",
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    sidebarCollapsed: true,
                    sidebarCollapsible: true,
                    sidebarPath: "./sidebars.ts",
                },
                googleTagManager: {
                    containerId: "GTM-T8J6HPLF",
                },
                gtag: {
                    trackingID: "G-18DR1S6R1T",
                },
                pages: {
                    editUrl: `${repositoryUrl}/blob/main/docs/docusaurus/`,
                    routeBasePath: "/",
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                },
                sitemap: {
                    filename: "sitemap.xml",
                    lastmod: "datetime",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies ClassicPresetOptions,
        ],
    ],
    projectName,
    staticDirectories: ["static"],
    tagline: projectTagline,
    themeConfig: {
        colorMode: {
            defaultMode: "dark",
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        footer: {
            copyright: `Copyright © ${currentYear} Nick2bad4u.`,
            links: [
                {
                    items: [
                        {
                            label: "󰈙 Overview",
                            to: "/docs/intro",
                        },
                        {
                            label: "🚀 Getting Started",
                            to: "/docs/getting-started",
                        },
                        {
                            label: "󰘦 API Reference",
                            to: "/docs/category/api-reference",
                        },
                    ],
                    title: "󰈙 Docs",
                },
                {
                    items: [
                        {
                            href: repositoryUrl,
                            label: "󰊤 GitHub",
                        },
                        {
                            href: `https://www.npmjs.com/package/${projectName}`,
                            label: "󰎙 npm",
                        },
                        {
                            href: `https://app.codecov.io/gh/${organizationName}/${projectName}`,
                            label: "📈 Codecov",
                        },
                    ],
                    title: "󰏗 Project",
                },
            ],
            logo: {
                alt: `${projectName} logo`,
                href: repositoryUrl,
                src: "img/logo.svg",
            },
            style: "dark",
        },
        image: "img/logo.svg",
        navbar: {
            hideOnScroll: true,
            items: [
                {
                    label: "󰈙 Docs",
                    position: "left",
                    to: "/docs/intro",
                },
                {
                    label: "󰘦 API",
                    position: "left",
                    to: "/docs/category/api-reference",
                },
                {
                    href: repositoryUrl,
                    label: "󰊤 GitHub",
                    position: "right",
                },
                {
                    href: `https://www.npmjs.com/package/${projectName}`,
                    label: "󰎙 npm",
                    position: "right",
                },
            ],
            logo: {
                alt: `${projectName} logo`,
                href: baseUrl,
                src: "img/logo.svg",
            },
            title: projectName,
        },
        prism: {
            additionalLanguages: [
                "bash",
                "json",
                "yaml",
                "typescript",
            ],
            darkTheme: prismThemes.dracula,
            defaultLanguage: "typescript",
            theme: prismThemes.github,
        },
        tableOfContents: {
            maxHeadingLevel: 4,
            minHeadingLevel: 2,
        },
        zoom: {
            selector: ".markdown > img",
        },
    } satisfies ClassicThemeConfig,
    themes: [
        "@docusaurus/theme-mermaid",
        [
            "@easyops-cn/docusaurus-search-local",
            {
                docsDir: "site-docs",
                docsRouteBasePath: "docs",
                hashed: true,
                highlightSearchTermsOnTargetPage: true,
                indexBlog: false,
                indexDocs: true,
                indexPages: true,
                language: ["en"],
                searchBarPosition: "left",
                searchBarShortcut: true,
                searchBarShortcutHint: true,
                searchBarShortcutKeymap: "ctrl+k",
            },
        ],
    ],
    title: projectName,
    titleDelimiter: "|",
    trailingSlash: true,
    url: siteOrigin,
} satisfies Config;

export default config;
