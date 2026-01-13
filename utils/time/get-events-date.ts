import dayjs from 'dayjs';
import rusDate from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale(rusDate);
dayjs.extend(relativeTime);

export const getEventsDate = (msStart: number, msEnd: number) => {
  const currentDate = Date.now();
  const currentYear = +dayjs(currentDate).format('YYYY');
  const currentFullDate = dayjs(currentDate).format('D MMMM YYYY');

  const dateYearStart = +dayjs(msStart * 1000).format('YYYY');
  const dateYearEnd = +dayjs(msEnd * 1000).format('YYYY');

  const dateStartFull = dayjs(msStart * 1000).format('D MMMM YYYY');
  const dateEndFull = dayjs(msEnd * 1000).format('D MMMM YYYY');
  const dateStartShort = dayjs(msStart * 1000).format('D MMMM');
  const dateEndShort = dayjs(msEnd * 1000).format('D MMMM');

  const monthStart = dayjs(msStart * 1000).format('MMMM');
  const monthEnd = dayjs(msEnd * 1000).format('MMMM');

  if (dateStartFull === dateEndFull) {
    if (dateYearStart < currentYear && dateYearEnd < currentYear) {
      return dateStartFull;
    }
    return dateStartShort;
  }

  if (dateYearStart === dateYearEnd && monthStart === monthEnd) {
    if (dateYearStart < currentYear) {
      return `${dayjs(msStart * 1000).format('D')} - ${dateEndFull}`;
    }
    return `${dayjs(msStart * 1000).format('D')} - ${dateEndShort}`;
  }

  if (dateStartFull === currentFullDate) {
    return `Сегодня ${dayjs(msStart * 1000).format('HH:mm')}`;
  }

  return `${dateStartFull} - ${dateEndFull}`;
};
