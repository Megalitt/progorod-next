import React from 'react';
import { useSelector } from 'react-redux';
import { citiesSelector } from '../../../store/footer/footer-selectors';
import FooterMenuTopItem from './footer-menu-top-item/footer-menu-top-item';

import styles from './footer-menu-top.module.scss';

const FooterMenuTop: React.FC = React.memo(() => {
  const cities = useSelector(citiesSelector);

  return (
    <ul className={styles.ftrTopLst}>
      {
        cities.map((item) => (
          <FooterMenuTopItem key={item.id} {...item} />
        ))
      }
    </ul>
  );
});

export default FooterMenuTop;
