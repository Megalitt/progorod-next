import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { getPostDate } from '../../../utils/time/get-post-date';
import { getImagePath } from '../../../utils/core/get-image-path';
import styles from './concurs-slider-item.module.scss';

type Props = {
  id: number,
  title: string,
  image: string,
  creation_date: number,
};

const ConcursSliderItem: React.FC<Props> = React.memo(({
  id,
  title,
  image,
  creation_date,
}) => {
  const { time, postYear } = getPostDate(creation_date);
  return (
    <article className={styles.concursSliderItem}>
      <Link prefetch={false} href={`concurs/view/${id}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.concursSliderItemLink} title={title}>
          <div
            className={classNames(styles.concursSliderItemImgWrap, {
              [styles.concursSliderItemImgWrapNoPhoto]: !image,
            })}
          >
            {image && (
              <picture>
                <source type="image/webp" srcSet={image && getImagePath({ image, sizeName: 'medium', isWebp: 'webp' })} />
                <img
                  className={styles.concursSliderItemImg}
                  src={image && getImagePath({ image, sizeName: 'medium' })}
                  width="296"
                  height="172"
                  alt={title}
                  loading="lazy"
                />
              </picture>
            )}
          </div>
          <h2 className={styles.concursSliderItemTitle}>
            <span className={styles.concursSliderItemTitleInner}>{title}</span>
          </h2>
          <span className={styles.concursSliderItemTime}>
            {time && time}
            {' '}
            {postYear && postYear}
          </span>
        </a>
      </Link>
    </article>
  );
});

export default ConcursSliderItem;
