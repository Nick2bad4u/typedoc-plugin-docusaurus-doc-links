# typedoc-plugin-docusaurus-doc-links

[![npm](https://img.shields.io/npm/v/typedoc-plugin-docusaurus-doc-links.svg)](https://www.npmjs.com/package/typedoc-plugin-docusaurus-doc-links)
[![Continuous Integration](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/actions/workflows/ci.yml/badge.svg)](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/actions/workflows/ci.yml)

TypeDoc plugin that prefixes bare generated Markdown doc links with `./` so
Docusaurus resolves them as local doc-file links instead of URL paths.

## Install

```sh
npm install --save-dev typedoc-plugin-docusaurus-doc-links
```

## Usage

```json
{
 "plugin": ["typedoc-plugin-markdown", "typedoc-plugin-docusaurus-doc-links"]
}
```

The package entrypoint exports TypeDoc's `load(app)` plugin hook. The `./core`
subpath exports the Markdown link rewriting helper for direct tests.
