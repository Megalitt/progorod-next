import { setNewsViaCount } from './set-news-via-count';

export const getMainTabNews = (dailyNews, dailyNewsComm) => {
  if (dailyNewsComm.length > 0) {
    return setNewsViaCount(dailyNews, dailyNewsComm, 3).slice(0, 4);
  }
  return dailyNews.slice(0, 4);
};

export const getLeftColumnNews = (lastNews, lastNewsComm) => ((Array.isArray(lastNewsComm) && (lastNewsComm.length > 0))
  ? setNewsViaCount(lastNews, lastNewsComm, 4)
  : lastNews);

export const setPopularNews = (popular, popularComm) => ((Array.isArray(popularComm) && (popularComm.length > 0))
  ? setNewsViaCount(popular, popularComm, 4)
  : popular);

export const getCentralColumnTopNews = (central, centralComm1) => {
  if (central.length < 0) return [];

  return (Array.isArray(centralComm1) && centralComm1.length > 0
    ? setNewsViaCount(central, centralComm1, 5)
    : central);
};

export const isRightColumnNotEmpty = (rightColumnComm, rightColumnComm2, rightColumnComm3, rightColumnComm4, rightColumn) => (
  (Array.isArray(rightColumnComm) && rightColumnComm.length > 0)
  || (Array.isArray(rightColumnComm2) && rightColumnComm2.length > 0)
  || (Array.isArray(rightColumnComm3) && rightColumnComm3.length > 0)
  || (Array.isArray(rightColumnComm4) && rightColumnComm4.length > 0)
  || (Array.isArray(rightColumn) && rightColumn.length > 0)
);

export const getRightNewsColumn = (rightComm1, rightComm2, rightComm3, rightComm4, rightDailyColumn) => {
  if (!isRightColumnNotEmpty(rightComm1, rightComm2, rightComm3, rightComm4, rightDailyColumn)) return [];
  const rightNews = [];
  const maxLengthRightNewsColumn = 4;
  let rightCounter = 0;
  let item = null;
  const addDefaultNews = () => {
    if (rightDailyColumn.length > rightCounter) {
      item = rightDailyColumn[rightCounter];
      rightCounter += 1;
    } else {
      item = null;
    }
  };

  for (let i = 0; i < maxLengthRightNewsColumn; i += 1) {
    if (i === 0 && Array.isArray(rightComm1) && rightComm1.length > 0) {
      [item] = rightComm1;
    } else if (i === 1 && Array.isArray(rightComm2) && rightComm2.length > 0) {
      [item] = rightComm2;
    } else if (i === 2 && Array.isArray(rightComm3) && rightComm3.length > 0) {
      [item] = rightComm3;
    } else if (i === 3 && Array.isArray(rightComm4) && rightComm4.length > 0) {
      [item] = rightComm4;
    } else {
      addDefaultNews();
    }
    rightNews.push(item);
  }

  return rightNews;
};

const isCentralColumnNotEmpty = (central, centralComm1, centralComm2, centralComm3, centralComm4) => (
  (Array.isArray(central) && central.length > 0)
  || (Array.isArray(centralComm1) && centralComm1.length > 0)
  || (Array.isArray(centralComm2) && centralComm2.length > 0)
  || (Array.isArray(centralComm3) && centralComm3.length > 0)
  || (Array.isArray(centralComm4) && centralComm4.length > 0)
);

export const getCentralColumn = (central, centralComm1, centralComm2, centralComm3, centralComm4) => {
  if (!isCentralColumnNotEmpty(central, centralComm1, centralComm2, centralComm3, centralComm4)) return [];
  const centralNews = [];
  const maxLengthCentralColumn = 20;
  let centralCounter = 0;
  let item = null;

  for (let i = 0; i < maxLengthCentralColumn; i += 1) {
    if (i === 2 && Array.isArray(centralComm1) && centralComm1.length > 0) {
      [item] = centralComm1;
    } else if (i === 5 && Array.isArray(centralComm2) && centralComm2.length > 0) {
      [item] = centralComm2;
    } else if (i === 8 && Array.isArray(centralComm3) && centralComm3.length > 0) {
      [item] = centralComm3;
    } else if (i === 11 && Array.isArray(centralComm4) && centralComm4.length > 0) {
      [item] = centralComm4;
    }

    if (central.length > centralCounter) {
      item = central[centralCounter];
      centralCounter += 1;
    }

    if(i >= centralCounter) {
      break;
    }

    centralNews.push(item);
  }

  return centralNews;
};

export const setCentralNews = (arr) => ({
  arr0: arr.slice(0, 3),
  arr1: arr.slice(3, 6),
  arr2: arr.slice(6, 9),
  arr3: arr.slice(9, 12),
  arrFaq: arr.slice(12, 14),
  arrAfisha: arr.slice(14, 16),
  arrPeopleControl: arr.slice(16, 18),
  arrVoting: arr.slice(18, 20),
});
