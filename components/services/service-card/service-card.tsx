import React from 'react';
import classNames from 'classnames';
import { LinkTarget } from '../../link-target';
import { getPostDate } from '../../../utils/time/get-post-date';

import styles from './service-card.module.scss';
import ServiceCardPictureConcurs from './service-card-picture-concurs/service-card-picture-concurs';
import ServiceCardPictureAfisha from './service-card-picture-afisha/service-card-picture-afisha';

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

const ServiceCard: React.FC<Props> = React.memo((props) => {
  const { time, postYear } = getPostDate(props.serviceName === 'concurs' ? props.creation_date : props.event_date);

  return (
    <article className={classNames(styles.news, { [styles.newsLoaded]: props.isLoadedComponent })}>
      <LinkTarget isTemplate={false} href={props.serviceName === 'concurs' ? `/concurs/view/${props.id} ` : `/afisha/events/${props.id}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.newsLink}>
          <div className={styles.newsImgInner}>
            <div className={styles.newsImgWrap}>
              {props?.serviceName === 'concurs' && <ServiceCardPictureConcurs {...props} />}
              {props?.serviceName === 'afisha' && <ServiceCardPictureAfisha {...props} />}
            </div>
          </div>
          <h2 className={styles.newsTitle}>
            <span className={styles.newsTitleInner}>{props.title}</span>
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
          <div className={styles.newsComments}>
            <img className={styles.newsIcon} src="/img/icon-comment.svg" alt="Иконка комментария" />
            {/** Нужно api */}
            <span>0</span>
          </div>
        </a>
      </LinkTarget>
    </article>
  );
});

export default ServiceCard;
