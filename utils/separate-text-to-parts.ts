export const separateTextToParts = (text = '', position = 1) => {
  const target = ['</p>', '</blockquote>', '</div>'];
  let currentSearchSymbol = 0;

  for (let j = 0; j < target.length; j += 1) {
    for (let i = 0; i < position; i += 1) {
      const foundPos = text && text.indexOf(target[j], currentSearchSymbol);
      if (foundPos === -1) break;

      currentSearchSymbol = foundPos + target[j].length;
    }
  }
  const firstPart = text && text.slice(0, currentSearchSymbol);
  const primaryPart = text && text.slice(currentSearchSymbol);
  return currentSearchSymbol ? [firstPart, primaryPart] : [text || '', ''];
};
