import React from 'react';
import classNames from 'classnames';

import styles from './login-social.module.scss';

const LoginSocial = () => (
  <div className={styles.loginSocial}>
    <a className={classNames([styles.loginSocialLink], [styles.loginSocialLinkVk])} href="#" aria-label="Войти через VK" />
    <a className={classNames([styles.loginSocialLink], [styles.loginSocialLinkFb])} href="#" aria-label="Войти через Facebook" />
    <a className={classNames([styles.loginSocialLink], [styles.loginSocialLinkOdn])} href="#" aria-label="Войти через Одноклассники" />
    <a className={classNames([styles.loginSocialLink], [styles.loginSocialLinkGoogle])} href="#" aria-label="Войти через Google" />
  </div>
);

export default LoginSocial;
