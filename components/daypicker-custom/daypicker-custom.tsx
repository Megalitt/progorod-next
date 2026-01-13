import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { month } from '../../utils/consts';

const DayPickerCustom = ({
  from,
  to,
  onHandleDayClick,
  refDayPicker,
}) => {
  const handleDayClick = (day) => onHandleDayClick(DateUtils.addDayToRange(day, { from, to }));

  return (
    <div ref={refDayPicker}>
      <DayPicker
        className="selectable"
        locale="ru"
        months={month.ru}
        modifiers={{ start: from, end: to }}
        selectedDays={[from, { from, to }]}
        showOutsideDays
        showWeekDays={false}
        onDayClick={handleDayClick}
      />
    </div>
  );
};

export default DayPickerCustom;
