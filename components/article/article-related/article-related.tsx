import React, { useEffect, useState } from 'react';
import LinkTarget from '../../link-target/link-target';
import { getPostDate } from '../../../utils/time/get-post-date';
import styles from './article-related.module.scss';
import { changeOrderInArray } from '../../../utils/banners/change-order-in-array';

type RelatedDataType = {
  id: number,
  title: string,
  publish_at: number,
  rubric: string,
};

type Props = {
  relatedData: Array<RelatedDataType> | any,
  relatedCommData: Array<RelatedDataType> | any,
};

const ArticleRelated: React.FC<Props> = React.memo(({ relatedData, relatedCommData }) => {
  const [commerceNews, setCommerceNews] = useState([]);

  useEffect(() => {
    setCommerceNews(changeOrderInArray(relatedCommData, 'commerceNews'));
  }, [relatedCommData]);

  return (
    <div className={styles.readAlso}>
      <h2 className={styles.readAlsoTitle}>Читайте также:</h2>
      <ul className={styles.readAlsoList}>
        {
          relatedData.map((item, index) => (
            index < 2 && (
              <li className={styles.readAlsoItem} key={item.id}>
                <LinkTarget isTemplate={item.empty_template} href={item.uri}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className={styles.readAlsoLink}>
                    {item.title}
                    <span className={styles.readAlsoTime}>
                      {getPostDate(item.publish_at).time
                  && getPostDate(item.publish_at).time}
                      {getPostDate(item.publish_at).postYear
                      && getPostDate(item.publish_at).postYear}
                    </span>
                  </a>
                </LinkTarget>
              </li>
            )
          ))
        }
        {commerceNews.length > 0 && (
          <li className={styles.readAlsoItem}>
            <LinkTarget isTemplate={commerceNews[0].empty_template} href={commerceNews[0].uri}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={styles.readAlsoLink}>
                {commerceNews[0].title}
                <span className={styles.readAlsoTime}>
                  {getPostDate(commerceNews[0].publish_at).time
                  && getPostDate(commerceNews[0].publish_at).time}
                  {getPostDate(commerceNews[0].publish_at).postYear
                    && getPostDate(commerceNews[0].publish_at).postYear}
                </span>
              </a>
            </LinkTarget>
          </li>
        )}
      </ul>
    </div>
  );
});

export default ArticleRelated;
