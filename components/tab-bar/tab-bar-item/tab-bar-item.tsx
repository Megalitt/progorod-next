import React from 'react';
import classNames from 'classnames';

import styles from './tab-bar-item.module.scss';

type Props = {
  label: string,
  activeTab?: string,
};

const TabBarItem: React.FC<Props> = React.memo(({
  children, label, activeTab, ...attrs
}) => (
  <div
    className={classNames(styles.TabBarItem, { [styles.active]: label === activeTab })}
    {...attrs}
  >
    {children}
  </div>
));
export default TabBarItem;
