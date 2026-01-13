import React from 'react';
import Link from 'next/link';

import styles from './user-profile-error.module.scss';

const UserProfileError = () => (
  <div className={styles.userProfileError}>
    <p>Страница пользователя недоступна. Пожалуйста, авторизируйтесь.</p>
    <p>
      <Link prefetch={false} href="/">
        <a>Вернуться на главную страницу</a>
      </Link>
    </p>
  </div>
);

export default UserProfileError;
