import React from 'react';
import { getImagePath } from '../../../../utils/core/get-image-path';

import styles from '../service-card.module.scss';
import { DATE_CREATE_NEW_PICTURE_SIZES_SERVICES } from '../../../../utils/consts';

type Props = {
  id: number,
  title: string,
  image: string,
  creation_date?: string | number,
  isLoadedComponent?: boolean,
  serviceName?: string,
  event_date?: string | number,
  event_end_date?: string | number,
  image_small?: string,
  image_small_webp?: string,
  image_medium?: string,
  image_medium_webp?: string,
  image_mobile?: string,
  image_mobile_webp?: string,
  image_picitem?: string,
  image_picitem_webp?: string,
  image_picintv?: string,
  image_picintv_webp?: string,
  image_pictv?: string,
  image_pictv_webp?: string,
};

const ServiceCardPictureConcurs: React.FC<Props> = React.memo(({
  title,
  image,
  image_small,
  creation_date,
  image_small_webp,
  image_medium,
  image_medium_webp,
  image_mobile,
  image_mobile_webp,
}) => (
  <picture>
    {+creation_date > DATE_CREATE_NEW_PICTURE_SIZES_SERVICES ? (
      <>
        <source type="image/webp" media="(max-width: 360px)" srcSet={image_medium_webp && getImagePath({ image: image_medium_webp })} />
        <source media="(max-width: 360px)" srcSet={getImagePath({ image: image_medium })} />
        <source type="image/webp" media="(max-width: 480px)" srcSet={image_mobile_webp && getImagePath({ image: image_mobile_webp })} />
        <source media="(max-width: 480px)" srcSet={getImagePath({ image: image_mobile })} />
        <source type="image/webp" srcSet={image_small_webp && getImagePath({ image: image_small_webp })} />
        <img
          className={styles.newsImg}
          src={image_small && getImagePath({ image: image_small })}
          width="171"
          height="103"
          alt={title}
          loading="lazy"
        />
      </>
    ) : (
      <>
        <source type="image/webp" srcSet={image && getImagePath({ image, isWebp: 'webp' })} />
        <img
          className={styles.newsImg}
          src={image && getImagePath({ image })}
          width="171"
          height="103"
          alt={title}
          loading="lazy"
        />
      </>
    )}
  </picture>
));

export default ServiceCardPictureConcurs;
