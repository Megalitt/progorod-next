export const getDailyNews = (arr) => Array.isArray(arr) && arr.filter((item) => item.publish_at * 1000 >= +new Date() - 86400000);
