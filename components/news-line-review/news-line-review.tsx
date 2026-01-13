import React from 'react';
import classNames from 'classnames';
import { LinkTarget } from '../link-target';
import { getPostDate } from '../../utils/time/get-post-date';

import styles from './news-line-review.module.scss';

type Props = {
  name: string,
  link: string,
  data: number,
};

const NewsLineReview: React.FC<Props> = React.memo(({
  name,
  link,
  data,
}) => {
  const { time, postYear } = getPostDate(data);
  return (
    <article className={styles.newsReview}>
      <LinkTarget isTemplate={0} href={`/${link}`}>
        <a className={styles.newsReviewLink} title={name}>
          <h2 className={styles.newsReviewTitle}>
            <span className={styles.newsReviewTitleInner}>{name}</span>
          </h2>
          <span className={styles.newsReviewTime}>
            <span className={
              classNames(styles.newsReviewTimeYesterday,
                {
                  [styles.newsReviewTimeYesterdayHidden]: postYear,
                })
              }
            >
              {time && time}
            </span>
            {postYear && postYear}
          </span>
        </a>
      </LinkTarget>
    </article>
  );
});

export default NewsLineReview;
