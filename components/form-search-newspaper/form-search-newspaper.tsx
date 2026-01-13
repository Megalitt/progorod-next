import React from 'react';
import { Formik, Form } from 'formik';

import { useRouter } from 'next/router';
import { Button } from '../button';
import { ProjectSelectCustom } from '../project-select-custom';

import styles from './form-search-newspapers.module.scss';

type DateReleseType = {
  id: number,
  title: string,
};

type Props = {
  months: Array<DateReleseType>,
  yearsReleseNewspaper: Array<DateReleseType>,
};

const FormSearchNewspaper: React.FC<Props> = React.memo(({ months, yearsReleseNewspaper }) => {
  const router = useRouter();
  const { query } = router;

  const getIndexMonth = (queryDate: string | string[]) => +queryDate.toString().substr(0, queryDate.lastIndexOf('-'));

  const getIndexYear = (queryDate: string | string[], arr: Array<any>) => {
    const getYear = queryDate.toString().substr(queryDate.lastIndexOf('-') + 1);
    return Array.isArray(arr) && arr.findIndex((item) => item.title === getYear);
  };

  const handleSubmit = ({ month_id, year_id }) => {
    const { title } = yearsReleseNewspaper.find((item) => item.id === year_id);
    router.push(`/newspapers?date=${month_id}-${title}`);
  };

  return (
    <Formik
      initialValues={{
        month_id: query.date ? getIndexMonth(query.date) : 0,
        year_id: query.date
          ? getIndexYear(query.date, yearsReleseNewspaper)
          : yearsReleseNewspaper.length - 1,
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <>
          <Form className={styles.formSearchNewspaper}>
            <ProjectSelectCustom
              className={styles.formSearchNewspaperSelect}
              name="month_id"
              options={months}
              setFieldValue={setFieldValue}
              selectedDefaultValue={query.date ? getIndexMonth(query.date) : 0}
            />
            <ProjectSelectCustom
              className={styles.formSearchNewspaperSelect}
              name="year_id"
              options={yearsReleseNewspaper}
              setFieldValue={setFieldValue}
              selectedDefaultValue={
                query.date
                  ? getIndexYear(query.date, yearsReleseNewspaper)
                  : yearsReleseNewspaper.length - 1
              }
            />
            <Button
              className={styles.formSearchNewspaperSubmit}
              type="submit"
            >
              Поиск
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
});

export default FormSearchNewspaper;
