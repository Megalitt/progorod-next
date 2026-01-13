import React from 'react';
import ModalMenuItem from './modal-menu-item/modal-menu-item';
import styles from './modal-menu.module.scss';

type Props = {
  navCities: Array<any>
};

const ModalMenu: React.FC<Props> = React.memo(({ navCities }) => (
  <ul className={styles.modalMenu}>
    {navCities.map((item) => <ModalMenuItem key={item.id} {...item} />)}
  </ul>
));

export default ModalMenu;
