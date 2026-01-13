import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { setAlerts } from '../../../store/alert/alert-slice';
import { validateField } from '../../../utils/form-validate/form-recovery-password-validate';
import { apiPostRecoveryPassword } from '../../../services/auth';
import { Button } from '../../button';
import { ProjectInput } from '../../project-input';
import styles from './form-recovery-password.module.scss';

type Props = {
  onHandleTogglerForm: (nameForm: string) => void;
  onCloseLoginClick: () => void;
};

const FormRecoveryPassword: React.FC<Props> = React.memo(({
  onHandleTogglerForm,
  onCloseLoginClick,
}) => {
  const [isDisabled, setIsDisabledFlag] = React.useState(true);
  const dispatch = useDispatch();

  const handleTogglerFormClick = () => onHandleTogglerForm('auth');

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validate={validateField}
      onSubmit={async (values) => {
        setIsDisabledFlag((prev) => !prev);

        try {
          const { data } = await apiPostRecoveryPassword(values);

          if (data.resultCode) {
            const messagesUserName = 'username' in data.messages ? data.messages.username : '';

            if (messagesUserName !== '') {
              dispatch(setAlerts({
                message: messagesUserName,
                messageType: 'success',
              }));
            }

            onCloseLoginClick();
          } else {
            dispatch(setAlerts({
              message: 'Пользователя с таким e-mail не существует',
              messageType: 'info',
            }));
            onCloseLoginClick();
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ dirty, isValid }) => (
        <Form className={styles.formRecoveryPassword}>
          <ProjectInput
            className={styles.formRecoveryPasswordField}
            placeholder="E-mail"
            name="email"
            type="text"
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={isDisabled && !(isValid && dirty)}
            className={styles.formRecoveryPasswordSubmit}
          >
            Поменять пароль
          </Button>
          <footer className={styles.formRecoveryPasswordFooter}>
            <button className={styles.formRecoveryPasswordBtn} type="button" onClick={handleTogglerFormClick}>Вход</button>
          </footer>
        </Form>
      )}
    </Formik>
  );
});

export default FormRecoveryPassword;
