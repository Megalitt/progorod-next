import React from 'react';
import classNames from 'classnames';
import styles from './project-col2-layout.module.scss';

const ProjectCol2Layout: React.FC = React.memo(({ children }) => {
  const childrens = React.Children.toArray(children);
  return (
    <div
      className={classNames(styles.grid, {
        [styles.gridFull]: childrens.length === 1,
      })}
    >
      <div className={styles.colLeft}>{childrens[0]}</div>
      <div className={styles.colRight}>{childrens[1]}</div>
    </div>
  );
});

export default ProjectCol2Layout;
