'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * This script is for trying out the preset settings and seeing what happens.
 * It will create `try.md` with the Markdown content of `input`,
 * then will run the kramer CLI against it.
 *
 * If you're experimenting with changes to the preset,
 * - modify `input` in a way that will demonstrate the effect of those
 *   changes;
 * - decide whether to lint or format and set the flag below;
 * - run this script;
 * - and check the output.
 */

const input = `---
front: matter
---

  #    Here is some MD #

paragraph.
- one
-   two
 - three

>   one
  >    two

[reflekss]

[hasref][5]

[refme](./booz)

[refless]: /foo/bar
[5]: /baz
`;

const docPath = path.join(__dirname, 'try.md');
const binPath = path.join(__dirname, 'bin.js');
fs.writeFileSync(docPath, input);
process.env.LOCAL_TEST = 'TRUE';

try {
  execSync(
    [
      binPath,
      docPath,
      // Comment out the `--format` flag if you want to try linting.
      // '--format',
    ].join(' '),
    { stdio: 'inherit' },
  );
} catch (error) {
  console.error(error.message);
}
