import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { subMenuSelector } from '../../../store/header/header-selectors';
import { ContainerLayout } from '../../../layouts/container-layout';
import SubMenuItem from './sub-menu-item/sub-menu-item';

import styles from './sub-menu.module.scss';

type Props = {
  isShowSearch: boolean
};

const SubMenu: React.FC<Props> = React.memo(({ isShowSearch }) => {
  const subMenu = useSelector(subMenuSelector);

  return (
    <div className={styles.sbm}>
      <style jsx>
        {`
          .pensnewsHeader {
            background: #ffc000;
          }

          .pensnewsHeader::before {
            background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ffc000 100%);
          }
        `}
      </style>
      <ContainerLayout>
        <div className={
          classNames(styles.sbmWrp, process.env.NEXT_PUBLIC_LOGO_CLASS, { [styles.sbmWrpActive]: isShowSearch })
        }
        >
          <ul className={styles.sbmLs}>
            {subMenu.map((item) => <SubMenuItem key={item.id} {...item} />)}
          </ul>
        </div>
      </ContainerLayout>
    </div>
  );
});

export default SubMenu;
