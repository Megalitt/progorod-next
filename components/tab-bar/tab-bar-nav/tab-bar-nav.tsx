import React from 'react';
import classNames from 'classnames';

import styles from './tab-bar-nav.module.scss';

type Props = {
  navLabel: string,
  onChangeActiveTab: (str: string, index: number) => void,
  className?: string,
  tabIndex: number,
};

const TabBarNav: React.FC<Props> = React.memo(({
  navLabel,
  className,
  tabIndex,
  onChangeActiveTab,
}) => {
  const handleChangeActiveTabClick = () => onChangeActiveTab(navLabel, tabIndex);
  return (
    <button
      type="button"
      className={classNames(styles.navItem, { [styles.navItemActive]: className })}
      onClick={handleChangeActiveTabClick}
    >
      {navLabel}
    </button>
  );
});

export default TabBarNav;
