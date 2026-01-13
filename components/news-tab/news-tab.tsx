import React from 'react';
import classNames from 'classnames';
import { LinkTarget } from '../link-target';
import { getPostDate } from '../../utils/time/get-post-date';
import { articlesNoneCommerce } from '../../utils/consts';
import styles from './news-tab.module.scss';

type Props = {
  title: string,
  publish_at: number,
  empty_template: string | number,
  uri: string,
  promo: string | number,
  itemsLength: number,
};

const NewsTab: React.FC<Props> = React.memo(({
  title,
  publish_at,
  empty_template,
  uri,
  promo,
  itemsLength,
}) => {
  const { time, postYear } = getPostDate(publish_at);
  return (
    <div
      className={classNames(styles.tabContentItem, { [styles.tabContentItemFever]: itemsLength <= 3 })}
    >
      <LinkTarget href={uri} isTemplate={empty_template}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.tabContentLink} title={title}>
          <h3 className={styles.tabContentTitle}>
            <span className={styles.tabContentTitleInner}>{title}</span>
          </h3>
        </a>
      </LinkTarget>
      {articlesNoneCommerce.includes(promo.toString()) && (
        <span className={styles.tabContentTime}>
          {time && time}
          {postYear && postYear}
        </span>
      )}
    </div>
  );
});

export default NewsTab;
