import React from 'react';
import classNames from 'classnames';

import styles from './rows-layout.module.scss';

type Props = {
  className?: string,
};

const RowsLayout: React.FC<Props> = React.memo(({ children, className }) => (
  <div className={classNames(styles.rows, className)}>
    {children}
  </div>
));

export default RowsLayout;
