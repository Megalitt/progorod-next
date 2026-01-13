import React from 'react';
import styles from './photo-item.module.scss';

type Props = {
  index: number,
  src: string,
  onPhotoButtonClick: (index: number) => void,
};

const PhotoItem: React.FC<Props> = React.memo(({ index, src, onPhotoButtonClick }) => {
  const handlePhotoButtonClick = () => onPhotoButtonClick(index);
  return (
    <div className={styles.photoItem}>
      <img
        className={styles.photoItemImg}
        src={src}
        alt="Изображение пользователя"
        loading="lazy"
      />
      <button
        className={styles.photoItemButton}
        type="button"
        aria-label="Удалить фото"
        onClick={handlePhotoButtonClick}
      />
    </div>
  );
});

export default PhotoItem;
