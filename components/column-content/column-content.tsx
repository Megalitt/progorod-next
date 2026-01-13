import React from 'react';
import styles from './column-content.module.scss';

type Props = {
  title: string,
  content: string,
  columnHeight?: null | number,
};

const ColumnContent: React.FC<Props> = React.memo(({ title, content }) => (
  <div className={styles.columnContent}>
    <h2 className={styles.columnContentTitle}>{title}</h2>
    <div className={styles.columnContentText} dangerouslySetInnerHTML={{ __html: content }} />
  </div>
));

export default ColumnContent;
