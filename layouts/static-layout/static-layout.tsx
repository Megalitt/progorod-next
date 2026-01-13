import React from 'react';
import styles from './static-layout.module.scss';

type Props = {
  refContent?: React.RefObject<HTMLInputElement>,
};
const StaticLayout: React.FC<Props> = React.memo(({ children, refContent }) => (
  <div className={styles.static} ref={refContent}>
    {children}
  </div>
));

export default StaticLayout;
