import React from 'react';
import classNames from 'classnames';
import { LinkTarget } from '../link-target';
import { getImagePath } from '../../utils/core/get-image-path';
import { DATE_CREATE_NEW_PICTURE_SIZES_NEWS } from '../../utils/consts';

import styles from './news-capital.module.scss';

type Props = {
  title: string,
  image_picnews: string,
  image_picnews_webp: string,
  image_picfullsize: string,
  image_picfullsize_webp: string,
  image_pictv: string,
  image_pictv_webp: string,
  uri: string,
  updated_at: number,
  empty_template: boolean | number,
  global_article_origin: string | boolean,
};

const NewsCapital: React.FC<Props> = React.memo(({
  title,
  image_picnews,
  image_picnews_webp,
  image_picfullsize,
  image_picfullsize_webp,
  image_pictv,
  image_pictv_webp,
  uri,
  empty_template,
  updated_at,
  global_article_origin,
}) => {
  const [imageIsError, setImageIsError] = React.useState(false);

  React.useEffect(() => {
    if (
      typeof image_picnews === 'undefined'
      && typeof image_picnews_webp === 'undefined'
      && typeof image_picfullsize === 'undefined'
      && typeof image_picfullsize_webp === 'undefined'
    ) {
      setImageIsError(true);
    }
  }, [image_picnews, image_picnews_webp, image_picfullsize, image_picfullsize_webp]);

  const handleImageOnError = ({ currentTarget }) => {
    setImageIsError(true);
    // eslint-disable-next-line no-param-reassign
    currentTarget.onerror = null;
  };

  return (
    <div className={styles.newsPreview}>
      <LinkTarget isTemplate={empty_template} href={uri}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.newsPreviewLink} title={title}>
          <div className={classNames(styles.newsPreviewImgWrap, {
            [styles.newsPreviewImgWrapNoImage]: imageIsError,
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
                <source type="image/webp" media="(max-width: 767px)" srcSet={image_picfullsize_webp && getImagePath({ globalArticleOrigin: global_article_origin, image: image_picfullsize_webp })} />
                <source media="(max-width: 767px)" srcSet={getImagePath({ globalArticleOrigin: global_article_origin, image: image_picfullsize })} />
                <source type="image/webp" srcSet={getImagePath({ globalArticleOrigin: global_article_origin, image: image_picnews_webp })} />
                <img
                  className={styles.newsPreviewImg}
                  src={getImagePath({ globalArticleOrigin: global_article_origin, image: image_picnews })}
                  alt={title}
                  width={340}
                  height={182}
                  onError={handleImageOnError}
                  fetchpriority="high"
                />
              </picture>
            )}
          </div>
          <h3 className={styles.newsPreviewTitle}>
            <span className={styles.newsPreviewTitleInner}>{title}</span>
          </h3>
        </a>
      </LinkTarget>
    </div>
  );
});

export default NewsCapital;
