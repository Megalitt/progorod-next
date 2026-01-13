import React from 'react';
import classNames from 'classnames';
import { LinkCustom } from '../../../link-custom';
import { getImagePath } from '../../../../utils/core/get-image-path';

import styles from './card-expert.module.scss';

type Props = {
  photo: string,
  fio: string,
  phone: string,
  position: string,
};

const CardExpert: React.FC<Props> = ({
  photo,
  fio,
  phone,
  position,
}) => (
  <div className={styles.specialist}>

    <div className={styles.specialistWrap}>
      <div className={styles.specialistPhoto}>
        <div className={styles.specialistImgWrap}>
          <picture>
            <source type="image/webp" srcSet={photo && getImagePath({ image: photo, sizeName: 'vert_1', isWebp: 'webp' })} />
            <img
              src={photo && getImagePath({ image: photo, sizeName: 'vert_1' })}
              alt={`Эксперт ${fio}`}
              className={styles.specialistImg}
            />
          </picture>
        </div>
      </div>

      <div className={styles.specialistInfo}>
        <div className={styles.specialistTagWrap}>
          <span className={styles.specialistTag}>Специалист</span>
        </div>
        <b className={styles.specialistName}>{fio}</b>
        <span className={styles.specialistCareer}>
          {position}
        </span>

        <div className={styles.specialistBtnMoreWrap}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
          <button className={styles.specialistBtnMore} />
        </div>

        {phone && (
          <ul className={styles.specialistContactList}>
            <li className={styles.specialistContactListItem}>
              {phone}
            </li>
          </ul>
        )}
      </div>
    </div>

    <div className={styles.specialistBtnWrap}>
      <LinkCustom
        href="/faq/send"
        className={classNames('btn')}
      >
        Задать вопрос специалисту
      </LinkCustom>
      <LinkCustom
        href="/faq/expert/request"
        className={classNames('btn', 'btnNoBg')}
      >
        Стать специалистом
      </LinkCustom>
    </div>

  </div>
);

export default CardExpert;
