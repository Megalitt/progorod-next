import dayjs from 'dayjs';
import rusDate from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale(rusDate);
dayjs.extend(relativeTime);

export const getDateRange = (ms: number) => {
  const currentDate = Date.now();
  if (+dayjs(ms * 1000).format('YYYY') > +dayjs(currentDate).format('YYYY') || +dayjs(ms * 1000).format('YYYY') < +dayjs(currentDate).format('YYYY')) {
    return dayjs(ms * 1000).format('D MMMM YYYY');
  }
  return dayjs(ms * 1000).format('D MMMM');
};
