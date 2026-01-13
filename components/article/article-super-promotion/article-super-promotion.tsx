import React from 'react';
import LinkTarget from '../../link-target/link-target';
import styles from './article-super-promotion.module.scss';
import { getImagePath } from '../../../utils/core/get-image-path';

type SuperType = {
  title: string,
  uri: string,
  image_picintv: string,
  image_picintv_webp: string,
  empty_template: boolean | number,
};

const ArticleSuperPromotion: React.FC<SuperType> = ({
  title,
  uri,
  image_picintv,
  image_picintv_webp,
  empty_template,
}) => (
  <article className={styles.articleSuperPromotion}>
    <LinkTarget isTemplate={empty_template} href={uri}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={styles.articleSuperPromotionLink}>
        <div className={styles.articleSuperPromotionImgInner}>
          <div className={styles.articleSuperPromotionImgWrap}>
            <picture>
              <source type="image/webp" srcSet={image_picintv_webp && getImagePath({ image: image_picintv_webp })} />
              <img
                className={styles.articleSuperPromotionImg}
                src={image_picintv && getImagePath({ image: image_picintv })}
                width={140}
                height={74}
                alt={title}
                loading="lazy"
              />
            </picture>
          </div>
        </div>
        <h3 className={styles.articleSuperPromotionTitle}>{title}</h3>
      </a>
    </LinkTarget>
  </article>
);

export default ArticleSuperPromotion;
