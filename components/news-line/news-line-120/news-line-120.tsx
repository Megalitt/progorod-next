import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { LinkTarget } from '../../link-target';
import { getPostDate } from '../../../utils/time/get-post-date';
import { getImagePath } from '../../../utils/core/get-image-path';
import { getArticleTags } from '../../../services/article';
import { DATE_CREATE_NEW_PICTURE_SIZES_NEWS } from '../../../utils/consts';

import styles from './news-line-120.module.scss';

type Props = {
  id: number,
  title: string,
  image: string,
  image_picnews: string,
  image_picnews_webp: string,
  image_picintv: string,
  image_picintv_webp: string,
  image_pictv: string,
  image_pictv_webp: string,
  uri: string,
  empty_template: boolean | number,
  comments_count: number,
  publish_at: number,
  updated_at: number,
  isLoadedComponent?: boolean,
  disableComment: string | number,
  picModerateYear: number,
  global_article_origin: string | boolean,
};

const NewsLine120: React.FC<Props> = React.memo(({
  id,
  title,
  image,
  image_picnews,
  image_picnews_webp,
  image_picintv,
  image_picintv_webp,
  image_pictv,
  image_pictv_webp,
  empty_template,
  uri,
  comments_count,
  publish_at,
  updated_at,
  isLoadedComponent,
  disableComment,
  picModerateYear,
  global_article_origin,
}) => {
  const { time, postYear } = getPostDate(publish_at);
  const [tags, setTags] = React.useState(null);
  const [imageIsError, setImageIsError] = React.useState(false);

  const handleImageOnError = ({ currentTarget }) => {
    setImageIsError(true);
    // eslint-disable-next-line no-param-reassign
    currentTarget.onerror = null;
  };

  const handleGetArticleTags = React.useCallback(async (id) => {
    await getArticleTags(id)
      .then((data) => {
        setTags(data.slice(0, 1));
      });
  }, []);

  React.useEffect(() => {
    handleGetArticleTags(id);
  }, []);

  return (
    <article
      className={classNames(styles.news,
        {
          [styles.newsLoaded]: isLoadedComponent,
          [styles.newsWithoutImg]: ((image && image.length === 0) || ((+postYear > 0 && +postYear < +picModerateYear))),
        })}
    >
      <LinkTarget isTemplate={empty_template} href={uri}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.newsLink} title={title}>
          <>
            {(+postYear === 0 || (+postYear > 0 && +postYear >= +picModerateYear)) && (
              <div className={styles.newsImgInner}>
                <div
                  className={classNames(styles.newsImgWrap, {
                    [styles.newsImgWrapNoImage]: imageIsError,
                  })}
                >
                  {!imageIsError && (
                    <picture>
                      {updated_at > DATE_CREATE_NEW_PICTURE_SIZES_NEWS && (
                        <>
                          <source type="image/webp" media="(max-width: 360px)" srcSet={image_pictv_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_pictv_webp })} />
                          <source media="(max-width: 360px)" srcSet={getImagePath({ globalArticleOrigin: global_article_origin, image: image_pictv })} />
                        </>
                      )}
                      <source type="image/webp" media="(max-width: 480px)" srcSet={image_picnews_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_picnews_webp })} />
                      <source media="(max-width: 480px)" srcSet={getImagePath({ globalArticleOrigin: global_article_origin, image: image_picnews })} />
                      <source type="image/webp" srcSet={image_picintv_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_picintv_webp })} />
                      <img
                        className={styles.newsImg}
                        src={getImagePath({ globalArticleOrigin: global_article_origin, image: image_picintv })}
                        width="171"
                        height="103"
                        alt={title}
                        loading="lazy"
                        onError={handleImageOnError}
                      />
                    </picture>
                  )}
                </div>
              </div>
            )}
          </>
          <h2 className={styles.newsTitle}>
            <span className={styles.newsTitleInner}>{title}</span>
          </h2>
          <span className={styles.newsTime}>
            <span className={
              classNames(styles.newsTimeYesterday,
                {
                  [styles.newsTimeYesterdayHidden]: postYear,
                })
            }
            >
              {time && time}
            </span>
            {postYear && postYear}
          </span>
          {+disableComment !== 1 && <div className={styles.newsComments}>{comments_count}</div>}
        </a>
      </LinkTarget>

      {tags && tags.length > 0 && tags.map((item) => (
        <Link prefetch={false} key={`tags-line-${item.alias}`} href={`/tags/${item.alias}`}>
          <a className={styles.newsTag} title={item.name}>
            {item.name}
          </a>
        </Link>
      ))}
    </article>
  );
});

export default NewsLine120;
