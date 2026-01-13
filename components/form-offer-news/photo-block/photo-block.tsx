import React from 'react';
import classNames from 'classnames';
import { PhotoItem } from '../index';

import styles from './photo-block.module.scss';

type Props = {
  photos: Array<string>,
  onPhotoButtonClick: (index: number) => void,
  className?: string,
};

const PhotoBlock: React.FC<Props> = React.memo(({ photos, className, onPhotoButtonClick }) => (
  <div className={classNames(styles.photo, className)}>
    {photos.map((item, index) => (
      <PhotoItem
        index={index}
        src={item}
        onPhotoButtonClick={onPhotoButtonClick}
        key={`item-${Math.random() * index}`}
      />
    ))}
  </div>
));

export default PhotoBlock;
