import React from 'react';
import classNames from 'classnames';

import styles from './page-title.module.scss';

type Props = {
  title: string,
  type?: string,
  description?: null | string,
  tag?: null | string,
};

const PageTitle: React.FC<Props> = React.memo(({
  title, description, type, tag,
}) => {
  switch (type) {
    case 'rubric': {
      return (
        <div className={classNames(styles.pageTitle, styles.pageTitleRubric)}>
          <h1>{title}</h1>
          {
            description && <p className={styles.pageTitleDescr}>{description}</p>
          }
        </div>
      );
    }
    case 'tag': {
      return (
        <div className={styles.pageTitle}>
          <h1>
            {title}
            &nbsp;
            {tag && <span className={styles.pageTitleTag}>{tag}</span>}
          </h1>
        </div>
      );
    }
    case 'redactorsNews': {
      return (
        <div className={classNames(styles.pageTitle, styles.pageTitleRedactor)}>
          <h1>{title}</h1>
        </div>
      );
    }
    default: {
      return (
        <div className={styles.pageTitle}>
          <h1>{title}</h1>
        </div>
      );
    }
  }
});

export default PageTitle;
