---
id: getting-started
title: Getting Started
---

# Getting Started

Install the plugin next to TypeDoc and the Markdown renderer:

```sh
npm install --save-dev typedoc typedoc-plugin-markdown typedoc-plugin-docusaurus-doc-links
```

Add both plugins to your TypeDoc configuration:

```json
{
 "plugin": ["typedoc-plugin-markdown", "typedoc-plugin-docusaurus-doc-links"]
}
```

Generate Markdown into the folder Docusaurus reads from, then build your
Docusaurus site normally.

## Recommended order

Keep `typedoc-plugin-markdown` enabled because this plugin rewrites Markdown
page contents. Put `typedoc-plugin-docusaurus-doc-links` after renderer plugins
when you want it to see final page text.
