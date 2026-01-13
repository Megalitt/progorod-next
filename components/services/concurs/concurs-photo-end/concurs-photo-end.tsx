import React from 'react';
import classNames from 'classnames';
import { getImagePath } from '../../../../utils/core/get-image-path';
import styles from './concurs-photo-end.module.scss';

type Props = {
  id: number,
  image: string,
  text: string,
  author_name: string,
  isWinner: boolean,
  index: number,
  lengthPhotos: number,
  votes: string,
  onHandleShowModalClick: (evt: any, index: number, lengthPhotos: number) => void;
};

const ConcursPhotoEnd: React.FC<Props> = ({
  id,
  image,
  text,
  author_name,
  isWinner,
  index,
  lengthPhotos,
  votes,
  onHandleShowModalClick,
}) => (
  <div
    className={
        classNames(styles.concursPhotoEnd,
          {
            [styles.concursPhotoEndWinner]: isWinner,
          })
      }
    data-id-photo={id}
  >
    <div
      className={styles.concursPhotoEndImgWrap}
      onClick={(evt) => onHandleShowModalClick(evt, index, lengthPhotos)}
      aria-label="Показать модальное окно с картинкой"
      aria-hidden="true"
      title={`${author_name !== '' ? author_name : ''} ${text !== '' ? text : ''}`}
    >
      {image && (
      <picture>
        <source type="image/webp" media="(max-width: 480px)" srcSet={image && getImagePath({ image, sizeName: 'mobile', isWebp: 'webp' })} />
        <source type="image/webp" srcSet={image && getImagePath({ image, sizeName: 'desktop', isWebp: 'webp' })} />
        <img className={styles.concursPhotoEndImg} src={image && getImagePath({ image, sizeName: 'desktop' })} alt={author_name} loading="lazy" />
      </picture>
      )}
      <span className={styles.concursPhotoEndInfo}>
        <span>
          {author_name.length > 0 ? author_name : ''}
          {text.length > 0 ? text : ''}
        </span>
        <div className={styles.concursPhotoEndInfoCountActive}>
          <b>{votes || 0}</b>
        </div>
      </span>
    </div>
  </div>
);

export default ConcursPhotoEnd;
