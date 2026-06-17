import {
    type Application,
    PageEvent,
    type PageEvent as TypeDocPageEvent,
} from "typedoc";

import { prefixBareMarkdownFileLinksInMarkdown } from "./core.js";

/**
 * TypeDoc plugin entrypoint.
 *
 * @param app - TypeDoc app instance.
 */
export function load(app: Application): void {
    app.renderer.on(PageEvent.END, onPageEnd);
}

function onPageEnd(page: TypeDocPageEvent): void {
    if (typeof page.contents !== "string") {
        return;
    }

    if (!page.url.endsWith(".md") && !page.url.endsWith(".mdx")) {
        return;
    }

    page.contents = prefixBareMarkdownFileLinksInMarkdown(page.contents);
}
