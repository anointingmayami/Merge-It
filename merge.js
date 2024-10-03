// merge.js

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
  