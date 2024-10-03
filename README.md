# Merge Utility

This utility provides a function to merge two sets of file contents, allowing for modifications and handling ignored sections. It is designed to work with blocks of text, typically representing structured data or formatted content.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Functionality](#functionality)
- [Code Explanation](#code-explanation)
- [Testing](#testing)

## Installation

To use the merge utility in your project, ensure you have Node.js installed. Then, you can clone this repository or copy the `merge.js` and `merge.spec.js` files into your project.

```bash
git clone <https://github.com/anointingmayami/Merge-It.git>
cd <https://github.com/anointingmayami/Merge-It>
```

## Usage

Import the `mergeContents` function from the `merge` module and use it to merge two strings representing file contents.

```javascript
const { mergeContents } = require('./merge');

async function example() {
  const baseFileContents = '[\nLine 1\n\nLine 2]';
  const modifiedFileContents = 'IGNORED\n\n[\nLine 3 \n\nModified\n\nLine 4]';

  const result = await mergeContents(baseFileContents, modifiedFileContents);
  console.log(result);
}

example();
```

## Functionality

The `mergeContents` function performs the following operations:

1. **Splits the input strings into blocks** based on double newlines (or other defined separators).
2. **Maps through each base block**, comparing it to the corresponding modified block:
   - If the modified block is marked as `"IGNORED"`, it replaces the entire block with `"IGNORED"`.
   - If the modified block is valid, it replaces the base block with the modified block.
   - If the modified block is not valid, it retains the original base block.
3. **Filters out empty blocks** and cleans up any extra newlines before returning the final merged string.

## Code Explanation

### `merge.js`

```javascript
async function mergeContents(baseFileContents, modifiedFileContents) {
    const baseBlocks = splitIntoBlocks(baseFileContents);
    const modifiedBlocks = splitIntoBlocks(modifiedFileContents);
  
    const mergedBlocks = baseBlocks.map((baseBlock, index) => {
        const modifiedBlock = modifiedBlocks[index];
  
        // If the modified block is 'IGNORED', return 'IGNORED'
        if (modifiedBlock && modifiedBlock.trim() === 'IGNORED') {
            return 'IGNORED';
        }
  
        // Return the modified block if it's valid, otherwise return the base block
        return modifiedBlock ? modifiedBlock : baseBlock;
    });
  
    // Ensure no empty blocks and clean up extra newlines
    return mergedBlocks.filter(block => block.trim() !== '').join('\n\n').replace(/\n{3,}/g, '\n\n');
}

function splitIntoBlocks(content) {
    // Split content into blocks using two or more newlines or other separators.
    return content.split(/\n{2,}/);
}

module.exports = { mergeContents };
```

### Key Functions

- **`mergeContents(baseFileContents, modifiedFileContents)`**: Merges the base and modified contents.
  - **Parameters**:
    - `baseFileContents`: The original contents (string) to be modified.
    - `modifiedFileContents`: The modified contents (string) which may contain ignored blocks.
  - **Returns**: A merged string with the appropriate modifications.

- **`splitIntoBlocks(content)`**: Splits a given content string into blocks based on two or more consecutive newlines.

### Error Handling

The function handles various edge cases:
- If a modified block is marked as `"IGNORED"`, the corresponding base block is replaced with `"IGNORED"`.
- It filters out empty blocks to ensure the final output is clean and properly formatted.

## Testing

The code includes a set of unit tests written using Jest to ensure that the merging logic works as expected. To run the tests, make sure you have Jest installed:

```bash
npm install --save-dev jest
```

Then, you can run the tests using:

```bash
npx jest merge.spec.js
```

### Test Cases

The tests cover various scenarios, including:
- Merging two simple blocks with modifications.
- Replacing a block with `"IGNORED"` when the modified block is ignored.
- Handling multiple ignored blocks correctly.

## Conclusion

This merge utility is a straightforward way to manage and merge blocks of text, accommodating modifications and ignored sections efficiently. If you have any questions or suggestions, feel free to contribute or reach out!
