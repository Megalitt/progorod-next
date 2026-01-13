import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { createMarkup } from '../../../utils/core/create-markup';
import { validateField } from '../../../utils/form-validate/form-registration-validate';
import { apiPostLoginRegistration } from '../../../services/auth';
import ProjectInput from '../../project-input/project-input';
import { Button } from '../../button';
import { agreementTextSelector } from '../../../store/settings/settings-selectors';
import ProjectCheckbox from '../../project-checkbox/project-checkbox';
import { setAlerts } from '../../../store/alert/alert-slice';
import styles from './form-registration.module.scss';

type Props = {
  onHandleTogglerForm: (nameForm: string) => void;
  onCloseLoginClick: () => void;
};

const FormRegistration: React.FC<Props> = React.memo(({
  onHandleTogglerForm,
  onCloseLoginClick,
}) => {
  const [isDisabled, setIsDisabledFlag] = React.useState(true);
  const dispatch = useDispatch();
  const agreement = useSelector(agreementTextSelector);

  const handleTogglerFormClick = () => onHandleTogglerForm('auth');

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        nick: '',
        password: '',
        is_agree: '',
      }}
      validate={validateField}
      onSubmit={async (values) => {
        setIsDisabledFlag((prev) => !prev);
        try {
          const data = await apiPostLoginRegistration(values);

          if (data.resultCode) {
            const messagesUserName = 'username' in data.messages ? data.messages.username : '';

            if (messagesUserName !== '') {
              dispatch(setAlerts({
                message: messagesUserName,
                messageType: 'success',
              }));
              onCloseLoginClick();
            }
          } else {
            const messagesEmail = 'email' in data.messages ? data.messages.email : '';
            const messagesNick = 'nick' in data.messages ? data.messages.nick : '';
            const messagesUserName = 'username' in data.messages ? data.messages.username : '';

            dispatch(setAlerts({
              message: `
                <p>${messagesEmail}</p>
                <p>${messagesNick}</p>
                <p>${messagesUserName}</p>
              `,
              messageType: 'info',
            }));
          }
        } catch (err) {
          dispatch(setAlerts({
            message: 'Ошибка! Не удалось зарегистрироваться',
            messageType: 'error',
          }));
          onCloseLoginClick();
          console.log(err);
        }
      }}
    >
      {({ dirty, isValid }) => (
        <Form className={styles.formRegistration}>

          <ProjectInput
            className={styles.formRegistrationField}
            placeholder="E-mail"
            name="email"
            type="email"
            autoComplete="off"
          />
          <ProjectInput
            className={styles.formRegistrationField}
            placeholder="Логин"
            name="username"
            autoComplete="off"
          />
          <ProjectInput
            className={styles.formRegistrationField}
            placeholder="Ник"
            name="nick"
            autoComplete="off"
          />
          <ProjectInput
            className={styles.formRegistrationField}
            placeholder="Пароль"
            name="password"
            type="password"
            autoComplete="off"
          />
          <ProjectCheckbox
            name="is_agree"
            className={styles.formRegistrationCheckPersonal}
          >
            {agreement && agreement.length > 0 && (
              <div dangerouslySetInnerHTML={createMarkup(agreement)} />
            )}
          </ProjectCheckbox>
          <Button
            type="submit"
            disabled={isDisabled && !(isValid && dirty)}
            className={styles.formRegistrationSubmit}
          >
            Зарегистрироваться
          </Button>
          <footer className={styles.formRegistrationFooter}>
            <button className={styles.formRegistrationBtn} type="button" onClick={handleTogglerFormClick}>Вход</button>
          </footer>
        </Form>
      )}

    </Formik>
  );
});

export default FormRegistration;
