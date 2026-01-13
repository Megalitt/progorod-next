import React from 'react';
import Link from 'next/link';
import { getEventsDate } from '../../../../utils/time/get-events-date';

import styles from './article-info.module.scss';

type Props = {
  event_date: number | string,
  event_end_date: number | string,
  censor: string,
  category: any,
};

const ArticleInfo: React.FC<Props> = React.memo(({
  event_date,
  event_end_date,
  censor,
  category,
}) => (
  <ul className={styles.articleInfo}>
    <li className={styles.articleInfoItem}>
      <span
        className={styles.articleInfoDate}
      >
        {`${getEventsDate(+event_date, +event_end_date)}`}
      </span>
    </li>
    <li className={styles.articleInfoItem}>
      <span className={styles.articleInfoAgeLimit}>{censor}</span>
    </li>
    <li className={styles.articleInfoItem}>
      {category?.type && (
        <Link prefetch={false} href={`${category?.type}`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.articleInfoAuthor} title={category.title}>{category.title}</a>
        </Link>
      )}
    </li>
  </ul>
));

export default ArticleInfo;
