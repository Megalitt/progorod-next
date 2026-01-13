import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import LoginSocial from './login-social/login-social';
import { setShowModalType } from '../../../store/login/login-slice';
import { showModaltype, closeLoginAnimated } from '../../../store/login/login-selectors';

import styles from './login.module.scss';
import { disableRegistrationSelector } from '../../../store/settings/settings-selectors';

type Props = {
  onCloseLoginClick: () => void
};

const Login: React.FC<Props> = React.memo(({
  onCloseLoginClick,
}) => {
  const isShowModaltype = useSelector(showModaltype);
  const isCloseLoginAnimated = useSelector(closeLoginAnimated);
  const disableRegistration = useSelector(disableRegistrationSelector);
  const dispatch = useDispatch();

  const handleTogglerForm = (nameForm) => {
    dispatch(setShowModalType(nameForm));
  };

  const Render = () => {
    if (isShowModaltype === 'auth') {
      const FormLogin:any = dynamic(
        () => import('../../auth/form-login').then((mod) => mod.FormLogin),
        { loading: () => <p>...</p> },
      );
      return (
        <>
          <header className={styles.loginHeader}>
            <div className={styles.loginTitle}>Авторизация</div>
            <LoginSocial />
          </header>
          <FormLogin
            onHandleTogglerForm={handleTogglerForm}
            onCloseLoginClick={onCloseLoginClick}
          />
        </>
      );
    }
    if (isShowModaltype === 'formReg' && +disableRegistration === 0) {
      const FormRegistration:any = dynamic(
        () => import('../../auth/form-registration').then((mod) => mod.FormRegistration),
        { loading: () => <p>...</p> },
      );

      return (
        <>
          <header className={styles.loginHeader}>
            <div className={styles.loginTitle}>Регистрация</div>
            <LoginSocial />
          </header>
          <FormRegistration
            onHandleTogglerForm={handleTogglerForm}
            onCloseLoginClick={onCloseLoginClick}
          />
        </>
      );
    }

    if (isShowModaltype === 'formReset') {
      const FormRecoveryPassword:any = dynamic(
        () => import('../../auth/form-recovery-password').then((mod) => mod.FormRecoveryPassword),
        { loading: () => <p>...</p> },
      );

      return (
        <>
          <header className={styles.loginHeader}>
            <div className={styles.loginTitle}>Восстановление пароля</div>
            <LoginSocial />
          </header>
          <FormRecoveryPassword
            onHandleTogglerForm={handleTogglerForm}
            onCloseLoginClick={onCloseLoginClick}
          />
        </>
      );
    }

    return null;
  };

  return (
    <>
      <div
        className={classNames(styles.loginShadow, {
          [styles.loginShadowCloseAnimate]: isCloseLoginAnimated,
        })}
        onClick={onCloseLoginClick}
        aria-label="Закрыть модальное окно"
        aria-hidden="true"
      />
      <div
        className={classNames(styles.login, {
          [styles.loginCloseAnimate]: isCloseLoginAnimated,
        })}
      >
        <div className={styles.loginWrap}>
          <button
            className={styles.loginBtnClose}
            onClick={onCloseLoginClick}
            type="button"
            aria-label="Закрыть модальное окно"
            aria-hidden="true"
          />
          <Render />
        </div>
      </div>
    </>
  );
});

export default Login;
