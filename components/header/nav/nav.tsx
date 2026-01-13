import React from 'react';
import classNames from 'classnames';

import { NavType } from '../types';
import NavItem from './nav-item/nav-item';
import styles from './nav.module.scss';

type Props = {
  nav:Array<NavType>,
  currentPath: string,
  extraClass?: string,
  isNavCities?: boolean,
};

const Nav: React.FC<Props> = React.memo(({
  nav,
  currentPath,
  extraClass = 'nvMain',
  isNavCities,
}) => (
  <nav
    className={classNames({
      [styles.nvMobileNav]: isNavCities,
    })}
  >
    <ul
      className={classNames(styles.nv, styles[extraClass])}
    >
      {nav.map((item) => <NavItem key={item.id} currentPath={currentPath} {...item} />)}
    </ul>
  </nav>
));

export default Nav;
