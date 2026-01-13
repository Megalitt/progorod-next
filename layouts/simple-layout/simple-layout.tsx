import React from 'react';

import classNames from 'classnames';
import styles from './simple-layout.module.scss';

type Props = {
  title?: string,
  align?: string,
  type?: string,
};

const SimpleLayout: React.FC<Props> = React.memo(({
  children,
  title,
  align = 'center',
  type = '',
}) => (
  <>
    <h1 className={classNames(styles.ttl, {
      [styles.ttlLeft]: align === 'left',
    })}
    >
      {title}
    </h1>
    <div className={type === 'transparent' ? `${styles.cnr} ${styles.transp}` : styles.cnr}>{children}</div>
  </>
));

export default SimpleLayout;
