import dayjs from 'dayjs';

const currentDate = dayjs();

const getNextMonth = (nextMonthNum) => (new Date().getMonth() + nextMonthNum + 1) % 12;

const getDayInMonth = (monthIndex) => {
  const dayInMonth = new Date(+currentDate.format('YYYY'), monthIndex, 0).getDate();
  return {
    dayInMonth,
    monthIndex,
  };
};

const getDateFrom = (countMonthAdd) => currentDate
  .month(getDayInMonth(getNextMonth(countMonthAdd)).monthIndex - 1)
  .year(new Date(+currentDate.format('YYYY'), +currentDate.format('M') + countMonthAdd, 0).getFullYear())
  .date(1)
  .hour(0)
  .minute(0)
  .second(1)
  .unix();

const getDateTill = (countMonthAdd) => currentDate
  .month(getDayInMonth(getNextMonth(countMonthAdd)).monthIndex - 1)
  .year(new Date(+currentDate.format('YYYY'), +currentDate.format('M') + countMonthAdd, 0).getFullYear())
  .date(getDayInMonth(getNextMonth(countMonthAdd)).dayInMonth)
  .hour(23)
  .minute(59)
  .second(59)
  .unix();

export const afishaTabs = [
  {
    monthName: currentDate.format('MMMM'),
    from: getDateFrom(0),
    till: getDateTill(0),
  },
  {
    startStamp: currentDate.add(1, 'month').startOf('month'),
    get monthName() { return this.startStamp.format('MMMM'); },
    get from() {
      return getDateFrom(1);
    },
    get till() {
      return getDateTill(1);
    },
  },
  {
    startStamp: currentDate.add(2, 'month').startOf('month'),
    get monthName() { return this.startStamp.format('MMMM'); },
    get from() {
      return getDateFrom(2);
    },
    get till() {
      return getDateTill(2);
    },
  },
  {
    startStamp: currentDate.add(3, 'month').startOf('month'),
    get monthName() { return this.startStamp.format('MMMM'); },
    get from() {
      return getDateFrom(3);
    },
    get till() {
      return getDateTill(3);
    },
  },
  {
    startStamp: currentDate.add(4, 'month').startOf('month'),
    get monthName() { return this.startStamp.format('MMMM'); },
    get from() {
      return getDateFrom(4);
    },
    get till() {
      return getDateTill(4);
    },
  },
  {
    startStamp: currentDate.add(5, 'month').startOf('month'),
    get monthName() { return this.startStamp.format('MMMM'); },
    get from() {
      return getDateFrom(5);
    },
    get till() {
      return getDateTill(5);
    },
  },
];
