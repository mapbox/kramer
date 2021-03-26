'use strict';

exports.settings = {
  listItemIndent: 1,
  emphasis: '*',
  strong: '*',
  bullet: '-',
  fences: true,
};

exports.plugins = [
  // Support GitHub Flavored Markdown.
  require('remark-gfm'),

  // Accept frontmatter.
  require('remark-frontmatter'),

  // Formatting beyond the remark-stringify settings.
  [require('remark-toc'), { maxDepth: 3, tight: true }],
  require('remark-inline-links'),

  // Lint.
  require('remark-validate-links'),
  [require('remark-lint-blockquote-indentation'), 2],
  require('remark-lint-final-definition'),
  require('remark-lint-no-duplicate-definitions'),
  require('remark-lint-no-multiple-toplevel-headings'),
  require('remark-lint-no-undefined-references'),
];
