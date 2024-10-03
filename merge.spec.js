// merge.spec.js

const { mergeContents } = require('./merge');

describe('mergeContents', () => {
  test('should merge two simple blocks with modifications', async () => {
    const baseFileContents = 'Line 1\n\nLine 2';
    const modifiedFileContents = 'Line 1 Modified\n\nLine 2';

    const result = await mergeContents(baseFileContents, modifiedFileContents);
    expect(result).toEqual('Line 1 Modified\n\nLine 2');
  });

  test('should replace the block with IGNORED when modified block is IGNORED', async () => {
    const baseFileContents = '[\nLine 1\n\nLine 2\n]\n\n[\nLine 3\n\nLine 4]';
    const modifiedFileContents = 'IGNORED\n\n[\nLine 3 \n\nModified\n\nLine 4]';

    const result = await mergeContents(baseFileContents, modifiedFileContents);
    expect(result).toEqual('IGNORED\n\n[\nLine 3 \n\nModified\n\nLine 4]');
  });

  test('should handle multiple IGNORED blocks correctly', async () => {
    const baseFileContents = 'Block A Start\nContent A1\nContent A2\nBlock A End\n\nBlock B Start\nContent B1\nContent B2\nBlock B End';
    const modifiedFileContents = 'Block A Start\nIGNORED\nBlock A End\n\nBlock B Start\nIGNORED\nBlock B End';

    const result = await mergeContents(baseFileContents, modifiedFileContents);
    expect(result).toEqual('Block A Start\nIGNORED\nBlock A End\n\nBlock B Start\nIGNORED\nBlock B End');
  });
});
