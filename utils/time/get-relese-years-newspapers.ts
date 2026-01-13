export const getReleseYearsNewspapers = (yearValueFirstRelese: number) => {
  let yearsList = [];

  for (let i = yearValueFirstRelese, j = 0; i <= +new Date().getFullYear(); i += 1, j += 1) {
    yearsList = [...yearsList, {
      id: j + 1,
      title: `${i}`,
    }];
  }
  return yearsList;
};
