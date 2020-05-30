# kramer

Markdown formatter and linter. Uses [remark-lint][1] plugins and a few other [remark][2] plugins.

remark &lt;--> kramer (semordnilap, get it?)

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

You can also use this package as a remark plugin, in Node code or with [remark-cli][3].

[1]: https://github.com/wooorm/remark-lint

[2]: https://github.com/wooorm/remark

[3]: https://github.com/wooorm/remark/tree/master/packages/remark-cli
