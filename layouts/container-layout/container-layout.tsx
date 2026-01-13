import React from 'react';
import styles from './container-layout.module.scss';

type Props = {
  children: JSX.Element[] | JSX.Element
};

const ContainerLayout: React.FC<Props> = React.memo(({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
));

export default ContainerLayout;
