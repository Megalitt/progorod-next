export const sortByViews = (array: Array<any>, sort: string, desc: boolean) => {
  const arrayForSort = [...array];
      arrayForSort.sort((a, b) => {
        if (+a[sort] < +b[sort]) {
          return -1
        } else if (+a[sort] > +b[sort]) {
          return 1
        } else {
          return 0
        }
      });

      if (desc) arrayForSort.reverse();
      return arrayForSort;
};
