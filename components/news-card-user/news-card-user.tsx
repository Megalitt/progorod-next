import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { LinkTarget } from '../link-target';
import { getPostDate } from '../../utils/time/get-post-date';
import { getImagePath } from '../../utils/core/get-image-path';
import { getArticleTags } from '../../services/article';

import styles from './news-card-user.module.scss';

type Props = {
  id: number,
  title: string,
  image_picintv: string,
  image_picintv_webp: string,
  uri: string,
  empty_template: boolean | number,
  comments_count: number,
  publish_at: number,
  global_article_origin: string | boolean,
};

const NewsCardUser: React.FC<Props> = React.memo(({
  id,
  title,
  image_picintv,
  image_picintv_webp,
  empty_template,
  uri,
  comments_count,
  publish_at,
  global_article_origin,
}) => {
  const { time, postYear } = getPostDate(publish_at);
  const [tags, setTags] = React.useState(null);
  const [imageIsError, setImageIsError] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      const tags = getArticleTags(id);
      tags.then((data) => {
        setTags(data.slice(0, 1));
      });
    }

    const loadingImg = async () => {
      const response = await fetch(getImagePath({ globalArticleOrigin: global_article_origin, image: image_picintv }));
      if (response.status === 404 || response.status === 403) {
        setImageIsError(true);
      }
    };
    loadingImg();
  }, []);

  return (
    <article className={styles.newsUser}>
      <LinkTarget isTemplate={empty_template} href={uri}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.newsUserLink} title={title}>
          <div className={styles.newsUserImgInner}>
            <div className={classNames(styles.newsUserImgWrap, {
              [styles.newsUserImgWrapNoImage]: imageIsError,
            })}
            >
              {!imageIsError && (
                <picture>
                  <source type="image/webp" srcSet={image_picintv_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_picintv_webp })} />
                  <img
                    className={styles.newsUserImg}
                    src={image_picintv && getImagePath({ globalArticleOrigin: global_article_origin, image: image_picintv })}
                    width="171"
                    height="103"
                    alt={title}
                    loading="lazy"
                  />
                </picture>
              )}
            </div>
          </div>
          <h2 className={styles.newsUserTitle}>
            <span className={styles.newsUserTitleInner}>{title}</span>
          </h2>
          <div className={styles.newsUserInfo}>
            <span className={styles.newsUserTime}>
              <span className={
                classNames(styles.newsUserYesterday,
                  {
                    [styles.newsUserTimeYesterdayHidden]: postYear,
                  })
              }
              >
                {time && time}
              </span>
              {postYear && postYear}
            </span>
            <span className={styles.newsUserComments}>{comments_count}</span>
          </div>
        </a>
      </LinkTarget>

      {tags && tags.length > 0 && tags.map((item) => (
        <Link prefetch={false} href={`/tags/${item.alias}`}>
          <a className={styles.newsUserTag} title={item.name}>
            {item.name}
          </a>
        </Link>
      ))}
    </article>
  );
});

export default NewsCardUser;
