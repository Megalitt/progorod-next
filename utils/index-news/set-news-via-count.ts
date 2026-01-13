export const setNewsViaCount = (newsNoneCommerce, newsCommerce, interval) => {
  let totalsNews = [];
  let commerceCount = 0;
  newsNoneCommerce.forEach((item, index) => {
    if ((index) % (interval - 1) === 0 && index !== 0) {
      commerceCount += 1;
      if (newsCommerce[commerceCount - 1]) {
        totalsNews.push(newsCommerce[commerceCount - 1]);
      }
    }
    totalsNews.push(item);
  });

  if (newsNoneCommerce.length >= interval) {
    totalsNews = totalsNews.slice(0, newsNoneCommerce.length);
  }

  if (newsNoneCommerce.length === interval - 1) {
    totalsNews.push(newsCommerce[commerceCount]);
  }

  return totalsNews;
};
