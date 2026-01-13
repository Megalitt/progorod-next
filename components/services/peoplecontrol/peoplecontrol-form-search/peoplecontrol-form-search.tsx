import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import { Formik, Form } from 'formik';

import { getDateRange } from '../../../../utils/time/get-date-range';
import { setMilisecondToSecond } from '../../../../utils/time/set-milisecond-to-second';
import { getDateMilisecond } from '../../../../utils/time/get-date-milisecond';

import { Button } from '../../../button';
import { DayPickerCustom } from '../../../daypicker-custom';
import { ProjectSelectCustom } from '../../../project-select-custom';

import useToggleVisibleAnimate from '../../../../hooks/use-close-animate';
import useClickOutside from '../../../../hooks/use-click-outside';
import styles from './peoplecontrol-form-search.module.scss';

type Props = {
  complaintsTotalPosts: number;
  categories: Array<any>;
};

const PeoplecontrolFormSearch: React.FC<Props> = React.memo(({
  complaintsTotalPosts,
  categories,
}) => {
  const [rangeDate, setRange]: any = React.useState({});
  const [dateValue, setDateValue] = React.useState('');
  const router = useRouter();
  const { query } = router;
  const { from, to } = rangeDate;

  const {
    isShowElement,
    isCloseAnimated,
    handleOpenClick,
    handleCloseClick,
  } = useToggleVisibleAnimate();

  const handleOpenDayPicker = React.useCallback(
    () => {
      setRange({
        from: null,
        to: null,
      });
      handleOpenClick();
    },
    [],
  );

  const handleDayPickerVisibleToggle = React.useCallback(
    (evt) => {
      evt.preventDefault();
      return !isShowElement ? handleOpenDayPicker() : handleCloseClick();
    },
    [isShowElement],
  );

  const handleDayClick = React.useCallback((range) => setRange(range), []);

  const handleSubmit = async ({ category_id }) => {
    let categoryGet: string = '';

    if (category_id) categoryGet = `?category=${category_id}`;
    else if (category_id.length === 0 && query.category) categoryGet = `?category=${query.category}`;

    const dataRange = from && to ? `${!categoryGet ? '?' : '&'}dataFrom=${new Date(from).getTime() / 1000}&dataTo=${new Date(to).getTime() / 1000}` : '';
    const pageGet = (!categoryGet && !dataRange) ? '?page=1' : '&page=1';
    router.push(`/peoplecontrol${categoryGet}${dataRange}${pageGet}`);
  };

  const refDayPicker = useClickOutside(() => {
    handleCloseClick();
  });

  React.useEffect(() => {
    if (from && to) {
      setDateValue(`${getDateRange(setMilisecondToSecond(from))} - ${getDateRange(setMilisecondToSecond(to))}`);
    }
  }, [from, to]);

  React.useEffect(() => {
    if (query.dataFrom && query.dataTo) {
      setRange({
        from: new Date(+query.dataFrom * 1000),
        to: new Date(+query.dataTo * 1000),
      });
      setDateValue(`${getDateRange(getDateMilisecond(+query.dataTo))} - ${getDateRange(getDateMilisecond(+query.dataTo))}`);
    }
  }, [query.dataFrom, query.dataTo]);

  return (
    <Formik
      initialValues={{
        dateFilter: '',
        category_id: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <>
          <Form className={styles.formSearchComplaint}>
            <div className={styles.formSearchComplaintCount}>
              Жалобы:
              {complaintsTotalPosts}
            </div>
            <div className={styles.formSearchComplaintDateFilter}>
              <button
                onClick={handleDayPickerVisibleToggle}
                className={classNames(styles.formSearchComplaintDateFilterInput, {
                  [styles.formSearchComplaintDateFilterInputActive]: !isCloseAnimated,
                  [styles.formSearchComplaintDateFilterInputSelected]: dateValue !== '',
                })}
                type="button"
              >
                {dateValue.length > 0 ? dateValue : 'Выберите период'}
              </button>
              {isShowElement && (
                <div
                  className={classNames(styles.formSearchComplaintDayPicker, {
                    [styles.formSearchComplaintDayPickerClose]: isCloseAnimated,
                  })}
                >
                  <DayPickerCustom
                    {...rangeDate}
                    onHandleDayClick={handleDayClick}
                    refDayPicker={refDayPicker}
                  />
                </div>
              )}
            </div>
            <ProjectSelectCustom
              className={styles.formSearchComplaintCategory}
              classNameActive={styles.formSearchComplaintActive}
              name="category_id"
              options={categories}
              selectedDefaultValue={query.category ? +query.category : 0}
              setFieldValue={setFieldValue}
            />
            <Button
              type="submit"
              className={styles.formSearchComplaintSubmit}
            >
              Поиск
            </Button>
            <Link prefetch={false} href="/peoplecontrol/send-complaint">
              { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={styles.formSearchComplaintSend}>Подать жалобу</a>
            </Link>
          </Form>
        </>
      )}
    </Formik>
  );
});

export default PeoplecontrolFormSearch;
