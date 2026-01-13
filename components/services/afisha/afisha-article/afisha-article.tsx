import React from 'react';
import classNames from 'classnames';

import { ArticleLayout } from '../../../../layouts/article-layout';
import { ArticleSocial } from '../../../article-social';
import { createMarkup } from '../../../../utils/core/create-markup';
import { getImagePath } from '../../../../utils/core/get-image-path';

import styles from './afisha-article.module.scss';
import { ArticleInfo } from '../index';
import { DATE_CREATE_NEW_PICTURE_SIZES_SERVICES } from '../../../../utils/consts';

type Props = {
  id: number | string,
  image: string,
  creation_date: string,
  title: string,
  content: string,
  footer_title: string,
  footer_content: string,
  event_date: string,
  event_end_date: string,
  censor: string,
  place: any,
  category: any,
  disableComment?: number,
  image_picitem?: string,
  image_picitem_webp?: string,
  image_picintv?: string,
  image_picintv_webp?: string,
  image_pictv?: string,
  image_pictv_webp?: string,
};

const AfishaArticle: React.FC<Props> = ({
  id,
  image,
  image_picitem,
  image_picitem_webp,
  image_picintv,
  image_pictv,
  image_pictv_webp,
  title,
  content,
  footer_title,
  footer_content,
  place,
  event_date,
  event_end_date,
  censor,
  category,
  disableComment,
}) => (
  <article className={styles.article}>
    <ArticleLayout>
      <h1 itemProp="headline">{title}</h1>
      <ArticleInfo
        event_date={event_date}
        event_end_date={event_end_date}
        censor={censor}
        category={category}
      />
      <div className={styles.articleImgWrap}>
        <picture>
          {+event_date > DATE_CREATE_NEW_PICTURE_SIZES_SERVICES ? (
            <>
              <source type="image/webp" media="(max-width: 360px)" srcSet={image_picitem_webp && getImagePath({ image: image_picitem_webp })} />
              <source media="(max-width: 360px)" srcSet={getImagePath({ image: image_picitem })} />
              <source type="image/webp" media="(max-width: 480px)" srcSet={image_pictv_webp && getImagePath({ image: image_pictv_webp })} />
              <source media="(max-width: 480px)" srcSet={getImagePath({ image: image_pictv })} />
              <source type="image/webp" srcSet={image && getImagePath({ image, isWebp: 'webp' })} />
              <img
                className={styles.articleImg}
                src={image_picintv && getImagePath({ image })}
                width={840}
                alt={title}
                loading="lazy"
              />
            </>
          ) : (
            <>
              <source type="image/webp" srcSet={image && getImagePath({ image, isWebp: 'webp' })} />
              <img
                className={styles.articleImg}
                src={image && getImagePath({ image })}
                width={840}
                alt={title}
                loading="lazy"
              />
            </>
          )}
        </picture>
      </div>
      <div className={styles.articleBody}>
        <div dangerouslySetInnerHTML={createMarkup(content)} />
      </div>
      <ArticleSocial uri={`/afisha/events/${id}`} disableComment={disableComment} />
      {footer_title && (
      <div className={classNames(styles.articleBody, styles.articleFooter)}>
        <b className={styles.articleFooterTitle}>{footer_title}</b>
        <div dangerouslySetInnerHTML={createMarkup(footer_content)} />
        { place?.info_content && (
        <div dangerouslySetInnerHTML={createMarkup(place.info_content)} />
        )}
      </div>
      )}
    </ArticleLayout>
  </article>
);

export default AfishaArticle;
