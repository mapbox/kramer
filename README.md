# kramer

Markdown formatter and linter. Uses [remark-lint][1] plugins and a few other [remark][2] plugins.

remark &lt;--> kramer (semordnilap, get it?)

## Table of contents

- [Formatting][3]
- [Linting][4]
- [Usage][5]
  - [CLI][6]
  - [Node API][7]
- [Workflow ideas][8]

## Formatting

- Emphasis and strong are both indicated with `*`.
- Unordered list items marked with `-`.
- List items are indented one and only one space beyond the marker.
- Headings are indicated with `#` signs, e.g. `## Second-level heading`.
- URLs for links and images are transformed into numbered linked references (footnotes, essentially), to improve legibility.
- A table of contents will be generated if you include a `Table of contents` header in a document, and will include heading levels 1-3.
- Code blocks are fenced with triple backticks.
- Some other minor stuff that should be intuitive or prevent mistakes, such as some escaping and encoding.

## Linting

- Links within the repository (to headings, other files, headings in other files) are validated.
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

You can also use this package as a remark plugin, in Node code or with [remark-cli][9].

### Node API

The `@mapbox/kramer` package also exports `settings` and `plugins` that can be used with [remark][2]'s Node API.

- `settings` is an object of [remark-stringify][10] settings for formatting.
- `plugins` is an array of the [remark][2] plugins that kramer uses.

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

💭💡 Use [husky][11] and [linted-staged][12] to set up a pre-commit hook that automatically lints and formats any Markdown files that are staged for a commit.

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

[1]: https://github.com/wooorm/remark-lint

[2]: https://github.com/wooorm/remark

[3]: #formatting

[4]: #linting

[5]: #usage

[6]: #cli

[7]: #node-api

[8]: #workflow-ideas

[9]: https://github.com/wooorm/remark/tree/master/packages/remark-cli

[10]: https://github.com/remarkjs/remark/tree/master/packages/remark-stringify

[11]: https://github.com/typicode/husky

[12]: https://github.com/okonet/lint-staged/
