export const getSubstrByWord = (string, countSymbol = null) => {
  const stringToArray = string && string.split(' ');
  let itogString = '';
  let count = 0;

  if (Array.isArray(stringToArray)) {
    for (let i = 0; i < stringToArray.length; i += 1) {
      count += stringToArray[i].length;
      if (countSymbol && count <= countSymbol) {
        itogString += `${stringToArray[i].replace('\r\n', '').trim()} `;
      }
      if (!countSymbol) {
        itogString += `${stringToArray[i].replace('\r\n', '').trim()} `;
      }
    }
  }

  return itogString.replace(/\s/g, ' ');
};
