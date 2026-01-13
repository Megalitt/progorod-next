import React from 'react';
import { useSelector } from 'react-redux';
import { navSelector } from '../../../store/footer/footer-selectors';
import FooterMenuBottomItem from './footer-menu-bottom-item/footer-menu-bottom-item';

import styles from './footer-menu-bottom.module.scss';

const FooterMenuBottom: React.FC = React.memo(() => {
  const nav = useSelector(navSelector);

  return (
    <ul className={styles.ftrBtmLst}>
      {nav.map((item) => <FooterMenuBottomItem key={item.id} {...item} />)}
    </ul>
  );
});

export default FooterMenuBottom;
