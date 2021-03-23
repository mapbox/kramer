# kramer

Markdown formatter and linter. Uses [remark-lint](https://github.com/wooorm/remark-lint) plugins and a few other [remark](https://github.com/wooorm/remark) plugins.

remark <--> kramer (semordnilap, get it?)

![kramer](./art/kramer.jpg)

## Table of contents

- [Formatting](#formatting)
- [Linting](#linting)
- [Usage](#usage)
  - [CLI](#cli)
  - [Node API](#node-api)
- [Workflow ideas](#workflow-ideas)

## Formatting

- 🥳 A table of contents will be generated if you include a `Table of contents` header in a document, and will include heading levels 1-3.
- Emphasis and strong are both indicated with `*`.
- Unordered list items marked with `-`.
- List items are indented one and only one space beyond the marker.
- Headings are indicated with `#` signs, e.g. `## Second-level heading`.
- Linked references for links or images (footnotes, essentially) are transformed into inline URLs.
- Code blocks are fenced with triple backticks.
- Some other minor stuff that should be intuitive or prevent mistakes, such as some escaping and encoding.

## Linting

- 🥳 Links within the repository (to headings, other files, headings in other files) are validated.
- No duplicate top-level headings.
- No tabs.
- Reference definitions are at the end of the file, are not duplicated, and are used.
- Some other minor stuff that improves consistency.

## Usage

### CLI

The `@mapbox/kramer` package includes a CLI that lints or formats. Formatting overwrites the input files.

```
Lint or format Markdown files.

Usage
  kramer [options] [files...]

  Files can be specified with full paths or globs.
  If no files are specified, the command runs on all
  Markdown files in the current working directory.

Options
  -f, --format    Format files instead of linting them.
                  Overwrites input files.

Examples
  kramer
  kramer docs/*.md
  kramer --format "docs/**/*.md"
```

You can also use this package as a remark plugin, in Node code or with [remark-cli](https://github.com/wooorm/remark/tree/master/packages/remark-cli).

### Node API

The `@mapbox/kramer` package also exports `settings` and `plugins` that can be used with [remark](https://github.com/wooorm/remark)'s Node API.

- `settings` is an object of [remark-stringify](https://github.com/remarkjs/remark/tree/master/packages/remark-stringify) settings for formatting.
- `plugins` is an array of the [remark](https://github.com/wooorm/remark) plugins that kramer uses.

The following example creates a function that reformats Markdown using kramer's rules and plugins.

```js
const unified = require('unified');
const remarkStringify = require('remark-stringify');
const remarkParse = require('remark-parse');
const kramer = require('@mapbox/kramer');

const markdownFormatter = unified()
  .use(remarkParse)
  .use(remarkStringify, kramer.settings)
  .use(kramer.plugins);

async function reformatMarkdown(md) {
  return String(await markdownFormatter.process(md));
}
```

## Workflow ideas

💭💡 Run Markdown linting as part of your `npm test` process.

```js
// In package.json ...
{
  "scripts": {
    "lint-js": "eslint .",
    "lint-md": "kramer",
    "lint": "npm run lint-js && npm run lint-md",
    "pretest": "npm run lint"
  }
}
```

💭💡 Use [husky](https://github.com/typicode/husky) and [linted-staged](https://github.com/okonet/lint-staged/) to set up a pre-commit hook that automatically lints and formats any Markdown files that are staged for a commit.

```js
// In package.json ...
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.md": [
      "kramer",
      "kramer --format"
    ]
  }
}
```

💭💡 Whenever you upgrade versions, reformat all your Markdown with `kramer --format`.
