---
id: intro
title: Overview
slug: /intro
---

# typedoc-plugin-docusaurus-doc-links

`typedoc-plugin-docusaurus-doc-links` fixes a common mismatch between generated
TypeDoc Markdown and Docusaurus doc routing.

TypeDoc Markdown output can contain links like this:

```md
[Config](configuration.md)
```

Docusaurus can interpret that bare destination as a URL path instead of a local
document file. This plugin rewrites eligible links to the local-file form:

```md
[Config](./configuration.md)
```

That keeps generated Markdown stable while making Docusaurus resolve links
through the docs plugin.

## When to use it

Use this plugin when TypeDoc generates Markdown or MDX that will be consumed by
Docusaurus and bare `.md` or `.mdx` links do not resolve the way you expect.

## What it avoids

The plugin does not rewrite external URLs, anchors, absolute paths, already
relative paths, code fences, or inline code spans.
