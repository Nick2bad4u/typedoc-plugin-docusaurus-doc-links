// @ts-check

const SCHEME_RE = /^[A-Za-z][+\-.A-Za-z]*:/v;

/**
 * @typedef {{ marker: "`" | "~"; length: number }} FenceState
 */

/**
 * Prefixes bare intra-doc Markdown file links with `./`.
 *
 * The function is designed for TypeDoc markdown renderer output. It avoids
 * fenced code blocks and inline code spans.
 *
 * @param {string} input
 *
 * @returns {string}
 */
export function prefixBareMarkdownFileLinksInMarkdown(input) {
    const newline = input.includes("\r\n") ? "\r\n" : "\n";
    const lines = input.split(/\r?\n/v);

    /** @type {null | FenceState} */
    let fenceState = null;

    const outLines = lines.map((line) => {
        const fenceMatch = /^\s*(?<marker>[`~])\k<marker>{2,}/v.exec(line);
        if (fenceMatch) {
            const [matchText] = fenceMatch;
            const run = matchText.trimStart();
            const { groups } = fenceMatch;
            const typedGroups =
                /** @type {undefined | { marker: string | undefined }} */ (
                    groups
                );
            const markerChar = typedGroups?.marker ?? run.charAt(0);
            /** @type {"`" | "~"} */
            const marker = markerChar === "`" ? "`" : "~";
            const { length } = run;

            if (fenceState === null) {
                fenceState = { length, marker };
            } else if (
                marker === fenceState.marker &&
                length >= fenceState.length
            ) {
                fenceState = null;
            }

            return line;
        }

        if (fenceState !== null) {
            return line;
        }

        return prefixInlineMarkdownLinksInLine(line);
    });

    return outLines.join(newline);
}

/**
 * @param {string} input
 * @param {number} startIndex
 *
 * @returns {number}
 */
function findInlineLinkClosingParen(input, startIndex) {
    let depth = 0;
    let index = startIndex;

    while (index < input.length) {
        const character = input.charAt(index);

        if (character === "(") {
            depth += 1;
            index += 1;
            continue;
        }

        if (character === ")") {
            if (depth === 0) {
                return index;
            }

            depth -= 1;
            index += 1;
            continue;
        }

        if (character === "\\") {
            index += 2;
            continue;
        }

        index += 1;
    }

    return -1;
}

/**
 * @param {string} line
 * @param {number} closeBracketIndex
 *
 * @returns {number}
 */
function findInlineLinkLabelOpenBracket(line, closeBracketIndex) {
    let depth = 0;

    for (let index = closeBracketIndex - 1; index >= 0; index -= 1) {
        const character = line.charAt(index);
        const isBracket = character === "[" || character === "]";
        const escapedBracket = isBracket && isEscaped(line, index);

        if (!escapedBracket) {
            if (character === "]") {
                depth += 1;
            } else if (character === "[") {
                if (depth === 0) {
                    return index;
                }

                depth -= 1;
            }
        }
    }

    return -1;
}

/**
 * @param {string} input
 * @param {number} index
 *
 * @returns {boolean}
 */
function isEscaped(input, index) {
    let backslashCount = 0;
    let currentIndex = index - 1;

    while (currentIndex >= 0 && input.charAt(currentIndex) === "\\") {
        backslashCount += 1;
        currentIndex -= 1;
    }

    return backslashCount % 2 === 1;
}

/**
 * @param {string} destination
 *
 * @returns {string}
 */
function prefixIfBareRelativeMarkdownFile(destination) {
    const trimmedStart = destination.trimStart();
    const leadingWhitespace = destination.slice(
        0,
        destination.length - trimmedStart.length
    );

    const trimmedEnd = destination.trimEnd();
    const trailingWhitespace = destination.slice(trimmedEnd.length);

    const trimmed = destination.slice(
        leadingWhitespace.length,
        destination.length - trailingWhitespace.length
    );

    if (
        trimmed.startsWith("#") ||
        trimmed.startsWith("/") ||
        trimmed.startsWith("./") ||
        trimmed.startsWith("../") ||
        trimmed.startsWith("//") ||
        SCHEME_RE.test(trimmed)
    ) {
        return destination;
    }

    const hashIndex = trimmed.indexOf("#");
    const beforeHash = hashIndex === -1 ? trimmed : trimmed.slice(0, hashIndex);
    const queryIndex = beforeHash.indexOf("?");
    const pathname =
        queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex);

    if (!pathname.endsWith(".md") && !pathname.endsWith(".mdx")) {
        return destination;
    }

    return `${leadingWhitespace}./${trimmed}${trailingWhitespace}`;
}

/**
 * @param {string} payload
 *
 * @returns {string}
 */
function prefixInlineLinkPayload(payload) {
    const trimmedStart = payload.trimStart();
    const leadingWhitespace = payload.slice(
        0,
        payload.length - trimmedStart.length
    );

    const trimmedEnd = payload.trimEnd();
    const trailingWhitespace = payload.slice(trimmedEnd.length);
    const core = payload.trim();
    const { destination, remainder } = splitInlineLinkDestination(core);

    if (destination.length === 0) {
        return payload;
    }

    const isAngleWrapped =
        destination.startsWith("<") &&
        destination.endsWith(">") &&
        destination.length >= 2;
    const inner = isAngleWrapped ? destination.slice(1, -1) : destination;
    const rewrittenInner = prefixIfBareRelativeMarkdownFile(inner);

    if (rewrittenInner === inner) {
        return payload;
    }

    const rewrittenDestination = isAngleWrapped
        ? `<${rewrittenInner}>`
        : rewrittenInner;

    return `${leadingWhitespace}${rewrittenDestination}${remainder}${trailingWhitespace}`;
}

/**
 * @param {string} line
 *
 * @returns {string}
 */
function prefixInlineMarkdownLinksInLine(line) {
    let out = "";
    let index = 0;

    /** @type {null | number} */
    let codeSpanLength = null;

    /**
     * @param {number} startIndex
     * @param {string} character
     *
     * @returns {number}
     */
    const countRun = (startIndex, character) => {
        let count = 0;
        while (
            startIndex + count < line.length &&
            line.charAt(startIndex + count) === character
        ) {
            count += 1;
        }

        return count;
    };

    while (index < line.length) {
        const tickRun = line.charAt(index) === "`" ? countRun(index, "`") : 0;
        if (tickRun > 0) {
            if (codeSpanLength === null) {
                codeSpanLength = tickRun;
            } else if (tickRun === codeSpanLength) {
                codeSpanLength = null;
            }

            out += line.slice(index, index + tickRun);
            index += tickRun;
        } else if (
            codeSpanLength === null &&
            line.charAt(index) === "]" &&
            line.charAt(index + 1) === "("
        ) {
            const labelOpen = findInlineLinkLabelOpenBracket(line, index);

            if (labelOpen === -1) {
                out += line.charAt(index);
                index += 1;
            } else {
                const urlStart = index + 2;
                const end = findInlineLinkClosingParen(line, urlStart);

                if (end === -1) {
                    out += line.charAt(index);
                    index += 1;
                } else {
                    const payload = line.slice(urlStart, end);
                    const rewrittenPayload = prefixInlineLinkPayload(payload);

                    out += `](${rewrittenPayload})`;
                    index = end + 1;
                }
            }
        } else {
            out += line.charAt(index);
            index += 1;
        }
    }

    return out;
}

/**
 * @param {string} payload
 *
 * @returns {{ destination: string; remainder: string }}
 */
function splitInlineLinkDestination(payload) {
    const core = payload.trim();
    if (core.length === 0) {
        return { destination: "", remainder: "" };
    }

    if (core.startsWith("<")) {
        let index = 1;
        while (index < core.length) {
            const character = core.charAt(index);

            if (character === "\\") {
                index += 2;
            } else if (character === ">") {
                return {
                    destination: core.slice(0, index + 1),
                    remainder: core.slice(index + 1),
                };
            } else {
                index += 1;
            }
        }

        return { destination: core, remainder: "" };
    }

    let depth = 0;
    let index = 0;
    while (index < core.length) {
        const character = core.charAt(index);

        if (character === "(") {
            depth += 1;
            index += 1;
            continue;
        }

        if (character === ")") {
            if (depth > 0) {
                depth -= 1;
            }

            index += 1;
            continue;
        }

        if (character === "\\") {
            index += 2;
            continue;
        }

        if (depth === 0 && /\s/v.test(character)) {
            return {
                destination: core.slice(0, index),
                remainder: core.slice(index),
            };
        }

        index += 1;
    }

    return { destination: core, remainder: "" };
}
