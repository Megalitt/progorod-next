import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, setLoginStatus } from '../../../store/login/login-slice';
import { setAlerts } from '../../../store/alert/alert-slice';
import { validateField } from '../../../utils/form-validate/form-login-validate';
import { apiPostLogin } from '../../../services/auth';
import { Button } from '../../button';
import { ProjectInput } from '../../project-input';

import styles from './form-login.module.scss';
import { disableRegistrationSelector } from '../../../store/settings/settings-selectors';

type Props = {
  onHandleTogglerForm: (nameForm: string) => void;
  onCloseLoginClick: () => void;
};

const FormLogin: React.FC<Props> = React.memo(({ onHandleTogglerForm, onCloseLoginClick }) => {
  const [isDisabled, setIsDisabledFlag] = React.useState(true);
  const dispatch = useDispatch();

  const disableRegistration = useSelector(disableRegistrationSelector);

  const handleTogglerFormRegClick = () => onHandleTogglerForm('formReg');
  const handleTogglerFormResetClick = () => onHandleTogglerForm('formReset');

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validate={validateField}
      onSubmit={async (values) => {
        setIsDisabledFlag((prev) => !prev);
        await apiPostLogin(values)
          .then(async ({ data }) => {
            if (!data.resultCode) {
              await dispatch(setAlerts({
                message: 'Не удалось авторизоваться',
                messageType: 'info',
              }));
              const messagesEmail = 'password' in data.messages ? data.messages.password : '';
              dispatch(setAlerts({
                message: `<p>${messagesEmail}</p>`,
                messageType: 'info',
              }));

              onCloseLoginClick();
            } else {
              const { payload }:any = await dispatch(getLoginStatus());
              const { resultCode } = payload;
              await dispatch(setLoginStatus(resultCode));
              await dispatch(setAlerts({
                message: 'Вы успешно авторизованы',
                messageType: 'success',
              }));
              onCloseLoginClick();
            }
          }).catch((err) => {
            console.log(err);
          });
      }}
    >
      {({ dirty, isValid }) => (
        <Form className={styles.formLogin}>
          <ProjectInput
            className={styles.formLoginField}
            placeholder="Логин"
            name="username"
            autoComplete="off"
          />
          <ProjectInput
            className={styles.formLoginField}
            placeholder="Пароль"
            name="password"
            type="password"
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={isDisabled && !(isValid && dirty)}
            className={styles.formLoginSubmit}
          >
            Войти
          </Button>
          <footer className={styles.formLoginFooter}>
            {+disableRegistration === 0 && <button className={styles.formLoginBtn} type="button" onClick={handleTogglerFormRegClick}>Регистрация</button>}
            <button className={styles.formLoginBtn} type="button" onClick={handleTogglerFormResetClick}>Забыли пароль</button>
          </footer>
        </Form>
      )}
    </Formik>
  );
});

export default FormLogin;
