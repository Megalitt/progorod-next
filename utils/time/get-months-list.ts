export const getMonthsList = () => {
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const monthsList = [];

  for (let i = 1; i <= months.length; i += 1) {
    monthsList.push({
      id: i,
      title: months[i - 1],
    });
  }

  return monthsList;
};
