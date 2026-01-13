import React from 'react';
import styles from './tab-bar-item-empty.module.scss';

type Props = {
  message: string,
};

const TabBarItemEmpty: React.FC<Props> = React.memo(({ message }) => (
  <div className={styles.TabBarItemEmpty}>{message}</div>
));
export default TabBarItemEmpty;
