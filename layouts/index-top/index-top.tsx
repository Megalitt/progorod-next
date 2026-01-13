import React from 'react';
import styles from './index-top.module.scss';

const IndexTop: React.FC = React.memo(({ children }) => (
  <div className={styles.indexTop}>
    <div className={styles.indexTopColLeft}>{children[0]}</div>
    <div className={styles.indexTopColContent}>{children[1]}</div>
    <div className={styles.indexTopColRight}>{children[2]}</div>
  </div>
));

export default IndexTop;