// @ts-check

import { PageEvent } from "typedoc";

import { prefixBareMarkdownFileLinksInMarkdown } from "./docusaurus-doc-links-core.mjs";

/**
 * TypeDoc plugin entrypoint.
 *
 * @param {import("typedoc").Application} app
 *
 * @returns {void}
 */
export function load(app) {
    app.renderer.on(PageEvent.END, onPageEnd);
}

/**
 * Renderer hook that runs after a page has been rendered.
 *
 * @param {import("typedoc").PageEvent} page
 *
 * @returns {void}
 */
function onPageEnd(page) {
    if (typeof page.contents !== "string") {
        return;
    }

    if (!page.url.endsWith(".md") && !page.url.endsWith(".mdx")) {
        return;
    }

    page.contents = prefixBareMarkdownFileLinksInMarkdown(page.contents);
}
