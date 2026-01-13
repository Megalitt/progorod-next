import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { validateField } from '../../../utils/form-validate/form-new-password-validate';
import { apiPostResetPassword } from '../../../services/auth';
import { ProjectInput } from '../../project-input';
import { Button } from '../../button';
import { setAlerts } from '../../../store/alert/alert-slice';
import styles from './form-new-password.module.scss';

type ResetPasswordProps = {
  token: string | boolean;
};

const FormNewPassword: React.FC<ResetPasswordProps> = React.memo(({ token }) => {
  const [isDisabled, setIsDisabledFlag] = React.useState(true);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      validate={validateField}
      onSubmit={async (values) => {
        setIsDisabledFlag((prev) => !prev);
        try {
          await apiPostResetPassword(token, values);
          dispatch(setAlerts({
            message: 'Пароль успешно изменен',
            messageType: 'success',
          }));
        } catch (err) {
          dispatch(setAlerts({
            message: 'Ошибка! При отправке данных возникла ошибка',
            messageType: 'error',
          }));
          console.log(err);
        }
      }}
    >
      {({ dirty, isValid }) => (
        <Form className={styles.formNewPassword}>
          <ProjectInput
            placeholder="Новый пароль"
            name="password"
            className={styles.formNewPasswordField}
          />
          <Button
            type="submit"
            disabled={isDisabled && !(isValid && dirty)}
            className={styles.formNewPasswordSend}
          >
            Поменять пароль
          </Button>
        </Form>
      )}
    </Formik>
  );
});
export default FormNewPassword;
