# typedoc-plugin-docusaurus-doc-links

[![NPM license.](https://flat.badgen.net/npm/license/typedoc-plugin-docusaurus-doc-links?color=purple)](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/blob/main/LICENSE) [![NPM total downloads.](https://flat.badgen.net/npm/dt/typedoc-plugin-docusaurus-doc-links?color=pink)](https://www.npmjs.com/package/typedoc-plugin-docusaurus-doc-links) [![Latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/typedoc-plugin-docusaurus-doc-links?color=cyan)](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/typedoc-plugin-docusaurus-doc-links?color=yellow)](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/typedoc-plugin-docusaurus-doc-links?color=orange)](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/typedoc-plugin-docusaurus-doc-links?color=red)](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/issues) [![Codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/typedoc-plugin-docusaurus-doc-links?color=blue)](https://codecov.io/gh/Nick2bad4u/typedoc-plugin-docusaurus-doc-links) [![Repo Checks.](https://flat.badgen.net/github/checks/Nick2bad4u/typedoc-plugin-docusaurus-doc-links?color=green)](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/actions)

Make generated TypeDoc Markdown links resolve as Docusaurus doc-file links.

`typedoc-plugin-docusaurus-doc-links` prefixes bare generated `.md` and `.mdx`
links with `./` during TypeDoc rendering. That keeps links emitted by
`typedoc-plugin-markdown` inside Docusaurus' local docs resolver instead of
letting Docusaurus treat them as site-root URL paths.

## Install

```sh
npm install --save-dev typedoc typedoc-plugin-markdown typedoc-plugin-docusaurus-doc-links
```

## Configure

Load it after `typedoc-plugin-markdown`:

```json
{
 "plugin": ["typedoc-plugin-markdown", "typedoc-plugin-docusaurus-doc-links"]
}
```

The plugin has no custom options. It runs on rendered TypeDoc pages before the
Markdown files are written.

## Link Behavior

The plugin rewrites bare Markdown destinations that end in `.md` or `.mdx`:

```md
[Button](classes/Button.md)
```

becomes:

```md
[Button](./classes/Button.md)
```

It preserves external URLs, anchors, absolute paths, already-relative paths,
code fences, and inline code spans.

## When To Use It

Use this plugin when your TypeDoc Markdown output is copied into a Docusaurus
docs folder and links like `classes/Button.md` are being interpreted as URL
paths instead of nearby doc files.

If your renderer already emits Docusaurus-ready relative links, you do not need
this plugin.

## API

Most projects only need the TypeDoc plugin entrypoint. The package also exports
`typedoc-plugin-docusaurus-doc-links/core` for tests or custom integrations that
want to call the Markdown rewrite helper directly.

Full docs and generated API reference are published with the repository site:
<https://nick2bad4u.github.io/typedoc-plugin-docusaurus-doc-links/>.
