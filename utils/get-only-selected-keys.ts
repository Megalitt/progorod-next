export const getOnlySelectedKeys = (array, deleteProps) => {
  array.map(item => {
    Object.keys(item).forEach(n => {
        deleteProps.includes(n) || delete item[n]
        return item
      });
    })
};