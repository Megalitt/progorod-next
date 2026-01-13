import React from 'react';
import styles from './loader.module.scss';

const Loader: React.FC = () => (
  <div className={styles.loader}>
    <div className={styles.loaderEllips}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
