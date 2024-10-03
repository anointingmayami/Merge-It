// testMerge.js

import { mergeContents } from './merge.js';

(async () => {
  const baseFileContents = 'Block A\nContent A\n\nBlock B\nContent B';
  const modifiedFileContents = 'Block A\nIGNORED\n\nBlock B\nContent B Modified';

  const mergedResult = await mergeContents(baseFileContents, modifiedFileContents);
  console.log(mergedResult);
})();
