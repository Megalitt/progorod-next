import dayjs from 'dayjs';
import rusDate from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale(rusDate);
dayjs.extend(relativeTime);

export const getPostDate = (ms: any) => {
  const currentDate = Date.now();
  const postDay = +dayjs(ms * 1000).format('D');
  const postMonth = dayjs(ms * 1000).format('MMMM');
  const postYear = +dayjs(ms * 1000).format('YYYY');
  const currentMonth = dayjs(currentDate).format('MMMM');
  const currentYear = +dayjs(currentDate).format('YYYY');
  const currentDateFull = dayjs(currentDate).format('D MMMM YYYY');
  const postDateFull = dayjs(ms * 1000).format('D MMMM YYYY');

  const arr = {
    time: null,
    postYear: null,
  };

  if (
    postDay === +dayjs(currentDate).subtract(1, 'day').format('D')
    && postMonth === currentMonth
    && postYear === currentYear
  ) {
    arr.time = 'Вчера ';
  } else {
    arr.time = `${dayjs(ms * 1000).format('D MMMM')} `;
  }

  if (currentDateFull === postDateFull) {
    arr.time = dayjs(ms * 1000).format('HH:mm');
  }

  if (postYear < currentYear) {
    arr.postYear = postYear;
  }
  return arr;
};
