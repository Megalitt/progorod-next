import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { validateAskFaqForm } from '../../../../utils/form-validate/form-offer-news-validate';
import { apiPostFaqAskQuestionValue } from '../../../../services/faq';
import { setAlerts } from '../../../../store/alert/alert-slice';
import { Button } from '../../../button';
import { ProjectCheckbox } from '../../../project-checkbox';
import { ProjectInput } from '../../../project-input';
import { ProjectTextarea } from '../../../project-textarea';
import { createMarkup } from '../../../../utils/core/create-markup';
import { agreementTextSelector } from '../../../../store/settings/settings-selectors';

import styles from './form-answer.module.scss';

const FormAnswer: React.FC = () => {
  const [isDisabled, setIsDisabledFlag] = useState(true);
  const dispatch = useDispatch();
  const agreement = useSelector(agreementTextSelector);

  return (
    <Formik
      initialValues={{
        fio: '',
        text: '',
        phone: '',
        email: '',
        is_agree: '',
      }}
      validate={validateAskFaqForm}
      onSubmit={async (values, { resetForm }) => {
        setIsDisabledFlag((prev) => !prev);
        try {
          await apiPostFaqAskQuestionValue(values);

          dispatch(setAlerts({
            message: 'Успешно! Ваш вопрос успешно отправлен на модерацию',
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
      {({ dirty, isValid }) => (
        <Form className={styles.formAnswer}>
          <div className={styles.blockFormField}>
            <ProjectTextarea
              placeholder="Сообщение"
              name="text"
            />
          </div>
          <div className={styles.blockFormFields}>
            <ProjectInput
              placeholder="Ваше имя"
              name="fio"
            />
            <ProjectInput
              placeholder="Телефон"
              name="phone"
            />
            <ProjectInput
              placeholder="E-mail"
              name="email"
            />
            <ProjectCheckbox
              name="is_agree"
            >
              {agreement && agreement.length > 0 && (
                <div dangerouslySetInnerHTML={createMarkup(agreement)} />
              )}
            </ProjectCheckbox>
          </div>
          <div className={styles.blockFormAction}>
            <Button
              type="submit"
              disabled={isDisabled && !(isValid && dirty)}
            >
              Отправить вопрос
            </Button>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default FormAnswer;
