import React from 'react';
import { LinkTarget } from '../../link-target';
import { getPostDate } from '../../../utils/time/get-post-date';
import { articlesNoneCommerce } from '../../../utils/consts';

import styles from './news-column-item.module.scss';

type Props = {
  title: string,
  publish_at: number,
  uri: string,
  empty_template: string | number,
  promo: string,
};

const NewsColumnItem: React.FC<Props> = React.memo(({
  title,
  publish_at,
  uri,
  empty_template,
  promo,
}) => {
  const { time, postYear } = getPostDate(publish_at);
  return (
    <li className={styles.newsColumnItem}>
      <LinkTarget href={uri} isTemplate={empty_template}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.newsColumnItemLink} title={title}>
          <h3 className={styles.newsColumnItemTitle}>
            <span className={styles.newsColumnItemTitleInner}>{title}</span>
          </h3>
          {articlesNoneCommerce.includes(promo.toString()) && (
            <span className={styles.newsColumnItemTime}>
              {time && time}
              {postYear && postYear}
            </span>
          )}
        </a>
      </LinkTarget>
    </li>
  );
});

export default NewsColumnItem;
