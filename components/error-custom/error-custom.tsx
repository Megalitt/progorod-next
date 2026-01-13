import React from 'react';

import { LinkCustom } from '../link-custom';
import styles from './error-custom.module.scss';

const ErrorCustom: React.FC = () => (
  <div className={styles.err}>
    <div className={styles.errWrap}>
      <q>
        Эта страница не найдена. Но вы можете посетить другие страницы.
      </q>
    </div>
    <LinkCustom href="/" className="btn">На главную</LinkCustom>
  </div>
);

export default ErrorCustom;
