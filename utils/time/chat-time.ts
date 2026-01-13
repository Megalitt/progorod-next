const MILL_IN_SECOND = 1000; // 1s
const MILL_IN_MINUTE = MILL_IN_SECOND * 60; // 1minute
const MILL_IN_HOUR = MILL_IN_MINUTE * 60; // 1hour
const MILL_IN_DAY = MILL_IN_HOUR * 24; // 1day
const MILL_IN_MONTH = MILL_IN_DAY * 30; // 1 month as 30 days
const MILL_IN_YEAR = MILL_IN_DAY * 365; // 1day
const SEC_59 = MILL_IN_MINUTE - MILL_IN_SECOND; // 59s
const MIN_59_SEC_59 = MILL_IN_HOUR - MILL_IN_SECOND; // 59min 59sec
const HOUR_23_MIN_59_SEC_59 = MILL_IN_DAY - MILL_IN_SECOND; // 23hour 59min 59sec
const DAY_29_HOUR_23_MIN_59_SEC_59 = MILL_IN_MONTH - MILL_IN_SECOND;

const getCurrentMonth = (num) => {
  switch (num) {
    case 0:
      return 'Января';
    case 1:
      return 'Февраля';
    case 2:
      return 'Марта';
    case 3:
      return 'Апреля';
    case 4:
      return 'Мая';
    case 5:
      return 'Июня';
    case 6:
      return 'Июля';
    case 7:
      return 'Августа';
    case 8:
      return 'Сентября';
    case 9:
      return 'Октября';
    case 10:
      return 'Ноября';
    case 11:
      return 'Декабря';
    default:
      return '';
  }
};

export const getChatData = (dt) => {
  const currentDate = Date.now();
  const date = new Date(dt * 1000);
  const diff = currentDate - +date;
  if (diff <= SEC_59) {
    return 'только что';
  } if (diff <= MIN_59_SEC_59) {
    return `${Math.floor(diff / MILL_IN_MINUTE)}м назад`;
  } if (diff <= HOUR_23_MIN_59_SEC_59) {
    return `${Math.floor(diff / MILL_IN_HOUR)}ч назад`;
  } if (diff <= DAY_29_HOUR_23_MIN_59_SEC_59) {
    return `${Math.floor(diff / MILL_IN_DAY)}д назад`;
  } if (diff <= MILL_IN_YEAR - MILL_IN_SECOND) {
    return `${date.getDate()} ${getCurrentMonth(date.getMonth())}`;
  }
  return `${date.getDate()} ${getCurrentMonth(date.getMonth())} ${date.getFullYear()}`;
};
