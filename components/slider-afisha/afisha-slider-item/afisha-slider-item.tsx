import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { DATE_CREATE_NEW_PICTURE_SIZES_SERVICES } from '../../../utils/consts';
import { getEventsDate } from '../../../utils/time/get-events-date';
import { getImagePath } from '../../../utils/core/get-image-path';
import styles from './afisha-slider-item.module.scss';

type Props = {
  id: number,
  title: string,
  image: string,
  image_picitem: string,
  image_picitem_webp: string,
  event_date: string | number,
  event_end_date: string | number,
};

const AfishaSliderItem: React.FC<Props> = React.memo(({
  id,
  title,
  image,
  image_picitem,
  image_picitem_webp,
  event_date,
  event_end_date,
}) => (
  <article className={styles.concursSliderItem}>
    <Link prefetch={false} href={`/afisha/events/${id}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={styles.concursSliderItemLink} title={title}>
        <div
          className={classNames(styles.concursSliderItemImgWrap, {
            [styles.concursSliderItemImgWrapNoPhoto]: !image,
          })}
        >
          <picture>
            {+event_date > DATE_CREATE_NEW_PICTURE_SIZES_SERVICES ? (
              <>
                <source type="image/webp" srcSet={image_picitem_webp && getImagePath({ image: image_picitem_webp })} />
                <img
                  className={styles.concursSliderItemImg}
                  src={image_picitem && getImagePath({ image: image_picitem })}
                  alt={title}
                  loading="lazy"
                  width="296"
                  height="172"
                />
              </>
            ) : (
              <>
                <source type="image/webp" srcSet={image && getImagePath({ image, sizeName: 'wide_small', isWebp: 'webp' })} />
                <img
                  className={styles.concursSliderItemImg}
                  src={image && getImagePath({ image, sizeName: 'wide_small' })}
                  alt={title}
                  loading="lazy"
                  width="296"
                  height="172"
                />
              </>
            )}
          </picture>
        </div>
        <h2 className={styles.concursSliderItemTitle}>
          <span className={styles.concursSliderItemTitleInner}>{title}</span>
        </h2>
        <span className={styles.concursSliderItemTime}>
          {getEventsDate(+event_date, +event_end_date)}
        </span>
      </a>
    </Link>
  </article>
));

export default AfishaSliderItem;
