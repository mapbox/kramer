#!/usr/bin/env node
'use strict';

const execa = require('execa');
const meow = require('meow');
const path = require('path');

const help = `
  Usage
    kramer [options] [path|glob...]

    By default, runs on all Markdown files in cwd.

  Options
    -f, --format    Format files instead of linting them.

  Examples
    kramer
    kramer docs/*.md
    kramer --format "docs/**/*.md"
`;
const cli = meow(help, {
  description: 'Lint or format Markdown files.',
  flags: {
    format: {
      type: 'boolean',
      alias: 'f',
    },
  },
});

let files = cli.input;
if (files.length === 0) {
  files = [process.cwd()];
}

const command = process.env.LOCAL_TEST
  ? path.join(__dirname, 'node_modules/.bin/remark')
  : 'remark';

const result = execa.sync(
  command,
  files.concat(
    '--use',
    path.join(__dirname, 'index.js'),
    [
      `--no-stdout`,
      cli.flags.format ? '--output' : '',
      cli.flags.format ? '--silent' : '--quiet',
    ].filter(Boolean),
  ),
);

if (result.stderr) {
  console.error(result.stderr);
  process.exit(1);
}

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

if (result.stdout) {
  console.log(result.stdout);
}
