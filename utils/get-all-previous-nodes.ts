export const getAllPreviousNodes = (element) => {
  let totalSiblingArr = [];
  let sibling = element;
  while(sibling.previousSibling) {;
    totalSiblingArr.push(sibling = sibling.previousSibling);
  }
  return totalSiblingArr;
};