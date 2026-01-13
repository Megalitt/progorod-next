import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { validateSpecialistFaqForm } from '../../../../utils/form-validate/form-offer-news-validate';
import { postFaqSpecialistValue } from '../../../../services/faq';
import { setAlerts } from '../../../../store/alert/alert-slice';
import { Button } from '../../../button';
import { ProjectInput } from '../../../project-input';
import ProjectSelectCustom from '../../../project-select-custom/project-select-custom';

import styles from './form-specialist.module.scss';

type Props = {
  companies: any,
};

const FormSpecialist: React.FC<Props> = ({ companies }) => {
  const [isDisabled, setIsDisabledFlag] = useState(true);
  const dispatch = useDispatch();

  const changeCompanies = () => companies.map((item) => ({
    ...item,
    title: item.name,
  }));

  const currentCompanies = [{
    name: 'Не задано',
    title: 'Не задано',
    id: '0',
  }, ...changeCompanies()];

  return (
    <Formik
      initialValues={{
        fio: '',
        position: '',
        faq_company_id: '',
        my_company: '',
      }}
      validate={validateSpecialistFaqForm}
      onSubmit={async (values, { resetForm }) => {
        setIsDisabledFlag((prev) => !prev);
        try {
          await postFaqSpecialistValue(values);
          dispatch(setAlerts({
            message: 'Успешно! Ваша заявка успешно отправлена на модерацию',
            messageType: 'success',
          }));
          resetForm();
          setIsDisabledFlag((prev) => !prev);
        } catch (err) {
          dispatch(setAlerts({
            message: 'Ошибка! При отправке данных возникла ошибка',
            messageType: 'error',
          }));
          setIsDisabledFlag((prev) => !prev);
          console.log(err);
        }
      }}
    >
      {({ dirty, isValid, setFieldValue }) => (
        <Form className={styles.formSpecialist}>
          <div className={styles.blockFormFields}>
            <ProjectInput
              placeholder="Ваше имя"
              name="fio"
            />
            <ProjectInput
              placeholder="Должность"
              name="position"
            />

            <ProjectSelectCustom
              className={styles.select}
              classNameActive={styles.formPeoplecontrolCatagoryActive}
              name="faq_company_id"
              options={currentCompanies}
              selectedDefaultValue={currentCompanies.length > 0 ? currentCompanies[0]?.id : 0}
              setFieldValue={setFieldValue}
            />

            <ProjectInput
              placeholder="Или введите название компании"
              name="my_company"
            />
          </div>
          <div className={styles.blockFormAction}>
            <Button
              type="submit"
              disabled={isDisabled && !(isValid && dirty)}
            >
              Отправить заявку
            </Button>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default FormSpecialist;
