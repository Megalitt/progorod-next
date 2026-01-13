import dayjs from 'dayjs';
import rusDate from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale(rusDate);
dayjs.extend(relativeTime);

export const getNewsPagerDate = (ms: number) => dayjs(ms * 1000).format('DD.MM.YYYY');
