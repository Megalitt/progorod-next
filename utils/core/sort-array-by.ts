export const sortArrayBy = (array, sort, desc) => {
  array.sort((a, b) => {
    if (a[sort] && b[sort]) {
      if (+a[sort] < +b[sort]) return -1;
      if (+a[sort] > +b[sort]) return 1;
    }

    return 0;
  });

  if (desc) array.reverse();
  return array;
};
