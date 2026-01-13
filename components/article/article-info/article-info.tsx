import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import classNames from 'classnames';
import { getPostInnerDate } from '../../../utils/time/get-post-inner-date';

import styles from './article-info.module.scss';
import { createMarkup } from '../../../utils/core/create-markup';
import { ageCensortSelector } from '../../../store/settings/settings-selectors';

type Props = {
  publish_at: number,
  updated_at: number,
  views_count: number,
  stat: number,
  cens: string,
  redactor: string,
  uid: string,
  commentsCount: number,
};

const ArticleInfo: React.FC<Props> = React.memo(({
  publish_at,
  updated_at,
  stat,
  //views_count,
  cens,
  redactor,
  uid,
  commentsCount,
}) => {
  const displayAgeCensor = useSelector(ageCensortSelector);
  return (
    <ul className={styles.articleInfo}>
      <li className={styles.articleInfoItem}>
        <span
          itemProp="datePublished"
          content={new Date(publish_at * 1000)}
          className={styles.articleInfoDate}
          dangerouslySetInnerHTML={createMarkup(+stat === 0 ? getPostInnerDate(updated_at) : getPostInnerDate(publish_at))}
        />
      </li>
      {commentsCount && (
      <li className={styles.articleInfoItem}>
        <span
          className={classNames(styles.articleInfoCommentCount, {
            [styles.articleInfoCommentCountLoaded]: commentsCount,
          })}
        >
          {commentsCount}
        </span>
      </li>
      )}
      {/* Скрыл счетчик просмотров <li className={styles.articleInfoItem}>
        <span className={styles.articleInfoView}>{views_count}</span>
      </li> */}
      {displayAgeCensor === 1 && (
        <li className={styles.articleInfoItem}>
          <span className={styles.articleInfoAgeLimit}>{cens}</span>
        </li>
      )}
      <li className={styles.articleInfoItem} itemProp="author" itemScope itemType="http://schema.org/Person">
        <meta itemProp="name" content={redactor} />
        {redactor && (
          <Link prefetch={false} href={`/redactors/${uid}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styles.articleInfoAuthor} itemProp="url">{redactor}</a>
          </Link>
        )}
      </li>
    </ul>
  );
});

export default ArticleInfo;
