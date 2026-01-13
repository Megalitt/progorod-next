import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { LinkTarget } from '../link-target';
import { getPostDate } from '../../utils/time/get-post-date';
import { getImagePath } from '../../utils/core/get-image-path';
import { getArticleTags } from '../../services/article';
import { DATE_CREATE_NEW_PICTURE_SIZES_NEWS } from '../../utils/consts';

import styles from './news-card.module.scss';

type Props = {
  id: number,
  title: string,
  image_picnews: string,
  image_picnews_webp: string,
  image_pictv: string,
  image_pictv_webp: string,
  uri: string,
  empty_template: boolean | number,
  comments_count: number,
  publish_at: number,
  updated_at: number,
  global_article_origin: string | boolean,
  picModerateYear: number,
  isEnabled: number | string,
};

const NewsCard: React.FC<Props> = React.memo(({
  id,
  title,
  image_picnews,
  image_picnews_webp,
  image_pictv,
  image_pictv_webp,
  empty_template,
  uri,
  comments_count,
  publish_at,
  updated_at,
  global_article_origin,
  picModerateYear,
  isEnabled,
}) => {
  const { time, postYear } = getPostDate(publish_at);
  const [tags, setTags] = React.useState(null);
  const [imageIsError, setImageIsError] = React.useState(false);

  const handleImageOnError = ({ currentTarget }) => {
    setImageIsError(true);
    // eslint-disable-next-line no-param-reassign
    currentTarget.onerror = null;
  };

  React.useEffect(() => {
    if (id) {
      const tags = getArticleTags(id);
      tags.then((data) => {
        setTags(data.slice(0, 1));
      });
    }
  }, []);

  return (
    <div
      className={classNames(styles.newsPreviewRight, {
        [styles.newsPreviewRightNoService]: isEnabled === '-1' && process.env.NEXT_PUBLIC_TITLE_LENGTH === '140',
      })}
    >
      {
        uri && (
        <LinkTarget isTemplate={empty_template} href={uri}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles.newsPreviewRightLink} title={title}>
            {image_pictv && image_pictv.length > 0 && (
              <>
                {(+postYear === 0 || (+postYear > 0 && +postYear >= +picModerateYear)) && (
                  <div className={classNames(styles.newsPreviewRightImgWrap, {
                    [styles.newsPreviewRightImgWrapNoImage]: imageIsError,
                  })}
                  >
                    {!imageIsError && (
                      <picture>
                        {updated_at > DATE_CREATE_NEW_PICTURE_SIZES_NEWS ? (
                          <>
                            <source type="image/webp" srcSet={image_pictv_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_pictv_webp })} />
                            <img
                              className={styles.newsPreviewRightImg}
                              src={image_pictv && getImagePath({ image: image_pictv })}
                              width={280}
                              height={165}
                              alt={title}
                              loading="lazy"
                              onError={handleImageOnError}
                            />
                          </>
                        ) : (
                          <>
                            <source type="image/webp" srcSet={image_picnews_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_picnews_webp })} />
                            <img
                              className={styles.newsPreviewRightImg}
                              src={image_pictv && getImagePath({ image: image_picnews })}
                              width={280}
                              height={165}
                              alt={title}
                              loading="lazy"
                              onError={handleImageOnError}
                            />
                          </>
                        )}
                      </picture>
                    )}
                  </div>
                )}
              </>
            )}
            <h3 className={styles.newsPreviewRightTitle}>
              <span className={styles.newsPreviewRightTitleInner}>{title}</span>
            </h3>
            <div className={styles.newsPreviewRightInfo}>
              <span className={styles.newsPreviewRightTime}>
                {time && time}
                {postYear && postYear}
              </span>
              <span className={styles.newsPreviewRightComments}>{comments_count}</span>
            </div>
          </a>
        </LinkTarget>
        )
      }

      {tags && tags.length > 0 && tags.map((item) => (
        <Link prefetch={false} key={`tags-card-${item.alias}`} href={`/tags/${item.alias}`}>
          <a className={styles.newsPreviewRightTag} title={item.name}>
            {item.name}
          </a>
        </Link>
      ))}
    </div>
  );
});

export default NewsCard;
