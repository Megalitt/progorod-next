import Link from 'next/link';
import React from 'react';
import { getImagePath } from '../../../../utils/core/get-image-path';
import styles from './peoplecontrol-expert.module.scss';

type Props = {
  id: number,
  name: string,
  image: string,
  description: string,
};

const PeoplecontrolExpert: React.FC<Props> = ({
  id,
  name,
  image,
  description,
}) => (
  <Link prefetch={false} href={`/peoplecontrol/experts/${id}`}>
    <a className={styles.expert} title={name}>
      <div className={styles.flex}>
        <div className={styles.expertImgWrap}>
          <picture>
            <source type="image/webp" srcSet={image && getImagePath({ image, sizeName: 'thumb_1', isWebp: 'webp' })} />
            <img
              className={styles.expertImg}
              src={image && getImagePath({ image, sizeName: 'thumb_1' })}
              alt={`Изображение эксперта: ${name}`}
            />
          </picture>
        </div>
        <div className={styles.expertInfo}>
          <div className={styles.expertInfoWrap}>
            <h2 className={styles.expertName}>{name}</h2>
            <span className={styles.expertDescr}>Специалист народного контроля</span>
          </div>
          <p className={styles.expertText}>{description}</p>
        </div>
      </div>
    </a>
  </Link>
);

export default PeoplecontrolExpert;
