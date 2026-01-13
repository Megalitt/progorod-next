import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../loader';
import { getImagePath } from '../../utils/core/get-image-path';
import styles from './slider-modal.module.scss';

type Props = {
  currentImage: string,
  isCloseAnimated: boolean,
  title?: string,
  onHandleTouchStart: () => void,
  onHandleTouchEnd: () => void,
  onHandleNextSlide: () => void,
  onHandlePrevSlide: () => void,
  onHandleCloseModalClick: () => void,
  lengthImages?: number,
};

const SliderModal: React.FC<Props> = React.memo(({
  currentImage,
  title = '',
  isCloseAnimated,
  lengthImages = 1,
  onHandleTouchStart,
  onHandleTouchEnd,
  onHandleCloseModalClick,
  onHandleNextSlide,
  onHandlePrevSlide,
}) => {
  const [isLoadedImage, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [currentImage]);

  const handleImageOnload = () => {
    setLoaded(true);
  };

  return (
    <div
      className={classNames(styles.sliderModal, {
        [styles.sliderModalCloseAnimate]: isCloseAnimated,
      })}
      onClick={onHandleCloseModalClick}
      aria-label="Закрыть модальное окно"
      aria-hidden="true"
    >
      <div className={styles.sliderModalInner} onTouchStart={onHandleTouchStart} onTouchEnd={onHandleTouchEnd}>
        <picture>
          <source type="image/webp" srcSet={currentImage && getImagePath({ image: `${currentImage}` })} />
          <img
            className={classNames(styles.sliderModalImg, {
              [styles.sliderModalImgLoaded]: !isLoadedImage,
            })}
            src={getImagePath({ image: `${currentImage}` })}
            onLoad={handleImageOnload}
            alt={title}
          />
        </picture>
        {!isLoadedImage && (
          <div className={styles.sliderModalLoader}>
            <Loader />
          </div>
        )}
        {lengthImages > 1 && (
        <>
          <button
            className={styles.sliderModalBtnNext}
            type="button"
            aria-label="Стрелка слайдера вперед"
            onClick={onHandleNextSlide}
          />
          <button
            className={styles.sliderModalBtnPrev}
            type="button"
            aria-label="Стрелка слайдера назад"
            onClick={onHandlePrevSlide}
          />
        </>
        )}
        <button
          className={styles.sliderModalBtnClose}
          type="button"
          onClick={onHandleCloseModalClick}
          aria-label="Закрыть модальное окно"
        />
      </div>
    </div>
  );
});

export default SliderModal;
