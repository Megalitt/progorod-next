export const changeOrderArray = (arr, item: number) => {
  if (item === 0) return arr;
  return [...arr.slice(item), ...arr.slice(0, item)];
};
