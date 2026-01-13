import React from 'react';
import { getImagePath } from '../../../../utils/core/get-image-path';
import styles from './peoplecontrol-expert-sub.module.scss';

type Props = {
  name: string,
  image: string,
  description: string,
};

const PeoplecontrolExpertSub: React.FC<Props> = ({ name, image, description }) => (
  <div className={styles.expert}>
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
        <span className={styles.expertDescr}>Специалист народного контроля</span>
        <h1 className={styles.expertName}>{name}</h1>
        <p className={styles.expertText}>{description}</p>
      </div>
    </div>
  </div>
);

export default PeoplecontrolExpertSub;
