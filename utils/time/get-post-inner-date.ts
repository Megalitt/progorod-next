import dayjs from 'dayjs';
import rusDate from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MILLISECONDS_IN_A_DAY } from '../consts';

dayjs.locale(rusDate);
dayjs.extend(relativeTime);

export const getPostInnerDate = (ms: number, type = '') => {
  const currentDate = Date.now();
  const diff = currentDate - (ms * 1000);

  if (diff < MILLISECONDS_IN_A_DAY && type !== 'amp') {
    return `${dayjs(ms * 1000).format('HH:mm')} <span>${dayjs(ms * 1000).format('D MMMM')}</span>`;
  }

  if (diff < MILLISECONDS_IN_A_DAY && type === 'amp') {
    return `${dayjs(ms * 1000).format('HH:mm')} ${dayjs(ms * 1000).format('D MMMM')}`;
  }

  if (+dayjs(ms * 1000).format('YYYY') < +dayjs(currentDate).format('YYYY')) {
    return dayjs(ms * 1000).format('D MMMM YYYY');
  }

  return dayjs(ms * 1000).format('D MMMM HH:mm');
};
